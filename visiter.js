// Eléments HTML
// *************
// Affichage de tous les aînés
const eldersDiv = document.querySelector("#loader");
let eldersList = [];
// search form pour filtrer les aînés
const formResultsDiv = document.querySelector("#searchFormResults");
// affichage du nombre de résultats dans le formulaire
const resultNbrDiv = document.querySelector("#nbrSearch");
// affichage du lien pour ré-initialiser les filtres
const resetLink = document.querySelector("#reset");

// Pagination
const paginationDiv = document.querySelector("#pagination");
const pageNumbersDiv = document.querySelector("#page-numbers");
const itemsPerPage = 6;
let currentPage = 0;
const nextButton = document.querySelector("#btn-next");
const previousButton = document.querySelector("#btn-previous");

// affichage résultats search form Search Params
const searchParams = new URLSearchParams(window.location.search);
const typeRecherche = searchParams.get("moment-type");
const villeRecherche = searchParams.get("ville")?.toLowerCase();


// fonction GLOBALE afficher aînés
// *******************************
async function getElders() {
  const response = await fetch("./aines.json");
  eldersList = await response.json();
  console.log("🦊", eldersList);

  if (typeRecherche || villeRecherche) {
    showFilteredElders(eldersList);
  } else {
    showAllElders(eldersList);
  }
}
getElders();


// Afficher TOUS LES AINES
// ***********************
// photo, type de moment, prénom, métier, age, localisation, description
function showAllElders(eldersList) {
  eldersDiv.innerHTML = "";
  formResultsDiv.innerHTML = "";
  resultNbrDiv.innerHTML = "";
  console.log("🐸", eldersList);

  const startPage = currentPage * itemsPerPage;  // première page
  const endPage = startPage + itemsPerPage;       // première page + 6 elders
  const showPaginatedElders = eldersList.slice(startPage, endPage);

  showPaginatedElders.forEach((elder) => {
    console.log("🐷");
    console.log(eldersList);
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
    bookActivity.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(`${elder.firstname} - ${elder.type}`);
    });
  });
  renderPagination(eldersList);
}


// Afficher les ainés FILTRÉS
// **************************
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
      !villeRecherche || elder.city?.toLowerCase().includes(villeRecherche);
    console.log("🍓", matchType, typeRecherche, elder.type);
    console.log("🥝", matchVille, villeRecherche, elder.city);
    return matchType && matchVille;
  });

  if (filtered.length === 0) {
    resultNbrDiv.innerHTML = `<p>Aucun résultat trouvé.</p>`;
    resultNbrDiv.classList.add("nbrSearchResults");
  }else{
    resultNbrDiv.innerHTML = `<p>${filtered.length} résultat(s) trouvé(s)</p>`;
    resultNbrDiv.classList.add("nbrSearchResults");
  }
  setResetLink();

  filtered.forEach((elder) => renderElderCard(elder, formResultsDiv));
}

// Fonctions utilitaires
// *********************

// GENERER / INSERER UNE card pour un aîné donné dans le conteneur "card"
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
  bookActivity.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(`${elder.firstname} - ${elder.type}`);
  });

  // Ajouter la carte au conteneur
  formResultsDiv.appendChild(card);
}


// RESET lien formulaire
function setResetLink() {
  const link = document.createElement("a"); // Créer dynamiquement le lien
  link.href = "/visiter.html";
  link.innerText = "Réinitialiser les filtres";
 
  resetLink.appendChild(link);
}


// Affichage de la PAGINATION
function renderPagination(eldersList){
	const totalPages = Math.ceil(eldersList.length / itemsPerPage);
	pageNumbersDiv.innerHTML = "";
  
	  for(let i = 0; i < totalPages; i++){
		const pageNumberBtn = document.createElement("button");
		pageNumberBtn.innerText = i + 1;
		pageNumberBtn.classList.add("pagination");
		  if(i === currentPage){
			pageNumberBtn.classList.add("active");
		  }
		  pageNumberBtn.addEventListener("click", ()=>{
			currentPage = i;
			showAllElders(eldersList);
		  });
		  pageNumbersDiv.appendChild(pageNumberBtn);
	  }
	  // Met à jour l'état des boutons précédent/suivant
	  // assure que l’état des boutons "Précédent" et "Suivant" soit correct à chaque changement de page, même quand on change de page en cliquant sur un bouton numérique.
	previousButton.disabled = currentPage === 0;
	nextButton.disabled = (currentPage + 1) * itemsPerPage >= eldersList.length;
  }
  
  // bouton PRECEDENT
  previousButton.addEventListener("click", ()=>{
	if(currentPage > 0){
	  currentPage--;
	  showAllElders(eldersList);
	  nextButton.disabled = false;
	}
	if(currentPage === 0){
	  previousButton.disabled = true;
	}
  });
  // bouton SUIVANT
  nextButton.addEventListener("click", ()=>{
	currentPage++;
	showAllElders(eldersList);
	if((currentPage + 1) * itemsPerPage >= eldersList.length){
	  nextButton.disabled = true;
	};
  });
  
