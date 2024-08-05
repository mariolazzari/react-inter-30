"use client";
import { useState, useEffect } from "react";

import { Album } from "@/types/Abum";

export function ApiCache() {
  const [data, setData] = useState<Album[]>([]);
  const [cache, setCache] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("");

  const fecthAlbums = () => {
    if (cache.length > 0) {
      setMode("Cache data");
      return setData(cache);
    }

    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(res => res.json())
      .then(data => {
        setMode("Fetch data");
        setData(data);
        setCache(data);
      })
      .catch(err => console.error("Error lodaing albums", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fecthAlbums();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCache([]), 10000);

    return () => clearInterval(id);
  }, []);

  if (loading) {
    return <h2 className="text-3xl">Loading albums...</h2>;
  }

  return (
    <div className="w-full h-full p-8">
      <h2>Api response cache</h2>

      <button className="bg-blue-700 p-4 text-white" onClick={fecthAlbums}>
        Fetch
      </button>

      <h3 className="text-xl">{mode}</h3>

      <ul>
        {data.map(a => (
          <li key={a.id}>
            {a.id} {a.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
