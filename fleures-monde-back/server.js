const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let requestCount = 0;

let mesBouquets = [
  { id: 1, nom: "Bouquet de Tunis", descr: "...", image: "/images/bouquetTunis.jpg", prix: 1500, likes: 0 },
  { id: 2, nom: "Bouquet d'Alger", descr: "...", image: "/images/bouqetAlger.jpg", prix: 2000, likes: 0 },
  { id: 3, nom: "Bouquet d'Oran", descr: "...", image: "/images/bouquetOran.jpg", prix: 2000, likes: 0 }
];

app.get("/api/bouquets", (req, res) => {
  requestCount++;
  res.json(mesBouquets);
});

app.post("/like", (req, res) => {
  const id = parseInt(req.query.id);
  const bouquet = mesBouquets.find(b => b.id === id);

  if (bouquet) {
    bouquet.likes++;
    res.json(bouquet);
  } else {
    res.status(404).json({ message: "Bouquet non trouvé" });
  }
});



// Afficher le nombre de requêtes par minute
setInterval(() => {
  console.log(`Requêtes reçues la dernière minute: ${requestCount}`);
  requestCount = 0;
}, 10000);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
