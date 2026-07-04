import { useState } from "react";

export type UserRole = "student" | "visitor";

interface RoleModalProps {
  onSelectRole: (role: UserRole) => void;
}

export default function RoleModal({ onSelectRole }: RoleModalProps) {
  const [selecting, setSelecting] = useState(false);

  const handleSelect = (role: UserRole) => {
    setSelecting(true);
    localStorage.setItem("userRole", role);
    onSelectRole(role);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4 text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          Welcome to Campus Compass 👋
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Tell us who you are so we can show you the most relevant info.
        </p>

        <div className="flex flex-col gap-3">
          <button
            disabled={selecting}
            onClick={() => handleSelect("student")}
            className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            🎓 I'm a Student
          </button>
          <button
            disabled={selecting}
            onClick={() => handleSelect("visitor")}
            className="w-full py-2.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            🧭 I'm a Visitor / Fresher
          </button>
        </div>
      </div>
    </div>
  );
}