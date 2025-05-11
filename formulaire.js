// éléments HTML
const formDiv = document.querySelector("#volunteer-form");
const form = document.querySelector('#beVolunteerForm'); 
const prenomInput = document.querySelector("[name='prenom']");
const nomInput = document.querySelector("[name='nom']");
const emailInput = document.querySelector("[name='email']");
const villeInput = document.querySelector("[name='ville']");
const cpInput = document.querySelector("[name='cp']");
const dispoInput = document.querySelector("[name='dispos']");
const motivationInput = document.querySelector("[name='motivation']");
// Regex pour valider les emails
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const confirmationDiv = document.querySelector('#confirmation');



form.addEventListener('submit', function (event) {
  event.preventDefault();

  let hasError = false;

  // Reset de tous les messages d'erreur
  document.querySelectorAll('.error').forEach(div => {
    div.classList.add('invisible');
  });

  // Fonction utilitaire pour afficher une erreur
  function showError(input, message) {
    const errorDiv = input.parentElement.querySelector('.error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('invisible');
    hasError = true;
  }

  // Validation des champs
  if (!prenomInput.value.trim()) {
    showError(prenomInput, 'Le prénom est requis.');
  }else if (prenomInput.value.length < 2 || prenomInput.value.length > 10) {
    showError(prenomInput, 'Le prénom doit comporter entre 2 et 10 caractères.');
  }

  if (!nomInput.value.trim()) {
    showError(nomInput, 'Le nom est requis.');
  }else if (nomInput.value.length < 2 || nomInput.value.length > 10) {
    showError(nomInput, 'Le nom doit comporter entre 2 et 10 caractères.');
  }

  if (!emailInput.value.trim()) {
    showError(emailInput, 'L\'email est requis.');
  } else if (!emailRegex.test(emailInput.value.trim())) {
    showError(emailInput, 'L\'email n\'est pas valide.');
  }

  if (!villeInput.value.trim()) {
    showError(villeInput, 'La ville est requise.');
  }

  if (!cpInput.value.trim()) {
    showError(cpInput, 'Le code postal est requis.');
  } else if (!/^\d{5}$/.test(cpInput.value.trim())) {
    showError(cpInput, 'Le code postal doit comporter 5 chiffres.');
  }

  if (!dispoInput.value) {
    showError(dispoInput, 'Veuillez sélectionner une disponibilité.');
  }

  if (!motivationInput.value.trim()) {
    showError(motivationInput, 'Veuillez expliquer votre motivation.');
  }

  // Si tout est VALIDE, on peut le soumettre
  if (!hasError) {
	// récupération du prénom pour affichage du message
	const prenom = prenomInput.value.trim();

	// Masquer la div qui contient le formulaire
	formDiv.style.display = 'none';

	// Afficher le message de confirmation
	confirmationDiv.classList.remove('invisible');
	confirmationDiv.innerHTML = `
	<h3>Merci ${prenom}, votre formulaire est bien envoyé.</h3>
	<p>Nous vous contacterons très prochainement.</p>
	`;

	// Redirection vers index.html après 3 secondes
		setTimeout(function() {
			window.location.href = "index.html"; // Redirige vers la page d'accueil
		}, 5000); // 5 secondes
    //form.submit();
  }
});

