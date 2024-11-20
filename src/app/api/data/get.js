import { query } from '@/lib/db';

export async function GET() {
  try {
    const data = await query('SELECT * FROM waifus', []);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener datos' }), { status: 500 });
  }
}
