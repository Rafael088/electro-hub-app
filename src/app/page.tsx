import { DecoracionAraña } from '@/components/DecoracionAraña';
import { EncabezadoTienda } from '@/components/EncabezadoTienda';
import { FondoDestellos } from '@/components/FondoDestellos';
import { TarjetaArticulo } from '@/components/TarjetaArticulo';
import {
  agruparPorCategoria,
  articulosDestacados,
  slugificarCategoria,
} from '@/lib/catalogoDemo';

export default function Home() {
  const grupos = agruparPorCategoria();
  const destacados = articulosDestacados();

  return (
    <main className="relative isolate flex-1">
      <FondoDestellos />
      <EncabezadoTienda mostrarMenu />
      <DecoracionAraña />

      <section className="px-4 pb-16 md:px-6">
        <p className="mt-10 pl-[6%] text-xs uppercase tracking-[0.45em] text-texto-secundario md:text-sm">
          <span aria-hidden="true" className="mr-1 normal-case">
            🎃
          </span>
          Destacados
        </p>

        {/* Selección de la semana: ofertas fuertes y los más pedidos (parche 1 proyecto 6) */}
        <div className="mt-4 flex flex-wrap gap-5 pl-[3%]">
          {destacados.map((articulo) => (
            <TarjetaArticulo key={articulo.id} articulo={articulo} />
          ))}
        </div>

        <div className="mt-10 space-y-10">
          {grupos.map((grupo, indice) => (
            <div key={grupo.categoria} id={`categoria-${slugificarCategoria(grupo.categoria)}`}>
              {/* Línea diferencial: separa una categoría de la siguiente */}
              {indice > 0 && (
                <div aria-hidden="true" className="mb-8 flex items-center gap-4 pr-[6%]">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-acento/45 to-acento/45" />
                  <span className="font-display text-sm text-acento/80 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
                    /
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent via-acento/45 to-acento/45" />
                </div>
              )}
              <p className="scroll-mt-28 pl-[6%] text-sm font-semibold text-acento/80">
                {grupo.categoria}
              </p>
              <div className="mt-4 flex flex-wrap gap-5 pl-[3%]">
                {grupo.articulos.map((articulo) => (
                  <TarjetaArticulo key={articulo.id} articulo={articulo} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
