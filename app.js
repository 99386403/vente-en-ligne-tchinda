let produits = [
  {id: 1, nom: "Chaussures Sport", prix: 12000, image: "https://via.placeholder.com/200x200.png?text=Chaussures"},
  {id: 2, nom: "Robe Femme", prix: 8500, image: "https://via.placeholder.com/200x200.png?text=Habits"},
  {id: 3, nom: "Collier Doré", prix: 15000, image: "https://via.placeholder.com/200x200.png?text=Bijoux"},
  {id: 4, nom: "Mini Speaker", prix: 9500, image: "https://via.placeholder.com/200x200.png?text=Électronique"}
];
let panier = [];

window.onload = function () {
  const produitDiv = document.getElementById('produits');
  produits.forEach(p => {
    let div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `<img src="${p.image}"><h3>${p.nom}</h3><p>${p.prix} FCFA</p><button onclick="ajoutePanier(${p.id})">Ajouter</button>`;
    produitDiv.appendChild(div);
  });

  document.getElementById('vider-panier').onclick = () => {
    panier = [];
    majPanier();
  };

  document.getElementById('form-commande').onsubmit = (e) => {
    e.preventDefault();
    document.getElementById('confirmation').textContent = "✅ Commande envoyée avec succès !";
    panier = [];
    majPanier();
  };
}

function ajoutePanier(id) {
  const produit = produits.find(p => p.id === id);
  panier.push(produit);
  majPanier();
}

function majPanier() {
  const ul = document.getElementById('liste-panier');
  ul.innerHTML = '';
  let total = 0;
  panier.forEach(p => {
    total += p.prix;
    let li = document.createElement('li');
    li.textContent = `${p.nom} - ${p.prix} FCFA`;
    ul.appendChild(li);
  });
  document.getElementById('total').textContent = total;
}