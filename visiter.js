// import { aines } from "./aines.js";

// Eléments HTML pour afficher tous les aines
const eldersDiv = document.querySelector("#loader");
const paginationDiv = document.querySelector("#pagination");

// afficher tous les aînés
async function getAines() {
	const response = await fetch('./aines.json');
	const eldersList = await response.json();
	console.log(eldersList);
	showElders(eldersList);
  }
  getAines();


  // recuperation des données des personnes dans l'HTML
  // photo, type de moment, prénom, métier, age, localisation, description
  function showElders(eldersList){
	eldersDiv.innerHTML = "";
	console.log(eldersList);
	eldersList.forEach(elder => {
		const card = document.createElement("div");
		const elderImage = document.createElement("img");
		const activity = document.createElement("p");
		const elderFirstname = document.createElement("h3");
		const occupation = document.createElement("p");
		const age = document.createElement("p");
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
		card.appendChild(age);
		card.appendChild(city);
		card.appendChild(description);
		card.appendChild(bookActivity);

		// ajouter un gestionnaire d'événements pour le bouton "Programmer un moment"
		bookActivity.addEventListener("click", () =>{
			console.log(`${elderFirstname} " - " ${activity}`);
		})
	});
  }

// affichage résultats search form
const searchParams = new URLSearchParams(window.location.search);
const typeRecherche = searchParams.get("moment-type");
const villeRecherche = searchParams.get("ville").toLowerCase();

const resultNbrDiv = document.querySelector("#nbrSearch");
const formResultsDiv = document.querySelector("#searchFormResults");



// Si des critères de recherche existent, on filtre
  if (typeRecherche && villeRecherche) {
	// eldersDiv.style.display = "none";
    formResultsDiv = eldersList.filter((elder) => {
      const matchType = !typeRecherche || elder.type.toLowerCase().includes(typeRecherche);
      const matchVille = !villeRecherche || elder.city.toLowerCase().includes(villeRecherche);
      return matchType && matchVille;
    });
	console.log("🍓=== ici" )
    // On masque l'affichage global
    // eldersDiv.style.display = "none";

    // Et on affiche les résultats filtrés
    showFilteredResults(filteredResults);
  } else {
    // Sinon on affiche tous les resultats
    showElders(eldersList);
  }
//getAines();


// Fonction d'affichage des résultats filtrés
// function showFilteredResults(list) {
// //   formResultsDiv.innerHTML = "";

//   if (list.length === 0) {
//     resultNbrDiv.innerHTML = "<p>Aucun résultat trouvé.</p>";
//     return;
//   }

//   list.forEach((elder) => {
//     const card = document.createElement("div");
//     card.classList.add("eldercard");

//     card.innerHTML = `
//       <img src="${elder.imageUrl}" class="photoCard" />
//       <p class="textMomentCard">${elder.type}</p>
//       <h3 class="firstnameCard">${elder.firstname}</h3>
//       <p>${elder.job} ● ${elder.age} ans</p>
//       <p>${elder.city}</p>
//       <p class="paragraphCard">❝ ${elder.description} ❞</p>
//       <button class="black">Programmer un moment</button>
//     `;

//     // Ajout du comportement du bouton
//     const button = card.querySelector("button");
//     button.addEventListener("click", () => {
//       console.log(`Visite prévue avec ${elder.firstname} pour ${elder.type}`);
//     });

//     formResultsDiv.appendChild(card);
//   });
// }

// Fonction d’affichage global si pas de filtre
// function showElders(list) {
//   eldersDiv.innerHTML = "";
//   list.forEach((elder) => {
//     // même logique que showFilteredResults
//   });
// }

	