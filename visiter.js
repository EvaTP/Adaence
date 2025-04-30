// Eléments HTML pour afficher tous les aines
const eldersDiv = document.querySelector("#loader");
let eldersList = [];
// search form
const formResultsDiv = document.querySelector("#searchFormResults");
// affichage du nombre de résultats dans le formulaire
const resultNbrDiv = document.querySelector("#nbrSearch");
// affichage du lien pour ré-initialiser les filtres
const resetLink = document.querySelector("#reset");

// Pagination
const paginationDiv = document.querySelector("#pagination");
const itemsPerPage = 8;
let currentPage = 1;

// affichage résultats search form Search Params
const searchParams = new URLSearchParams(window.location.search);
const typeRecherche = searchParams.get("moment-type");
const villeRecherche = searchParams.get("ville")?.toLowerCase();

// afficher tous les aînés
async function getElders() {
  const response = await fetch("./aines.json");
  eldersList = await response.json();
  console.log("🦊", eldersList);

  if (typeRecherche || villeRecherche) {
    showFilteredElders(eldersList);
  } else {
    showAllElders(eldersList);
  }
  //showAllElders(eldersList);
}
getElders();

// Afficher TOUS LES AINES
// photo, type de moment, prénom, métier, age, localisation, description
function showAllElders(eldersList) {
  eldersDiv.innerHTML = "";
  formResultsDiv.innerHTML = "";
  resultNbrDiv.innerHTML = "";
  console.log("🐸", eldersList);

  eldersList.forEach((elder) => {
    const card = document.createElement("div");
    const elderImage = document.createElement("img");
    const activity = document.createElement("p");
    const elderFirstname = document.createElement("h3");
    const occupation = document.createElement("p");
    // const age = document.createElement("p");
    const city = document.createElement("p");
    const description = document.createElement("p");
    const bookActivity = document.createElement("button");

    card.classList.add("eldercard");
    elderImage.classList.add("photoCard");
    activity.classList.add("textMomentCard");
    elderFirstname.classList.add("firstnameCard");
    description.classList.add("paragraphCard");
    bookActivity.classList.add("black");

    elderImage.src = `${elder.imageUrl}`;
    activity.innerText = `${elder.type}`;
    elderFirstname.innerText = `${elder.firstname}`;
    occupation.innerText = `${elder.job} ● ${elder.age} ans`;
    // age.innerText = elder.age;
    city.innerText = `${elder.city}`;
    description.innerText = `❝ ${elder.description} ❞`;
    bookActivity.innerText = "Programmer un moment";

    eldersDiv.appendChild(card);
    card.appendChild(elderImage);
    card.appendChild(activity);
    card.appendChild(elderFirstname);
    card.appendChild(occupation);
    // card.appendChild(age);
    card.appendChild(city);
    card.appendChild(description);
    card.appendChild(bookActivity);

    // ajouter un gestionnaire d'événements pour le bouton "Programmer un moment"
    bookActivity.addEventListener("click", () => {
      console.log(`${elder.firstname} - ${elder.type}`);
    });
  });
}


// Afficher les ainés FILTRES
function showFilteredElders(eldersList) {
  eldersDiv.innerHTML = "";
  formResultsDiv.innerHTML = "";
  resultNbrDiv.innerHTML = "";
  eldersDiv.style.display = "none";

  const filtered = eldersList.filter((elder) => {
    const matchType =
      !typeRecherche ||
      elder.type.toLowerCase().includes(typeRecherche.toLowerCase());
    const matchVille =
      !villeRecherche || elder.city.toLowerCase().includes(villeRecherche);
    console.log("🍓", matchType, typeRecherche, elder.type);
    console.log("🥝", matchVille, villeRecherche, elder.city);
    return matchType && matchVille;
  });

  if (filtered.length === 0) {
    resultNbrDiv.innerHTML = `<p>Aucun résultat trouvé.</p>`;
    resultNbrDiv.classList.add("nbrSearchResults");
  }
  resultNbrDiv.innerHTML = `<p>${filtered.length} résultat(s) trouvé(s)</p>`;
  resultNbrDiv.classList.add("nbrSearchResults");
  setResetLink();

  filtered.forEach((elder) => renderElderCard(elder, formResultsDiv));
}


// Génère et insère UNE carte pour un aîné donné dans le conteneur "card"
function renderElderCard(elder, formResultsDiv) {
  const card = document.createElement("div");
  const elderImage = document.createElement("img");
  const activity = document.createElement("p");
  const elderFirstname = document.createElement("h3");
  const occupation = document.createElement("p");
  const city = document.createElement("p");
  const description = document.createElement("p");
  const bookActivity = document.createElement("button");

	card.classList.add("eldercard");
	elderImage.classList.add("photoCard");
	activity.classList.add("textMomentCard");
	elderFirstname.classList.add("firstnameCard");
	description.classList.add("paragraphCard");
	bookActivity.classList.add("black");

  // Création du contenu de la carte
  elderImage.src = `${elder.imageUrl}`;
  activity.innerText = `${elder.type}`;
  elderFirstname.innerText = `${elder.firstname}`;
  occupation.innerText = `${elder.job} ● ${elder.age} ans`;
  city.innerText = `${elder.city}`;
  description.innerText = `❝ ${elder.description} ❞`;
  bookActivity.innerText = "Programmer un moment";

  // Ajout du contenu au DOM
  card.appendChild(elderImage);
  card.appendChild(activity);
  card.appendChild(elderFirstname);
  card.appendChild(occupation);
  card.appendChild(city);
  card.appendChild(description);
  card.appendChild(bookActivity);

  // Attacher l'événement sur le bouton après que le DOM a été mis à jour
  bookActivity.addEventListener("click", () => {
    console.log(`${elder.firstname} - ${elder.type}`);
  });

  // Ajouter la carte au conteneur
  formResultsDiv.appendChild(card);
}


// Reset lien formulaire
function setResetLink() {
  const link = document.createElement("a"); // Créer dynamiquement le lien
  link.href = "/visiter.html";
  link.innerText = "Réinitialiser les filtres";
 
  resetLink.appendChild(link);
}


  