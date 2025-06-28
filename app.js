let produits = [
  {id: 1, nom: "Chaussures Sport", prix: 12000, categorie: "Chaussures", images: ["https://via.placeholder.com/200x200.png?text=Chaussure1", "https://via.placeholder.com/200x200.png?text=Chaussure2"]},
  {id: 2, nom: "Robe Femme", prix: 8500, categorie: "Habits", images: ["https://via.placeholder.com/200x200.png?text=Robe1", "https://via.placeholder.com/200x200.png?text=Robe2"]},
  {id: 3, nom: "Collier Or", prix: 15000, categorie: "Bijoux", images: ["https://via.placeholder.com/200x200.png?text=Bijoux1"]},
  {id: 4, nom: "Speaker Bluetooth", prix: 9500, categorie: "Électronique", images: ["https://via.placeholder.com/200x200.png?text=Speaker1"]}
];
let panier = [];
let favoris = [];

window.onload = function () {
  afficherCategories();
  afficherProduits(produits);
  document.getElementById('search').oninput = () => {
    const val = document.getElementById('search').value.toLowerCase();
    const filtres = produits.filter(p => p.nom.toLowerCase().includes(val));
    afficherProduits(filtres);
  };
  document.getElementById('vider-panier').onclick = () => {
    panier = [];
    majPanier();
  };
  document.getElementById('form-commande').onsubmit = e => {
    e.preventDefault();
    let nom = document.getElementById('nom').value;
    let tel = document.getElementById('telephone').value;
    let adr = document.getElementById('adresse').value;
    let etat = document.getElementById('etat').value;
    let msg = `🛒 COMMANDE TCHINDA\nNom: ${nom}\nTéléphone: ${tel}\nAdresse: ${adr}\nÉtat: ${etat}\n---\n`;
    panier.forEach(p => { msg += `• ${p.nom} - ${p.prix} FCFA\n`; });
    msg += `Total: ${panier.reduce((t, p) => t + p.prix, 0)} FCFA`;
    window.open(`https://wa.me/237682028484?text=${encodeURIComponent(msg)}`, "_blank");
    panier = [];
    majPanier();
  };
};

function afficherCategories() {
  let cats = [...new Set(produits.map(p => p.categorie))];
  let nav = document.getElementById('categories');
  cats.forEach(c => {
    let b = document.createElement('button');
    b.innerText = c;
    b.onclick = () => {
      const filtres = produits.filter(p => p.categorie === c);
      afficherProduits(filtres);
    };
    nav.appendChild(b);
  });
}

function afficherProduits(liste) {
  let div = document.getElementById('produits');
  div.innerHTML = '';
  liste.forEach(p => {
    let d = document.createElement('div');
    d.className = 'product';
    let imagesHTML = p.images.map(img => `<img src="${img}" alt="${p.nom}"/>`).join('');
    d.innerHTML = `<h3>${p.nom}</h3>${imagesHTML}<p>${p.prix} FCFA</p>
      <button onclick="ajouterPanier(${p.id})">Ajouter</button>
      <span class="favorite" onclick="ajouterFavori(${p.id})">❤️</span>`;
    div.appendChild(d);
  });
}

function ajouterPanier(id) {
  const p = produits.find(x => x.id === id);
  panier.push(p);
  majPanier();
}

function ajouterFavori(id) {
  if (!favoris.includes(id)) {
    favoris.push(id);
    alert("Ajouté aux favoris !");
  }
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