// Telaraña en la esquina superior izquierda con una araña que se balancea
// (proyecto 5). Decoración de Halloween sutil: hilos tenues y oscurita.
const HILO = 'rgba(196,203,235,0.3)';
const CUERPO = '#12131C';
const BORDE = 'rgba(160,165,205,0.65)';

interface TelaranaProps {
  className?: string;
}

export function DecoracionAraña({ className = '' }: TelaranaProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 420"
      fill="none"
      className={`pointer-events-none absolute -left-1 top-0 z-[-10] w-[150px] select-none md:w-[190px] ${className}`}
    >
      {/* Radiales de la telaraña */}
      <g stroke={HILO} strokeWidth="1">
        <path d="M0 0 L128.7 18.1" />
        <path d="M0 0 L109.1 70.9" />
        <path d="M0 0 L68.9 110.2" />
        <path d="M0 0 L18.1 128.7" />
        <path d="M0 0 L140 2" />
        <path d="M0 0 L2 140" />
      </g>

      {/* Aros curvados hacia la esquina */}
      <g stroke={HILO} strokeWidth="1">
        <path d="M44.6 6.3 Q31.6 11.8 37.8 24.5" />
        <path d="M37.8 24.5 Q23.7 24.1 23.9 38.2" />
        <path d="M23.9 38.2 Q11.5 31.7 6.3 44.6" />
        <path d="M84.2 11.8 Q59.7 22.3 71.3 46.3" />
        <path d="M71.3 46.3 Q44.7 45.5 45.1 72.1" />
        <path d="M45.1 72.1 Q21.8 59.9 11.8 84.2" />
        <path d="M123.8 17.4 Q89 33.3 104.9 68.1" />
        <path d="M104.9 68.1 Q66.6 67.7 66.3 106" />
        <path d="M66.3 106 Q32.5 89.3 17.4 123.8" />
      </g>

      {/* Hilo del que cuelga la araña */}
      <path d="M18.1 128.7 L18.1 291" stroke={HILO} strokeWidth="1" />

      {/* Araña balanceándose */}
      <g
        style={{
          transformBox: 'view-box',
          transformOrigin: '18px 291px',
          animation: 'telaranaMueve 6s ease-in-out infinite',
        }}
      >
        <ellipse cx="18" cy="303" rx="7.5" ry="9" fill={CUERPO} stroke={BORDE} strokeWidth="1.2" />
        <circle cx="18" cy="292.5" r="4.6" fill={CUERPO} stroke={BORDE} strokeWidth="1.2" />
        <circle cx="16.2" cy="291.4" r="0.9" fill="#FFD166" opacity="0.85" />
        <circle cx="19.8" cy="291.4" r="0.9" fill="#FFD166" opacity="0.85" />
        <g stroke={BORDE} strokeWidth="1.2" strokeLinecap="round">
          <path d="M11.5 297 C6 295 4 290 3 285" />
          <path d="M11 301 C5 301 2 298 0 294" />
          <path d="M11 305 C5 307 3 310 2.5 314" />
          <path d="M13 308 C8 312 7 316 7 320" />
          <path d="M24.5 297 C30 295 32 290 33 285" />
          <path d="M25 301 C31 301 34 298 36 294" />
          <path d="M25 305 C31 307 33 310 33.5 314" />
          <path d="M23 308 C28 312 29 316 29 320" />
        </g>
      </g>
    </svg>
  );
}
