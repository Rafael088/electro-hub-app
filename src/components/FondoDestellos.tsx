// Decoración de la portada (proyecto 3): destellitos azules que suben desde el
// fondo hacia arriba y se pierden. Efecto visual únicamente, sin interacción.
interface Destello {
  posicion: string;
  retardo: number;
  duracion: number;
  tamano: number;
  esEstrella: boolean;
}

const DESTELLOS: Destello[] = [
  { posicion: '5%', retardo: 0, duracion: 11, tamano: 7, esEstrella: false },
  { posicion: '12%', retardo: 2.5, duracion: 9, tamano: 4, esEstrella: true },
  { posicion: '19%', retardo: 4, duracion: 12, tamano: 6, esEstrella: false },
  { posicion: '26%', retardo: 1, duracion: 10, tamano: 5, esEstrella: false },
  { posicion: '33%', retardo: 5.5, duracion: 13, tamano: 8, esEstrella: true },
  { posicion: '41%', retardo: 3, duracion: 9.5, tamano: 4, esEstrella: false },
  { posicion: '48%', retardo: 6.5, duracion: 11, tamano: 6, esEstrella: false },
  { posicion: '55%', retardo: 0.5, duracion: 10.5, tamano: 5, esEstrella: true },
  { posicion: '63%', retardo: 4.5, duracion: 12.5, tamano: 7, esEstrella: false },
  { posicion: '71%', retardo: 2, duracion: 9, tamano: 4, esEstrella: false },
  { posicion: '78%', retardo: 7, duracion: 11.5, tamano: 6, esEstrella: true },
  { posicion: '86%', retardo: 3.5, duracion: 10, tamano: 5, esEstrella: false },
  { posicion: '93%', retardo: 1.5, duracion: 12, tamano: 7, esEstrella: false },
  { posicion: '97%', retardo: 6, duracion: 9.5, tamano: 4, esEstrella: true },
];

export function FondoDestellos() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-[75vh] overflow-hidden"
    >
      {/* Brillo tenue de base: de ahí nacen los destellos y se van perdiendo arriba */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[rgba(0,140,255,0.22)] to-transparent blur-xl" />

      {DESTELLOS.map((destello) => (
        <span
          key={`${destello.posicion}-${destello.retardo}`}
          className={
            destello.esEstrella
              ? 'absolute bottom-0 font-mono leading-none text-acento [animation:destelloSube_linear_infinite]'
              : 'absolute bottom-0 rounded-full bg-acento shadow-[0_0_10px_rgba(0,240,255,0.9)] [animation:destelloSube_linear_infinite]'
          }
          style={{
            left: destello.posicion,
            fontSize: destello.tamano + 6,
            width: destello.tamano,
            height: destello.tamano,
            animationDelay: `${destello.retardo}s`,
            animationDuration: `${destello.duracion}s`,
          }}
        >
          {destello.esEstrella ? '✦' : ''}
        </span>
      ))}
    </div>
  );
}
