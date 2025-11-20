import React, { useEffect, useState } from "react";
import Bouquet from "../components/Bouquet";

function Bouquets() {
  const [bouquets, setBouquets] = useState([]);

  // Charger les bouquets au début
  const loadBouquets = () => {
    fetch("http://localhost:3000/api/bouquets")
      .then(res => res.json())
      .then(data => setBouquets(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadBouquets(); // premier chargement

    // 🔄 Pulling toutes les 60 secondes
    const interval = setInterval(() => {
      loadBouquets();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Fonction like
  const handleLike = (id) => {
    fetch(`http://localhost:3000/like?id=${id}`, { method: "POST" })
      .then(res => res.json())
      .then(() => loadBouquets()) // recharger les bouquets après like
      .catch(err => console.error(err));
  };

  return (
    <div className="row">
      {bouquets.map(b => (
        <div key={b.id} className="col-md-4 mb-3">
          <Bouquet bouquet={b} onLike={handleLike} />
        </div>
      ))}
    </div>
  );
}

export default Bouquets;
