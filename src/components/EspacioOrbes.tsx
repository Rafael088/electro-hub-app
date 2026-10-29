// Orbes de espacio (proyecto 5): morados, azules y pequeñitas amarillas que
// laten bajo "Productos relacionados". Las de abajo van más oscuras para dar
// la sensación de que entre más bajas más oscuro se hace.
interface Orbe {
  izquierda: string;
  arriba: string;
  tamano: number;
  color: string;
  difuminado: number;
  opacidad: number;
  duracion: number;
  retardo: number;
}

const AMARILLO = '#FFD166';

const ORBES: Orbe[] = [
  { izquierda: '6%', arriba: '6%', tamano: 96, color: '#6D28D9', difuminado: 28, opacidad: 0.3, duracion: 8, retardo: 0 },
  { izquierda: '72%', arriba: '4%', tamano: 64, color: '#1D4ED8', difuminado: 24, opacidad: 0.32, duracion: 9, retardo: -3 },
  { izquierda: '38%', arriba: '14%', tamano: 80, color: '#4338CA', difuminado: 26, opacidad: 0.28, duracion: 10.5, retardo: -5 },
  { izquierda: '86%', arriba: '20%', tamano: 56, color: '#7C3AED', difuminado: 22, opacidad: 0.26, duracion: 7.5, retardo: -2 },
  { izquierda: '16%', arriba: '30%', tamano: 72, color: '#2563EB', difuminado: 26, opacidad: 0.26, duracion: 11, retardo: -6 },
  { izquierda: '58%', arriba: '36%', tamano: 100, color: '#4C1D95', difuminado: 30, opacidad: 0.24, duracion: 12, retardo: -4 },
  { izquierda: '30%', arriba: '48%', tamano: 60, color: '#1E40AF', difuminado: 24, opacidad: 0.22, duracion: 9.5, retardo: -1.5 },
  { izquierda: '78%', arriba: '54%', tamano: 88, color: '#5B21B6', difuminado: 28, opacidad: 0.18, duracion: 11.5, retardo: -7 },
  { izquierda: '8%', arriba: '62%', tamano: 68, color: '#3730A3', difuminado: 26, opacidad: 0.16, duracion: 10, retardo: -3.5 },
  { izquierda: '50%', arriba: '70%', tamano: 76, color: '#1D4ED8', difuminado: 28, opacidad: 0.13, duracion: 12.5, retardo: -5.5 },
  { izquierda: '24%', arriba: '80%', tamano: 84, color: '#4C1D95', difuminado: 30, opacidad: 0.11, duracion: 13, retardo: -2.5 },
  { izquierda: '70%', arriba: '86%', tamano: 72, color: '#1E3A8A', difuminado: 28, opacidad: 0.09, duracion: 13.5, retardo: -6.5 },
  // Pequeñitas amarillas: poquitas y repartidas, como estrellas tibias
  { izquierda: '26%', arriba: '12%', tamano: 6, color: AMARILLO, difuminado: 0, opacidad: 1, duracion: 4, retardo: 0 },
  { izquierda: '64%', arriba: '24%', tamano: 5, color: AMARILLO, difuminado: 0, opacidad: 1, duracion: 4.8, retardo: -1 },
  { izquierda: '12%', arriba: '44%', tamano: 5, color: AMARILLO, difuminado: 0, opacidad: 1, duracion: 5.2, retardo: -2 },
  { izquierda: '82%', arriba: '58%', tamano: 6, color: AMARILLO, difuminado: 0, opacidad: 1, duracion: 4.4, retardo: -3 },
  { izquierda: '44%', arriba: '74%', tamano: 4, color: AMARILLO, difuminado: 0, opacidad: 1, duracion: 5.6, retardo: -1.5 },
  { izquierda: '60%', arriba: '90%', tamano: 5, color: AMARILLO, difuminado: 0, opacidad: 1, duracion: 6, retardo: -2.5 },
];

export function EspacioOrbes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {ORBES.map((orbe) => (
        <span
          key={`${orbe.izquierda}-${orbe.arriba}`}
          className="absolute rounded-full"
          style={{
            left: orbe.izquierda,
            top: orbe.arriba,
            width: orbe.tamano,
            height: orbe.tamano,
            backgroundColor: orbe.color,
            filter: orbe.difuminado > 0 ? `blur(${orbe.difuminado}px)` : 'none',
            opacity: orbe.opacidad,
            boxShadow: orbe.difuminado === 0 ? '0 0 10px rgba(255,209,102,0.75)' : 'none',
            animation:
              orbe.difuminado === 0
                ? `titila ${orbe.duracion}s ease-in-out infinite`
                : `orbilla ${orbe.duracion}s ease-in-out infinite`,
            animationDelay: `${orbe.retardo}s`,
          }}
        />
      ))}
    </div>
  );
}
