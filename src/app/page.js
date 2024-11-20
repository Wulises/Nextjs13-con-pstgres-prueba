"use client"; // Asegura que este código se ejecute en el cliente

import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]); // Estado para la lista de personajes
  const [nombre, setNombre] = useState(""); // Estado para el campo "nombre" del formulario
  const [codename, setCodename] = useState(""); // Estado para el campo "codename"
  const [persona, setPersona] = useState(""); // Estado para el campo "persona"
  const [message, setMessage] = useState(""); // Mensaje de éxito o error

  // Función para obtener los personajes existentes desde el backend
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/data");
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, []);

  // Función para manejar el envío del formulario y agregar un nuevo personaje
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Enviar los datos al backend para agregar un nuevo personaje
    const response = await fetch("/api/data", {
      method: "POST", // Método POST para crear un personaje
      headers: {
        "Content-Type": "application/json", // Indicamos que estamos enviando JSON
      },
      body: JSON.stringify({ nombre, codename, persona }), // Datos del formulario
    });

    if (response.ok) {
      const newCharacter = await response.json();
      setMessage(`Personaje ${newCharacter.nombre} agregado correctamente.`);
      setData((prevData) => [...prevData, newCharacter]); // Actualizar la lista de personajes
      setNombre(""); // Limpiar los campos del formulario
      setCodename("");
      setPersona("");
    } else {
      const errorData = await response.json();
      setMessage(`Error: ${errorData.error}`);
    }
  };

  return (
    <main style={{ padding: "2rem", backgroundColor: "#111", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Personajes de Persona 5</h1>

      {/* Mensaje de éxito o error */}
      {message && <p style={{ textAlign: "center", color: "yellow" }}>{message}</p>}

      {/* Formulario para agregar un nuevo personaje */}
      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto", marginBottom: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="nombre" style={{ display: "block" }}>Nombre</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="codename" style={{ display: "block" }}>Codename</label>
          <input
            id="codename"
            type="text"
            value={codename}
            onChange={(e) => setCodename(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="persona" style={{ display: "block" }}>Persona</label>
          <input
            id="persona"
            type="text"
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <button type="submit" style={{ padding: "1rem", backgroundColor: "#FFD700", border: "none", borderRadius: "4px" }}>
          Agregar Personaje
        </button>
      </form>

      {/* Lista de personajes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        {data.map((personaje) => (
          <div
            key={personaje.id}
            style={{
              backgroundColor: "#222",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2 style={{ color: "#FFD700" }}>{personaje.nombre}</h2>
            <p><strong>Codename:</strong> {personaje.codename}</p>
            <p><strong>Persona:</strong> {personaje.persona}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
