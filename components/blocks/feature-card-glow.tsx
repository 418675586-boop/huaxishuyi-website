import "./feature-card-glow.css";

export function FeatureCardGlow({
  color,
  delayMs = 0,
}: {
  color: string;
  delayMs?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="feature-card-glow pointer-events-none absolute inset-0"
    >
      <div
        className="feature-card-glow__blob feature-card-glow__blob--a"
        style={{ backgroundColor: color, animationDelay: `${delayMs}ms` }}
      />
      <div
        className="feature-card-glow__blob feature-card-glow__blob--b"
        style={{
          backgroundColor: color,
          animationDelay: `${delayMs + 1800}ms`,
        }}
      />
    </div>
  );
}
