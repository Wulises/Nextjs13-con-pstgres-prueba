import { query } from '@/lib/db';  // Esto importa la función que usas para ejecutar consultas SQL

export async function POST(request) {
  try {
    // Obtener los datos enviados en el cuerpo de la solicitud
    const { nombre, codename, persona } = await request.json();

    // Verificar si todos los datos necesarios fueron enviados
    if (!nombre || !codename || !persona) {
      return new Response(
        JSON.stringify({ error: 'Faltan datos necesarios' }),
        { status: 400 }  // Si falta algún dato, devolver un error
      );
    }

    // Ejecutamos una consulta SQL para insertar el nuevo personaje en la base de datos
    const result = await query(
      'INSERT INTO waifus (nombre, codename, persona) VALUES ($1, $2, $3) RETURNING *',
      [nombre, codename, persona]  // Pasamos los valores que recibimos en el formulario
    );

    // Devuelve el personaje creado en la respuesta
    return new Response(JSON.stringify(result[0]), { status: 201 });  // 201 significa que la creación fue exitosa
  } catch (error) {
    console.error('Error al crear personaje:', error);
    return new Response(JSON.stringify({ error: 'Error al crear personaje' }), { status: 500 });
  }
}
