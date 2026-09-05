import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { campusPanoramas, type PanoramaLocation } from "../../data/panoramas";

interface PanoramaViewerModalProps {
  initialLocation: PanoramaLocation;
  onClose: () => void;
}

export default function PanoramaViewerModal({
  initialLocation,
  onClose,
}: PanoramaViewerModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState<PanoramaLocation>(initialLocation);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isGyroActive, setIsGyroActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLocationDrawer, setShowLocationDrawer] = useState(true);
  const [headingDegrees, setHeadingDegrees] = useState(0);

  // Dynamic refs for values accessed inside the animation loop
  const isAutoRotatingRef = useRef(isAutoRotating);
  const isGyroActiveRef = useRef(isGyroActive);

  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
  }, [isAutoRotating]);

  useEffect(() => {
    isGyroActiveRef.current = isGyroActive;
  }, [isGyroActive]);

  // Three.js and animation refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Interaction coordinates (Spherical coordinates)
  // phi: vertical latitude [0..PI], theta: horizontal longitude [0..2PI]
  const modalRootRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef(false);
  const lastInteractionTimeRef = useRef<number>(0);
  const velocityLonRef = useRef<number>(0);
  const velocityLatRef = useRef<number>(0);
  const lastPointerXRef = useRef<number>(0);
  const lastPointerYRef = useRef<number>(0);
  const onPointerDownPointerXRef = useRef(0);
  const onPointerDownPointerYRef = useRef(0);
  const lonRef = useRef(initialLocation.initialYaw || 0);
  const latRef = useRef(initialLocation.initialPitch || 0);
  const onPointerDownLonRef = useRef(0);
  const onPointerDownLatRef = useRef(0);

  // Gyroscope tracking refs
  const gyroAlphaRef = useRef<number | null>(null);
  const gyroBetaRef = useRef<number | null>(null);
  const gyroGammaRef = useRef<number | null>(null);

  // Touch pinch-zoom refs
  const initialTouchDistanceRef = useRef<number | null>(null);
  const initialFovRef = useRef(75);

  // Texture loading function
  const loadPanoramaTexture = useCallback((imageUrl: string) => {
    setIsLoading(true);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        if (materialRef.current) {
          if (materialRef.current.map) {
            materialRef.current.map.dispose();
          }
          materialRef.current.color.setHex(0xffffff);
          materialRef.current.map = texture;
          materialRef.current.needsUpdate = true;
        }
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading 360 texture:", error);
        setIsLoading(false);
      }
    );
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera (default FOV 75)
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, true);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Inverted Sphere for 360 Panorama
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // Invert the geometry so it faces inwards
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    materialRef.current = material;

    const sphere = new THREE.Mesh(geometry, material);
    sphereRef.current = sphere;
    scene.add(sphere);

    // 5. Load initial texture
    loadPanoramaTexture(initialLocation.image);

    // 6. Animation Loop
    let lastHeadingUpdate = 0;
    const animate = (time: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Smooth momentum glide after user releases touch/drag
      if (!isPointerDownRef.current) {
        if (Math.abs(velocityLonRef.current) > 0.005) {
          lonRef.current += velocityLonRef.current;
          velocityLonRef.current *= 0.92;
        } else {
          velocityLonRef.current = 0;
        }

        if (Math.abs(velocityLatRef.current) > 0.005) {
          latRef.current += velocityLatRef.current;
          velocityLatRef.current *= 0.92;
        } else {
          velocityLatRef.current = 0;
        }
      }

      // Auto-rotation: pause while user is touching, and wait 1s (1000ms) after touch is removed
      const now = performance.now();
      const timeSinceTouchRemoved = now - lastInteractionTimeRef.current;
      const isTouchCooldownActive = isPointerDownRef.current || timeSinceTouchRemoved < 1000;

      if (isAutoRotatingRef.current && !isGyroActiveRef.current && !isTouchCooldownActive) {
        lonRef.current += 0.08;
      }

      // Clamp latitude to avoid pole gimbal flipping
      latRef.current = Math.max(-85, Math.min(85, latRef.current));

      // Calculate camera target vector from spherical coordinates
      const phi = THREE.MathUtils.degToRad(90 - latRef.current);
      const theta = THREE.MathUtils.degToRad(lonRef.current);

      const target = new THREE.Vector3(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      );

      camera.lookAt(target);

      // Gyroscope tilt modifier if active
      if (isGyroActiveRef.current && gyroBetaRef.current !== null && gyroGammaRef.current !== null) {
        // Adjust lon/lat smoothly via device orientation
        const targetLat = THREE.MathUtils.clamp(gyroBetaRef.current - 90, -85, 85);
        latRef.current += (targetLat - latRef.current) * 0.1;
      }

      renderer.render(scene, camera);

      // Update heading compass throttled (every 100ms)
      if (time - lastHeadingUpdate > 100) {
        const normalizedHeading = ((lonRef.current % 360) + 360) % 360;
        setHeadingDegrees(Math.round(normalizedHeading));
        lastHeadingUpdate = time;
      }
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // 7. Window Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      if (newWidth <= 0 || newHeight <= 0) return;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight, true);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    const handleFullscreenChange = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = document as any;
      const isFs = !!(document.fullscreenElement || doc.webkitFullscreenElement);
      setIsFullscreen(isFs);

      requestAnimationFrame(handleResize);
      setTimeout(handleResize, 100);
      setTimeout(handleResize, 300);
      setTimeout(handleResize, 600);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      if (material.map) material.map.dispose();
      renderer.dispose();
    };
  }, [loadPanoramaTexture, initialLocation.image]);

  // Load new texture when location switches
  const handleSelectLocation = (loc: PanoramaLocation) => {
    if (loc.id === currentLocation.id) return;
    setCurrentLocation(loc);
    lonRef.current = loc.initialYaw || 0;
    latRef.current = loc.initialPitch || 0;
    loadPanoramaTexture(loc.image);
  };

  // Pointer / Mouse / Touch Drag Handlers (Decreased Resistance & Glide Momentum)
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag with left mouse button or single touch
    if (e.pointerType === "mouse" && e.button !== 0) return;
    isPointerDownRef.current = true;
    lastInteractionTimeRef.current = performance.now();
    velocityLonRef.current = 0;
    velocityLatRef.current = 0;
    lastPointerXRef.current = e.clientX;
    lastPointerYRef.current = e.clientY;
    onPointerDownPointerXRef.current = e.clientX;
    onPointerDownPointerYRef.current = e.clientY;
    onPointerDownLonRef.current = lonRef.current;
    onPointerDownLatRef.current = latRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    lastInteractionTimeRef.current = performance.now();

    const fovFactor = (cameraRef.current?.fov || 75) / 75;
    // Decreased resistance: 0.28 factor on touch for light, fluid panning; 0.20 on mouse
    const sensitivity = (e.pointerType === "touch" ? 0.28 : 0.20) * fovFactor;

    const deltaX = (e.clientX - lastPointerXRef.current) * sensitivity;
    const deltaY = (e.clientY - lastPointerYRef.current) * sensitivity;

    lonRef.current -= deltaX;
    latRef.current += deltaY;

    // Record instantaneous velocity for momentum gliding
    velocityLonRef.current = -deltaX;
    velocityLatRef.current = deltaY;

    lastPointerXRef.current = e.clientX;
    lastPointerYRef.current = e.clientY;
  };

  const handlePointerUp = () => {
    if (isPointerDownRef.current) {
      isPointerDownRef.current = false;
      // Start 1-second pause from the exact moment touch is removed
      lastInteractionTimeRef.current = performance.now();
    }
  };

  // Mouse Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!cameraRef.current) return;
    const newFov = THREE.MathUtils.clamp(
      cameraRef.current.fov + (e.deltaY > 0 ? 4 : -4),
      30,
      100
    );
    cameraRef.current.fov = newFov;
    cameraRef.current.updateProjectionMatrix();
  };

  // Multi-touch pinch-to-zoom for mobile / tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialTouchDistanceRef.current = dist;
      initialFovRef.current = cameraRef.current?.fov || 75;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialTouchDistanceRef.current !== null && cameraRef.current) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = initialTouchDistanceRef.current / currentDist;
      const targetFov = THREE.MathUtils.clamp(initialFovRef.current * ratio, 30, 100);
      cameraRef.current.fov = targetFov;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const handleTouchEnd = () => {
    initialTouchDistanceRef.current = null;
  };

  // Zoom buttons
  const handleZoom = (direction: "in" | "out") => {
    if (!cameraRef.current) return;
    const delta = direction === "in" ? -10 : 10;
    cameraRef.current.fov = THREE.MathUtils.clamp(cameraRef.current.fov + delta, 30, 100);
    cameraRef.current.updateProjectionMatrix();
  };

  // Reset view
  const handleResetView = () => {
    lonRef.current = currentLocation.initialYaw || 0;
    latRef.current = currentLocation.initialPitch || 0;
    if (cameraRef.current) {
      cameraRef.current.fov = 75;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  // Gyroscope toggle
  const handleToggleGyro = async () => {
    if (isGyroActive) {
      setIsGyroActive(false);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.removeEventListener("deviceorientationabsolute" as any, handleDeviceOrientation);
      return;
    }

    // Handle iOS 13+ permission request
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doe = typeof window !== "undefined" ? (window as any).DeviceOrientationEvent : undefined;
    if (doe && typeof doe.requestPermission === "function") {
      try {
        const response = await doe.requestPermission();
        if (response !== "granted") {
          alert("Motion sensor permission is required for 360° Gyroscope view.");
          return;
        }
      } catch (err) {
        console.error("Gyro permission error:", err);
        alert("Motion sensor permission denied.");
        return;
      }
    } else if (
      typeof window !== "undefined" &&
      !window.isSecureContext &&
      location.hostname !== "localhost" &&
      location.hostname !== "127.0.0.1" &&
      !("DeviceOrientationEvent" in window)
    ) {
      alert(
        "Mobile sensor restriction: Chrome requires HTTPS on local Wi-Fi. Access via HTTPS or enable chrome://flags/#unsafely-treat-insecure-origin-as-secure for " +
          location.origin
      );
      return;
    }

    setIsGyroActive(true);
    setIsAutoRotating(false);
    window.addEventListener("deviceorientation", handleDeviceOrientation, true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener("deviceorientationabsolute" as any, handleDeviceOrientation, true);
  };

  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    gyroAlphaRef.current = event.alpha;
    gyroBetaRef.current = event.beta;
    gyroGammaRef.current = event.gamma;
    if (event.alpha !== null) {
      // Rotate longitude based on compass heading
      lonRef.current = -event.alpha;
    }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.removeEventListener("deviceorientationabsolute" as any, handleDeviceOrientation);
    };
  }, []);

  // Fullscreen toggle with cross-device & vendor prefix handling
  const handleToggleFullscreen = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = document as any;
      const isFs = !!(
        document.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );

      if (!isFs) {
        // Request fullscreen on modal root, falling back to documentElement
        const target = modalRootRef.current || document.documentElement;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const targetAny = target as any;

        if (target.requestFullscreen) {
          await target.requestFullscreen();
        } else if (targetAny.webkitRequestFullscreen) {
          await targetAny.webkitRequestFullscreen();
        } else if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.warn("Fullscreen toggle:", err);
    }
  };

  // Keyboard navigation & accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        lonRef.current -= 5;
      } else if (e.key === "ArrowRight") {
        lonRef.current += 5;
      } else if (e.key === "ArrowUp") {
        latRef.current += 5;
      } else if (e.key === "ArrowDown") {
        latRef.current -= 5;
      } else if (e.key === "+" || e.key === "=") {
        handleZoom("in");
      } else if (e.key === "-") {
        handleZoom("out");
      } else if (e.key === " ") {
        e.preventDefault();
        setIsAutoRotating((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      ref={modalRootRef}
      role="dialog"
      aria-modal="true"
      aria-label={`360 degree virtual tour: ${currentLocation.title}`}
      className="fixed inset-0 z-[150] w-full h-full flex flex-col bg-black select-none overflow-hidden animate-fade-in"
      style={{ width: "100vw", height: "100dvh" }}
    >
      {/* 360 WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full flex-1 relative cursor-grab active:cursor-grabbing touch-none overflow-hidden"
        style={{ width: "100%", height: "100%", position: "relative" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-30 pointer-events-none transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full border-4 border-[#22B8CF]/30 border-t-[#22B8CF] animate-spin mb-4" />
          <p className="text-white font-headline-sm text-sm tracking-wide bg-slate-900/80 px-4 py-2 rounded-full border border-white/10 shadow-xl flex items-center gap-2">
            <img src="/icons/360image.svg" alt="" className="w-4 h-4 animate-pulse" />
            Loading 360° Panorama...
          </p>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="absolute top-0 left-0 right-0 p-4 md:p-6 flex items-center justify-between pointer-events-none z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <div className="flex items-center gap-3 pointer-events-auto bg-slate-900/80 dark:bg-slate-900/90 backdrop-blur-xl border border-white/15 px-4 py-2.5 rounded-2xl shadow-2xl">
          <img src="/icons/360image.svg" alt="360 Tour" className="w-6 h-6 object-contain" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-white font-bold text-base md:text-lg leading-tight">
                {currentLocation.title}
              </h2>
              <span className="text-[11px] font-semibold text-[#22B8CF] bg-[#22B8CF]/15 px-2 py-0.5 rounded-full border border-[#22B8CF]/30">
                {currentLocation.category}
              </span>
            </div>
            <p className="text-slate-300 text-xs hidden md:block max-w-md truncate mt-0.5">
              {currentLocation.description}
            </p>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          {/* Compass Heading */}
          <div
            className="hidden sm:flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-xl border border-white/15 px-3 py-2 rounded-xl text-white text-xs font-mono shadow-lg"
            title="Current View Orientation"
          >
            <span
              className="material-symbols-outlined text-[18px] text-[#22B8CF] transition-transform duration-100"
              style={{ transform: `rotate(${-headingDegrees}deg)` }}
            >
              explore
            </span>
            <span>{headingDegrees}°</span>
          </div>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="w-11 h-11 bg-slate-900/80 hover:bg-red-500/80 active:scale-95 text-white rounded-full border border-white/20 backdrop-blur-xl shadow-2xl flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close 360 virtual tour"
            title="Close (Esc)"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>
      </header>

      {/* Floating Side Tools (Desktop / Tablet / Mobile) */}
      <aside
        aria-label="360 view controls"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2.5 pointer-events-auto"
      >
        {/* Zoom In */}
        <button
          onClick={() => handleZoom("in")}
          className="w-11 h-11 bg-slate-900/80 hover:bg-slate-800 active:scale-95 text-white rounded-full border border-white/15 backdrop-blur-xl shadow-xl flex items-center justify-center transition-all cursor-pointer group"
          title="Zoom In (+)"
          aria-label="Zoom In"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">add</span>
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => handleZoom("out")}
          className="w-11 h-11 bg-slate-900/80 hover:bg-slate-800 active:scale-95 text-white rounded-full border border-white/15 backdrop-blur-xl shadow-xl flex items-center justify-center transition-all cursor-pointer group"
          title="Zoom Out (-)"
          aria-label="Zoom Out"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">remove</span>
        </button>

        {/* Reset Orientation */}
        <button
          onClick={handleResetView}
          className="w-11 h-11 bg-slate-900/80 hover:bg-slate-800 active:scale-95 text-white rounded-full border border-white/15 backdrop-blur-xl shadow-xl flex items-center justify-center transition-all cursor-pointer group"
          title="Reset Orientation"
          aria-label="Reset Orientation"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">restart_alt</span>
        </button>

        {/* Auto-rotate Toggle */}
        <button
          onClick={() => setIsAutoRotating((prev) => !prev)}
          className={`w-11 h-11 active:scale-95 text-white rounded-full border backdrop-blur-xl shadow-xl flex items-center justify-center transition-all cursor-pointer group ${
            isAutoRotating
              ? "bg-[#22B8CF] border-[#22B8CF] text-white shadow-[#22B8CF]/30"
              : "bg-slate-900/80 hover:bg-slate-800 border-white/15"
          }`}
          title={isAutoRotating ? "Pause Auto-Rotation (Space)" : "Start Auto-Rotation (Space)"}
          aria-label="Toggle auto rotation"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:rotate-45 transition-transform">
            {isAutoRotating ? "motion_photos_paused" : "motion_photos_on"}
          </span>
        </button>

        {/* Gyroscope Motion Toggle (Available on mobile, tablet, and desktop) */}
        <button
          onClick={handleToggleGyro}
          className={`w-11 h-11 active:scale-95 rounded-full border backdrop-blur-xl shadow-xl flex items-center justify-center transition-all cursor-pointer group ${
            isGyroActive
              ? "bg-[#22B8CF] border-[#22B8CF] text-white shadow-[#22B8CF]/30"
              : "bg-slate-900/80 hover:bg-slate-800 border-white/15 text-white"
          }`}
          title={isGyroActive ? "Disable Gyroscope Mode" : "Enable Gyroscope Device Motion"}
          aria-label="Toggle Gyroscope"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
            screen_rotation
          </span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={handleToggleFullscreen}
          className="w-11 h-11 bg-slate-900/80 hover:bg-slate-800 active:scale-95 text-white rounded-full border border-white/15 backdrop-blur-xl shadow-xl flex items-center justify-center transition-all cursor-pointer group"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          aria-label="Toggle Fullscreen"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
            {isFullscreen ? "fullscreen_exit" : "fullscreen"}
          </span>
        </button>

        {/* Toggle Location Carousel */}
        <button
          onClick={() => setShowLocationDrawer((prev) => !prev)}
          className={`w-11 h-11 active:scale-95 rounded-full border backdrop-blur-xl shadow-xl flex items-center justify-center transition-all cursor-pointer group ${
            showLocationDrawer
              ? "bg-slate-900/80 text-[#22B8CF] border-[#22B8CF]/40"
              : "bg-slate-900/80 hover:bg-slate-800 text-white border-white/15"
          }`}
          title={showLocationDrawer ? "Hide Locations" : "Show Locations"}
          aria-label="Toggle Location Bar"
        >
          <span className="material-symbols-outlined text-[20px]">
            {showLocationDrawer ? "view_carousel" : "collections"}
          </span>
        </button>
      </aside>

      {/* Bottom Campus Location Drawer / Carousel */}
      {showLocationDrawer && (
        <div className="absolute bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-3xl z-20 pointer-events-auto transition-all animate-fade-in">
          <div className="bg-slate-900/85 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/15 p-3 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-white/80 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#22B8CF] text-[16px]">location_on</span>
                Campus 360° Spots ({campusPanoramas.length})
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Drag to explore • Pinch or scroll to zoom
              </span>
            </div>

            {/* Horizontal Scrollable Carousel */}
            <div className="flex gap-2.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth">
              {campusPanoramas.map((loc) => {
                const isSelected = loc.id === currentLocation.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => handleSelectLocation(loc)}
                    className={`flex-shrink-0 flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer border text-left active:scale-95 ${
                      isSelected
                        ? "bg-[#22B8CF] text-white border-[#22B8CF] shadow-lg shadow-[#22B8CF]/25 font-semibold"
                        : "bg-white/5 hover:bg-white/10 text-slate-200 border-white/10"
                    }`}
                    aria-label={`View 360 photo of ${loc.title}`}
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 border border-white/20 bg-slate-800">
                      <img
                        src={loc.image}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="pr-1">
                      <p className="text-xs font-bold leading-tight whitespace-nowrap">
                        {loc.shortTitle}
                      </p>
                      <span
                        className={`text-[10px] block leading-none mt-0.5 ${
                          isSelected ? "text-white/80" : "text-slate-400"
                        }`}
                      >
                        {loc.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
