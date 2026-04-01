const OVERLAY_IMG = '/images/decorative-overlay.png'

export default function DecorativeOverlay() {
  return (
    <div className="decorative-overlay" aria-hidden="true">
      <img src={OVERLAY_IMG} alt="" />
    </div>
  )
}
