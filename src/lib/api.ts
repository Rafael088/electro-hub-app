import { NextResponse } from 'next/server';

import type { IApiResponse } from '@/types';

// Toda respuesta de /api tiene la forma { data, error, message }.
export function crearRespuestaError<T>(error: string, message: string, status: number) {
  return NextResponse.json<IApiResponse<T>>({ data: null, error, message }, { status });
}

export function crearRespuestaExitosa<T>(data: T, message: string, status = 200) {
  return NextResponse.json<IApiResponse<T>>({ data, error: null, message }, { status });
}

// Un JSON roto no es un fallo del servidor: lo devolvemos como null para que
// Zod lo rechace con 400 en vez de que explote el request.json().
export async function leerCuerpoJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
