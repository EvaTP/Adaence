// Eléments HTML pour afficher tous les aines
// const eldersDiv = document.querySelector("#loader");
const formResultsDiv = document.querySelector("#searchFormResults");
const resultNbrDiv = document.querySelector("#nbrSearch");


// renvoi vers page VISITER.html et affichage des résultats search form
const searchParams = new URLSearchParams(window.location.search);
const typeRecherche = searchParams.get("moment-type");
const villeRecherche = searchParams.get("ville")?.toLowerCase();

// afficher tous les aînés
async function getElders() {
  const response = await fetch("./aines.json");
  const eldersList = await response.json();
  console.log("🦊", eldersList);

  showAllElders(await eldersList);
}

