//1)récupération de l'id produit dans l'url
let params = new URLSearchParams(document.location.search);
console.log(params);
let id = params.get("id");
console.log('id= ' + id);

let _id = id;
let response;

//2)afichage des otions du produit
function option() {
  for (i = 0; i < response.colors.length; i++) {
    console.log('TEST: ' + response.colors);

    let optionsElt = document.createElement("option");
    optionsElt.textContent = response.colors[i];
    document.getElementById('selectoption').appendChild(optionsElt);
  }
}

//3)requête au serveur pour l'obtention d'un seul produit
let articlePageT = () => {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(this.responseText);
      console.log(response);
      let screen = document.getElementById('screen');
      screen.insertAdjacentHTML('afterbegin', '<div id="details"> <div class="thing"><ul class="about"><li> nom: ' + response.name + '</li><li>description: ' + response.description + '</li></ul><ul class="view"><li><img class="pic" src="' + response.imageUrl + '"></li><li><li>prix: ' + response.price / 100 + ' €</li></ul></div></div>');
      option();
    }
  };
  request.open("GET", "http://localhost:3000/api/teddies/" + _id);
  request.send();
};

window.addEventListener('load', articlePageT);

//4)bouton "ajouter au panier"
let addPanier = document.getElementById('addPanier');
addPanier.addEventListener('click', function () {

  //5)création initialisation du localstorage
  let first = [];

  function createCart() {

    let newArr = ['nouvelle', 'commande', 'orinoco'];
    first.push(newArr);
    console.log("first : " + first);
    console.log("type first : " + typeof (first));
    let firstString = JSON.stringify(first);
    console.log("first string: " + firstString);
    console.log("type FS: " + typeof (firstString));
    localStorage.setItem('myCart', firstString);
  };

  //6)vérification du contenu pour ajout de produit
  let firstParse;

  function getValue() {
    let reserve = localStorage.getItem("myCart");
    console.log("reserve : " + reserve);
    firstParse = JSON.parse(reserve);
    console.log("firstParse : " + firstParse);
    console.log("type first parse : " + typeof (firstParse));

    return firstParse;
  }

  //7)vérification de l'existance du local storage
  function isExist() {
    let exist = localStorage.getItem('myCart');
    console.log('type of existe : ' + exist);
    if (typeof (exist) === 'object') {
      console.log('je suis dans le if pour create le cart');
      createCart();
      getValue();
    } else {
      getValue();
    }
  };


  isExist();
  let achat = [response.name, response._id, response.price];
  console.log("achat : " + achat);
  firstParse = firstParse;
  firstParse.push(achat);
  console.log("ser+acha : " + firstParse);
  console.log('type new firstParse : ' + typeof (firstParse));
  let caddy = JSON.stringify(firstParse);
  console.log("caddy : " + caddy);
  localStorage.setItem("myCart", caddy);
});
//8) bouton revenir sur la boutique
let back = document.getElementById('btn-back');
back.addEventListener('click', function () {
  window.history.back();
});
