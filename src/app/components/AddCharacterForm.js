import React, { useState } from "react";

export default function AddCharacterForm({ onAddCharacter }) {
  const [formData, setFormData] = useState({
    nombre: "",
    codename: "",
    persona: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.nombre || !formData.codename || !formData.persona) {
      alert("Por favor, llena todos los campos.");
      return;
    }

    // Llama a la función onAddCharacter que recibimos como prop
    onAddCharacter(formData);

    // Limpia el formulario después de enviar
    setFormData({ nombre: "", codename: "", persona: "" });
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>Agregar Personaje</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          style={{ display: "block", width: "100%", padding: "0.5rem" }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Codename</label>
        <input
          type="text"
          name="codename"
          value={formData.codename}
          onChange={handleChange}
          style={{ display: "block", width: "100%", padding: "0.5rem" }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Persona</label>
        <input
          type="text"
          name="persona"
          value={formData.persona}
          onChange={handleChange}
          style={{ display: "block", width: "100%", padding: "0.5rem" }}
        />
      </div>
      <button type="submit" style={{ padding: "0.5rem 1rem", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "4px" }}>
        Agregar
      </button>
    </form>
  );
}
