export default function VerifiedIcon({ size = 24, color = "white" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tête (cercle) */}
      <circle cx="12" cy="7" r="5" stroke={color} strokeWidth="2" />

      {/* Corps (arc) */}
      <path
        d="M5 22C5 17 8.5 13 12 13C15.5 13 19 17 19 22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Cercle entourant le symbole "✓" */}
      <circle cx="18" cy="16" r="3" stroke={color} strokeWidth="2" />

      {/* Symbole "✓" pour vérifié */}
      <path
        d="M16.5 16L17.5 17L19.5 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
