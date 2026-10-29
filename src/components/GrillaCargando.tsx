const TARJETAS = Array.from({ length: 8 });

export function GrillaCargando() {
  return (
    <div>
      <p role="status" className="sr-only">
        Cargando productos…
      </p>

      <ul aria-hidden="true" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {TARJETAS.map((_, indice) => (
          <li key={indice} className="esqueleto h-80 rounded-2xl" />
        ))}
      </ul>
    </div>
  );
}
