'use client';

interface FiltrosCategoriaProps {
  categorias: string[];
  activa: string | null;
  onElegir: (categoria: string | null) => void;
}

const CLASE_BASE =
  'rounded-full border px-3.5 py-1.5 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-acento';

export function FiltrosCategoria({ categorias, activa, onElegir }: FiltrosCategoriaProps) {
  const opciones = [{ valor: null as string | null, texto: 'Todos' }].concat(
    categorias.map((categoria) => ({ valor: categoria as string | null, texto: categoria }))
  );

  return (
    <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
      {opciones.map(({ valor, texto }) => {
        const seleccionada = activa === valor;

        return (
          <button
            key={texto}
            type="button"
            aria-pressed={seleccionada}
            onClick={() => onElegir(valor)}
            className={`${CLASE_BASE} ${
              seleccionada
                ? 'border-acento bg-acento/10 font-medium text-acento shadow-[0_0_22px_-10px_rgba(0,240,255,0.9)]'
                : 'border-borde/60 text-texto-secundario hover:border-acento/60 hover:text-acento'
            }`}
          >
            {texto}
          </button>
        );
      })}
    </div>
  );
}
