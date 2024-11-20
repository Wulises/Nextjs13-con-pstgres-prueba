"use client"; 

import React, { useEffect, useState } from "react";
import AddCharacterForm from "@/app/components/AddCharacterForm";
import CharacterList from "@/app/components/CharacterList";

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

  async function handleAddCharacter(newCharacter) {
    try {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCharacter),
      });
      const addedCharacter = await res.json();
      setData((prevData) => [...prevData, addedCharacter]); // Actualiza la lista con el nuevo personaje
    } catch (error) {
      console.error("Error al agregar personaje:", error);
    }
  }

  return (
    <main style={{ padding: "2rem", backgroundColor: "#111", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Personajes de Persona 5</h1>
      <AddCharacterForm onAddCharacter={handleAddCharacter} />
      <CharacterList characters={data} />
    </main>
  );
}
