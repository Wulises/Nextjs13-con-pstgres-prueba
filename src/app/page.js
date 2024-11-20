"use client";  // Hace que este código se ejecute en el cliente

import React, { useState } from "react";

export default function Home() {
  const [nombre, setNombre] = useState("");   // Estado para el campo "nombre"
  const [codename, setCodename] = useState(""); // Estado para el campo "codename"
  const [persona, setPersona] = useState("");   // Estado para el campo "persona"
  const [message, setMessage] = useState("");   // Estado para el mensaje de éxito o error

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevenir el comportamiento predeterminado del formulario

    // Enviar los datos al backend
    const response = await fetch("/api/data", {
      method: "POST",  // Usamos POST porque estamos creando un nuevo personaje
      headers: {
        "Content-Type": "application/json",  // Indicamos que estamos enviando datos en formato JSON
      },
      body: JSON.stringify({ nombre, codename, persona }),  // Enviamos los datos como JSON
    });

    // Manejar la respuesta del backend
    if (response.ok) {
      const data = await response.json();
      setMessage(`Personaje ${data.nombre} agregado correctamente.`);  // Mensaje de éxito
      setNombre("");  // Limpiar los campos después de agregar el personaje
      setCodename("");
      setPersona("");
    } else {
      const errorData = await response.json();
      setMessage(`Error: ${errorData.error}`);  // Mensaje de error
    }
  };

  return (
    <main style={{ padding: "2rem", backgroundColor: "#111", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Agregar Personaje</h1>

      {/* Mostrar mensaje de éxito o error */}
      {message && <p style={{ textAlign: "center", color: "yellow" }}>{message}</p>}

      {/* Formulario para agregar un personaje */}
      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="nombre" style={{ display: "block" }}>Nombre</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}  // Actualiza el estado cuando el usuario escribe
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="codename" style={{ display: "block" }}>Codename</label>
          <input
            id="codename"
            type="text"
            value={codename}
            onChange={(e) => setCodename(e.target.value)}  // Actualiza el estado cuando el usuario escribe
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="persona" style={{ display: "block" }}>Persona</label>
          <input
            id="persona"
            type="text"
            value={persona}
            onChange={(e) => setPersona(e.target.value)}  // Actualiza el estado cuando el usuario escribe
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <button type="submit" style={{ padding: "1rem", backgroundColor: "#FFD700", border: "none", borderRadius: "4px" }}>
          Agregar Personaje
        </button>
      </form>
    </main>
  );
}
