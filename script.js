function displayImage() {
    const fileInput = document.getElementById('file');
    const imagePreview = document.getElementById('image-preview');
  
    
    imagePreview.innerHTML = '';
  
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;
        image.alt = 'Aperçu de l\'image';
        imagePreview.appendChild(image);
      };
  
      reader.readAsDataURL(fileInput.files[0]);
    }
  }



const repertoire = [];
let modificationIndex = -1;

function chargerInformations(index) {
  modificationIndex = index;
  const personne = repertoire[index];
  document.getElementById('prenom').value = personne.prenom;
  document.getElementById('nom').value = personne.nom;
  document.getElementById('grouper').value = personne.groupe;
  document.getElementById('biographier').value = personne.biographie;
  afficherImage(personne.image);
}

function afficherImage(imageURL) {
  const imagePreview = document.getElementById('image-preview');
  imagePreview.innerHTML = '';

  if (imageURL) {
    const imageElement = document.createElement('img');
    imageElement.src = imageURL;
    imageElement.alt = 'Aperçu de l\'image';
    imageElement.className = 'photo-preview';
    imagePreview.appendChild(imageElement);
  }
}

function enregisterRepertior(event) {
  event.preventDefault();

  const prenom = document.getElementById('prenom').value;
  const nom = document.getElementById('nom').value;
  const groupe = document.getElementById('grouper').value;
  const biographie = document.getElementById('biographier').value;
  const imageDeux = document.getElementById('file');

  const personne = {
    prenom: prenom.charAt(0).toUpperCase() + prenom.slice(1),
    nom: nom.charAt(0).toUpperCase() + nom.slice(1),
    groupe: groupe.charAt(0).toUpperCase() + groupe.slice(1),
    biographie: biographie.charAt(0).toUpperCase() + biographie.slice(1),
    image: imageDeux.files && imageDeux.files[0] ? URL.createObjectURL(imageDeux.files[0]) : '',
  };

  if (modificationIndex === -1) {
    repertoire.push(personne);
  } else {
    repertoire[modificationIndex] = personne;
    modificationIndex = -1;
  }

  document.getElementById('prenom').value = '';
  document.getElementById('nom').value = '';
  document.getElementById('grouper').value = '';
  document.getElementById('biographier').value = '';
  imageDeux.value = '';


  const imagePreview = document.getElementById('image-preview');
  imagePreview.innerHTML = '';
  afficherRepertoire();
}

function afficherRepertoire() {
  const ul = document.querySelector('.affichagerPer');
  ul.innerHTML = '';


  let totalHeight = 0;

  repertoire.forEach((personne, index) => {
    const liElement = document.createElement('li');
    liElement.className = 'personne';


    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container';

    
    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';

    const prenomElement = document.createElement('p');
    prenomElement.textContent = `Prénom: ${personne.prenom}`;
    textContainer.appendChild(prenomElement);

    const nomElement = document.createElement('p');
    nomElement.textContent = `Nom: ${personne.nom}`;
    textContainer.appendChild(nomElement);

    const groupeElement = document.createElement('p');
    groupeElement.textContent = `Groupe: ${personne.groupe}`;
    textContainer.appendChild(groupeElement);

    const biographie = document.createElement('p');
    biographie.textContent = `Biographie: ${personne.biographie}`;
    textContainer.appendChild(biographie);

    infoContainer.appendChild(textContainer);

    if (personne.image) {
      const image = new Image();
      image.src = personne.image;
      image.alt = 'Aperçu de l\'image';
      image.className = 'photo-preview';
      infoContainer.appendChild(image);
    }

    liElement.appendChild(infoContainer);

    liElement.addEventListener('click', () => chargerInformations(index));
    ul.appendChild(liElement);

//supprimer
    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'delete-icon';
    deleteIcon.innerHTML = '&#10060;'; 
    deleteIcon.addEventListener('click', () => supprimerEnregistrement(index));

    liElement.appendChild(deleteIcon);
    ul.appendChild(liElement);

    totalHeight += liElement.offsetHeight;
  });
  
}


function supprimerEnregistrement(index) {
  repertoire.splice(index, 1); 
  afficherRepertoire(); 
}

const monFormulaire = document.getElementById('monFormulaire');
monFormulaire.addEventListener('submit', enregisterRepertior);