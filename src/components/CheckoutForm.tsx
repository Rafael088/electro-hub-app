'use client';

import { useState } from 'react';

import type { DatosEnvio } from '@/lib/validacion';
import { DATOS_VACIOS, erroresDeEnvio } from '@/lib/validacion';

interface CheckoutFormProps {
  onConfirmar: (datos: DatosEnvio) => void;
  enviando: boolean;
  error: string | null;
}

interface CampoProps {
  etiqueta: string;
  nombre: keyof DatosEnvio;
  valor: string;
  error?: string;
  tipo?: string;
  onCambio: (valor: string) => void;
}

const CAMPOS: { etiqueta: string; nombre: keyof DatosEnvio; tipo?: string }[] = [
  { etiqueta: 'Nombre completo', nombre: 'nombre' },
  { etiqueta: 'Correo electrónico', nombre: 'email', tipo: 'email' },
  { etiqueta: 'Teléfono', nombre: 'telefono', tipo: 'tel' },
  { etiqueta: 'Dirección', nombre: 'direccion' },
  { etiqueta: 'Ciudad', nombre: 'ciudad' },
  { etiqueta: 'Departamento', nombre: 'departamento' },
  { etiqueta: 'Código postal (opcional)', nombre: 'codigoPostal' },
];

const CLASE_CAMPO =
  'mt-1 w-full rounded border bg-background px-3 py-2 text-sm focus:border-acento focus:outline-none';

function Campo({ etiqueta, nombre, valor, error, tipo = 'text', onCambio }: CampoProps) {
  return (
    <label className="block">
      <span className="text-sm text-texto-secundario">{etiqueta}</span>
      <input
        type={tipo}
        name={nombre}
        value={valor}
        onChange={(evento) => onCambio(evento.target.value)}
        aria-invalid={Boolean(error)}
        className={`${CLASE_CAMPO} ${error ? 'border-error' : 'border-borde'}`}
      />
      {error && <span className="mt-1 block text-xs text-error">{error}</span>}
    </label>
  );
}
export function CheckoutForm({ onConfirmar, enviando, error }: CheckoutFormProps) {
  const [datos, setDatos] = useState<DatosEnvio>(DATOS_VACIOS);
  const [errores, setErrores] = useState<Record<string, string>>({});

  const cambiar = (campo: keyof DatosEnvio) => (valor: string): void => {
    setDatos((previo) => ({ ...previo, [campo]: valor }));
    // El usuario ya está corrigiendo: el aviso bajo ese campo dejó de servir
    setErrores((previo) =>
      campo in previo
        ? Object.fromEntries(Object.entries(previo).filter(([clave]) => clave !== campo))
        : previo
    );
  };

  const enviar = (evento: React.FormEvent<HTMLFormElement>): void => {
    evento.preventDefault();
    const encontrados = erroresDeEnvio(datos);
    setErrores(encontrados);
    if (Object.keys(encontrados).length === 0) onConfirmar(datos);
  };

  return (
    <form onSubmit={enviar} noValidate className="rounded-lg border border-borde bg-elevado p-6">
      <h2 className="font-display text-lg font-semibold">Datos de envío</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {CAMPOS.map((campo) => (
          <Campo
            key={campo.nombre}
            etiqueta={campo.etiqueta}
            nombre={campo.nombre}
            tipo={campo.tipo}
            valor={datos[campo.nombre] ?? ''}
            error={errores[campo.nombre]}
            onCambio={cambiar(campo.nombre)}
          />
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded border border-error p-3 text-sm text-error">{error}</p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="mt-6 w-full rounded bg-acento px-4 py-3 font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {enviando ? 'Procesando…' : 'Pagar'}
      </button>
      <p className="mt-2 text-xs text-texto-secundario">Envío gratis en Colombia. Pagas en Mercado Pago.</p>
    </form>
  );
}
