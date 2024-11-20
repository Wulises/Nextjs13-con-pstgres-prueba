'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      <h1>Datos desde PostgreSQL</h1>
      <ul>
        {data.map((row, index) => (
          <li key={index}>
            {JSON.stringify(row)}
          </li>
        ))}
      </ul>
    </main>
  );
}
