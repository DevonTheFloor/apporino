let payer;

/*Récupération du panier dans le local storage pour affichage*/
let displayRecap = () => {
  let courses = localStorage.getItem("myCart");
  console.log("courses : " + courses);
  console.log(typeof (courses));
  payer = JSON.parse(courses);
  console.log("payer : " + payer);
  console.log(typeof (payer));
  let screen = document.getElementById('recapachat');
  payer.splice(0, 1);
  let soustotal = [];

  //affichege du panier et TOTAL achat
  payer.forEach(objet => {
    soustotal.push(objet[2]);
    screen.insertAdjacentHTML('afterbegin', '<li> Article: ' + objet[0] + ' ,n°: ' + objet[1] + ' prix: ' + objet[2] / 100 + ' €');

  });
  //Calcul du total de la commande
  console.log("sous total : " + soustotal);
  let prix;
  let total = 0;
  let i;
  for (i = 0; i < soustotal.length; i++) {
    total += parseInt(soustotal[i]);
  }
  prix = document.getElementById('price');
  prix.innerHTML = total / 100 + " €";
  console.log("TOTAL : " + total);
}

displayRecap();

/*Récupération des Id des produits de la commande*/
let products = [];

function productId() {
  payer.forEach(id => {
    products.push(id[1]);
    console.log("products : " + products);
    console.log("type OF products :" + typeof (products));
  });
};

productId();

console.log("products apres ID: " + products);

//Ciblage des valeurs des input du formaulaire 
let prenom = document.getElementById('firstName');
//let preValue;
let prenomVal = prenom.value;
let nom = document.getElementById('lastName');
//let nomValue;
let nomVal = nom.value;
let adresse = document.getElementById('address');
let adrValue;
let adresseVal = adresse.value;
let ville = document.getElementById('city');
let villeValue;
let villeVal = ville.value;
let mail = document.getElementById('email');
let mailVal = mail.value;
let mailValue;

//fonction de vérificatiçn de la validité des champs du formulaire
function verifChamps(regex, value) {
  let alert = document.getElementById('message');
  let verif = regex.test(value);
  if (verif == false) {
    alert.innerHTML = "champs non conforme !!";
    console.log("champs non comforme");
  } else {
    alert.innerHTML = " ";
  };
}

//création de l'objet contact à envoyer au serveur pour la commande
let contact;

//Application des regex sur les input du formulaire
function verifFormulaire() {

  let regexNom = /[a-z]{3}/;
  let regexMail = /[a-z]+@+/;
  
var list = document.getElementsByClassName("formelt");
for (let item of list) {
    console.log(item.id);
  item.addEventListener('blur', function (e) {
    let preValue = e.target.value;
    console.log("preValue " + preValue);
    verifChamps(regexNom, preValue);
    });
  }
  
    mail.addEventListener("focus", function (e) {
    mailValue = e.target.value;
    verifChamps(regexMail, mailValue);
    document.getElementById('go').style.display = "block";
  });
  
}

verifFormulaire();

//Création de l'objet contact à fournir au serveur pour le factureation
function contacter() {

  let preValue = prenom.value;
  console.log("prevalue conatc : " + preValue);
  let nomValue = nom.value;
  console.log("nom value contact : " + nomValue);
  adrValue = adresse.value;
  console.log('adr value contact : ' + adrValue);
  villeValue = ville.value;
  console.log('ville value contact : ' + villeValue);
  mailValue = mail.value;
  console.log('mail value contact : ' + mailValue);

  contact = {
    firstName: preValue,
    lastName: nomValue,
    address: adrValue,
    city: villeValue,
    email: mailValue
  }
  return contact;
};

console.log(" contact: " + contact);

//requete finale de commande contenant les informations de contact et les IDs produit
function achat() {
  contacter();
  let objt = {
    contact,
    products
  };
  console.log("objt : " + objt);
  let buy = JSON.stringify(objt);
  console.log(buy);
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE) {
      let confirmation = JSON.parse(this.responseText);
      console.log(confirmation);
      document.getElementById('ticket').innerHTML += "<p class=\"ticket\"> Votre commande à bien été prise en compte sous le numéro :  <br>" + confirmation.orderId + "<br>Merci de votre visite sur ORINOCO</p>";
    };
  }
  request.open("post", "http://localhost:3000/api/teddies/order");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(buy);
};

//bouton "acheter" pour envoyer le formulire de commande, vide le localstorage.
let send = document.getElementById('go');
send.addEventListener('click', function () {
  console.log('ok');
  achat();
  localStorage.clear();

});
