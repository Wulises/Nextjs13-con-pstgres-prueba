import React from "react";

export default function CharacterList({ characters }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
      {characters.map((personaje) => (
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
          <p>
            <strong>Codename:</strong> {personaje.codename}
          </p>
          <p>
            <strong>Persona:</strong> {personaje.persona}
          </p>
        </div>
      ))}
    </div>
  );
}
