import { query } from '@/lib/db'; // Importamos la función para ejecutar consultas SQL

// Handler para obtener datos
export async function GET(request) {
  try {
    // Consultar todas las filas de la tabla "waifus"
    const data = await query('SELECT * FROM waifus', []);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener datos' }), { status: 500 });
  }
}

// Handler para crear un nuevo dato
export async function POST(request) {
  try {
    const { nombre, codename, persona } = await request.json();
    if (!nombre || !codename || !persona) {
      return new Response(
        JSON.stringify({ error: 'Faltan datos necesarios' }),
        { status: 400 }
      );
    }

    const result = await query(
      'INSERT INTO waifus (nombre, codename, persona) VALUES ($1, $2, $3) RETURNING *',
      [nombre, codename, persona]
    );

    return new Response(JSON.stringify(result[0]), { status: 201 });
  } catch (error) {
    console.error('Error al crear personaje:', error);
    return new Response(JSON.stringify({ error: 'Error al crear personaje' }), { status: 500 });
  }
}
