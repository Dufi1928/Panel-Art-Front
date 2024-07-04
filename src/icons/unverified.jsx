export default function UnverifiedIcon({ size = 24, color = "white" }) {
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

      {/* Cercle entourant le symbole "-" */}
      <circle cx="18" cy="16" r="3" stroke={color} strokeWidth="2" />

      {/* Symbole "-" pour non vérifié */}
      <line
        x1="16.5"
        y1="16"
        x2="19.5"
        y2="16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
