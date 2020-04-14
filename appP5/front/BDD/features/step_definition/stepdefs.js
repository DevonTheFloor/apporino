const assert = require('assert');
const {Given,When,Then} = require('cucumber');

Given('je clique sur la boutique meuble en chêne', function () {
 let boutiqueMeubles =  ()=>{
   let request = new XMLHttpRequest();
   return response;
 };
});

Then('la page affiche les données du serveur', function () {
  let listMeubles = ()=>{
    return articles;
  };
});


function choisir_meuble (meuble){
}

Given('je choisi un produit, une page souvre', function () {
  this.meuble = 'table';
});

When('je l\'ai personnalisé , je l\'ajoute à mon panier', function () {
 function option() {
  for (i = 0; i < response.colors.length; i++) {
    console.log('TEST: ' + response.colors);

    let optionsElt = document.createElement("option");
    optionsElt.textContent = response.colors[i];
    document.getElementById('selectoption').appendChild(optionsElt);
  }
}
});


Then('je rempli correctement le formulaire pour passer commande', function () {
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
});

Then('un message de confirmation me recapitule mon achat', function () {
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

});
