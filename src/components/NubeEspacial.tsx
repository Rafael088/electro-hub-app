// Nebulosa decorativa detrás de la barra de búsqueda (proyecto 5, parche 2):
// moradas, azul y cian respirando con estrellitas. Se intensifica al escribir.
interface INubeEspacialProps {
  intensa?: boolean;
}

interface Nube {
  posicion: { left?: string; right?: string; top?: string; bottom?: string };
  tamano: number;
  color: string;
  opacidad: number;
  duracion: number;
  retardo: number;
}

interface Estrella {
  posicion: { left?: string; right?: string; top?: string; bottom?: string };
  tamano: number;
  duracion: number;
  retardo: number;
}

const NUBES: Nube[] = [
  { posicion: { left: '-2rem', top: '-2.5rem' }, tamano: 176, color: '#7C3AED', opacidad: 0.4, duracion: 9, retardo: 0 },
  { posicion: { right: '-1.5rem', top: '-2rem' }, tamano: 160, color: '#1D4ED8', opacidad: 0.38, duracion: 11.5, retardo: -4 },
  { posicion: { left: '33%', bottom: '-2.5rem' }, tamano: 192, color: '#00F0FF', opacidad: 0.2, duracion: 13, retardo: -7.5 },
];

const ESTRELLAS: Estrella[] = [
  { posicion: { left: '14%', top: '20%' }, tamano: 3, duracion: 3.2, retardo: 0 },
  { posicion: { left: '52%', top: '12%' }, tamano: 2, duracion: 4, retardo: -1.2 },
  { posicion: { right: '16%', top: '34%' }, tamano: 3, duracion: 3.6, retardo: -2.4 },
  { posicion: { left: '30%', bottom: '24%' }, tamano: 2, duracion: 4.4, retardo: -0.8 },
  { posicion: { right: '34%', bottom: '16%' }, tamano: 3, duracion: 3.4, retardo: -2 },
  { posicion: { left: '70%', top: '58%' }, tamano: 2, duracion: 4.8, retardo: -3 },
];

export function NubeEspacial({ intensa = false }: INubeEspacialProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden rounded-2xl transition-opacity duration-500 ${
        intensa ? 'opacity-100' : 'opacity-60'
      }`}
    >
      {NUBES.map((nube) => (
        <span
          key={nube.color}
          className="absolute rounded-full blur-2xl"
          style={{
            ...nube.posicion,
            width: nube.tamano,
            height: nube.tamano,
            backgroundColor: nube.color,
            opacity: nube.opacidad,
            animation: `nubeEspacial ${nube.duracion}s ease-in-out infinite`,
            animationDelay: `${nube.retardo}s`,
          }}
        />
      ))}

      {ESTRELLAS.map((estrella) => (
        <span
          key={`${estrella.posicion.left ?? ''}${estrella.posicion.right ?? ''}`}
          className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]"
          style={{
            ...estrella.posicion,
            width: estrella.tamano,
            height: estrella.tamano,
            animation: `titila ${estrella.duracion}s ease-in-out infinite`,
            animationDelay: `${estrella.retardo}s`,
          }}
        />
      ))}
    </div>
  );
}
