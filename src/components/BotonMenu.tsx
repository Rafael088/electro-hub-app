interface IBotonMenuProps {
  abierto: boolean;
  onToggle: () => void;
}

// Las 3 rayas del menú. Abierto: rectángulo de neón blanco con destellos que
// laten a sus costados (proyecto 4, pulido). Cerrado: neón cian normal.
export function BotonMenu({ abierto, onToggle }: IBotonMenuProps) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={abierto}
        onClick={onToggle}
        className={`rounded-lg border px-3 py-2 transition-all duration-300 ${
          abierto
            ? 'border-white/70 bg-black/40 shadow-[0_0_18px_rgba(255,255,255,0.85),inset_0_0_10px_rgba(255,255,255,0.25)]'
            : 'border-borde bg-elevado hover:border-acento'
        }`}
      >
        {[0, 1, 2].map(( posicion ) => (
          <span
            key={posicion}
            className={`block h-0.5 w-5 rounded transition-colors duration-300 ${
              posicion > 0 ? 'mt-1.5' : ''
            } ${
              abierto
                ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)]'
                : 'bg-acento'
            }`}
          />
        ))}
      </button>

      {abierto && (
        <>
          <span
            aria-hidden="true"
            className="absolute -left-5 top-1/2 h-0.5 w-4 origin-right animate-[destelloIzquierda_1.6s_ease-in-out_infinite] rounded bg-white shadow-[0_0_9px_rgba(255,255,255,0.95)]"
          />
          <span
            aria-hidden="true"
            className="absolute -right-5 top-1/2 h-0.5 w-4 origin-left animate-[destelloDerecha_1.6s_ease-in-out_infinite] rounded bg-white shadow-[0_0_9px_rgba(255,255,255,0.95)]"
          />
        </>
      )}
    </div>
  );
}
