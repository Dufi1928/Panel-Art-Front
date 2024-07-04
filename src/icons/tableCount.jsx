export default function PaintingIcon({ size = 24, color = "white" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cadre du tableau */}
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="2"
        stroke={color}
        strokeWidth="2"
      />

      {/* Ciel */}
      <path d="M4 4h16v8H4V4z" fill={color} fillOpacity="0.2" />

      {/* Soleil */}
      <circle cx="7" cy="7" r="2" fill={color} />

      {/* Montagnes */}
      <path d="M4 12l6-4 4 3 6-5v8H4v-2z" fill={color} fillOpacity="0.3" />

      {/* Arbre */}
      <path d="M16 12l2 4h-4l2-4z" fill={color} />
      <line x1="18" y1="16" x2="18" y2="18" stroke={color} strokeWidth="1" />

      {/* Maison */}
      <path d="M6 14l2-2 2 2v4H6v-4z" fill={color} />
      <rect x="7" y="15" width="1" height="1" fill={color} fillOpacity="0.5" />

      {/* Signature de l'artiste */}
      <path d="M18 19q-1 1 -2 0t2 0" stroke={color} strokeWidth="0.5" />
    </svg>
  );
}
