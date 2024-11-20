"use client"; // Asegura que este código se ejecute en el cliente

import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/data");
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, []);

  return (
    <main style={{ padding: "2rem", backgroundColor: "#111", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Personajes de Persona 5</h1>
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
