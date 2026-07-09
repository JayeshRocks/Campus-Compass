import UIKit

@objc public enum LiquidGlassEffect: Int {
  case regular
  case clear
  case none

#if compiler(>=6.2)
  @available(iOS 26.0, tvOS 26.0, *)
  var converted: UIGlassEffect.Style? {
    switch self {
    case .regular:
      return .regular
    case .clear:
      return .clear
    case .none:
      return nil
    }
  }
#endif

}

#if compiler(>=6.2)

@available(iOS 26.0, tvOS 26.0, *)
@objc public class LiquidGlassViewImpl: UIVisualEffectView {
  private var isFirstMount: Bool = true
  @objc public var effectTintColor: UIColor?
  @objc public var interactive: Bool = false
  @objc public var style: LiquidGlassEffect = .regular
  @objc public var animated: Bool = true
  @objc public var animationDuration: CGFloat = 0
  @objc public var hasAnimationDuration: Bool = false

  public override func layoutSubviews() {
    if (self.effect != nil) { return }
    setupView()

    if isFirstMount {
      isFirstMount = false
    }
  }


  @objc public func setupView() {
    guard #available(iOS 26.0, tvOS 26.0, *) else {
      return
    }

    // Runtime check to ensure UIGlassEffect is available
    // This handles cases where early iOS 26 beta releases may not have this API
    guard let glassEffectClass = NSClassFromString("UIGlassEffect") as? NSObject.Type else {
      return
    }
    
    // Verify that the effectWithStyle: selector is available
    // This provides an additional safety check for early beta versions
    guard glassEffectClass.responds(to: Selector(("effectWithStyle:"))) else {
      return
    }

    guard let preferredStyle = style.converted else {
      // TODO: Looks like only assigning nil is not working, check this after stable iOS 26 is rolled out.
      applyEffect(UIVisualEffect())
      return
    }

    let glassEffect = UIGlassEffect(style: preferredStyle)
    glassEffect.isInteractive = interactive
    glassEffect.tintColor = effectTintColor

    applyEffect(glassEffect)

    // UIGlassEffect can reconfigure the internal contentView in a way that
    // disables user interaction when no subviews are present at the time the
    // effect is applied. In React Native (Fabric), child component views may
    // be mounted into contentView *after* layoutSubviews triggers setupView(),
    // leaving contentView with userInteractionEnabled == false for the
    // lifetime of this view. Force it back on so touches always reach children.
    self.contentView.isUserInteractionEnabled = true
  }

  private func applyEffect(_ effect: UIVisualEffect) {
    if isFirstMount || !animated {
      self.effect = effect
      isFirstMount = false
      return
    }

    if hasAnimationDuration {
      UIView.animate(withDuration: TimeInterval(animationDuration)) {
        self.effect = effect
      }
    } else {
      UIView.animate {
        self.effect = effect
      }
    }
  }
}

#else

@objc public class LiquidGlassViewImpl: UIView {}

#endif
