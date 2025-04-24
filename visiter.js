// import { aines } from "./aines.js";

// Eléments HTML
const eldersDiv = document.querySelector("#loader");

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
		description.innerText = `${elder.description}`;
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

		// div.innerHTML = 
		// `${person.firstname}${person.age}
		// <img src="${person.imageUrl}" alt="${person.firstname}" style="max-width: 100px;">
		// `;
		// profilsDiv.appendChild(card);
	
	});
  }
	