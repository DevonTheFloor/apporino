let response;
// 1) class boutique en constructor la method et l'url de la requête
const URI = "http://localhost:3000/api/";
class Boutique {

  constructor(verbe, speciale) {
    this.verbe = verbe;
    this.speciale = speciale;
  }
  specialisee() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        response = JSON.parse(this.responseText);
        console.log(response);

        let screen = document.getElementById('content');
        screen.innerHTML = "";
        response.forEach(objet => {
          screen.insertAdjacentHTML('afterbegin', '<a class="article" href="article.html?id=' + objet._id + '"><div class="thing"><ul class="about"><li> nom: ' + objet.name + '</li><li>description: ' + objet.description + '</li></ul><ul class="view"><li><img class="pic" src="' + objet.imageUrl + '"></li><li>prix: ' + objet.price / 100 + ' €</li></ul></div></a>');
          return screen;
        });
      };
    }
    request.open(this.verbe, URI + this.speciale);
    request.send();
    return response;
  }
}
// 2) Bouton pour cgarger la boutique Ours en peluche
let teddies = new Boutique("GET", "teddies");
let btnteddy = document.getElementById('teddy');
btnteddy.addEventListener('click', () => {
  teddies.specialisee();
});
// 3) Bouton pour charger la boutique Cameras vintages
let cameras = new Boutique("GET", "cameras/");
let btncam = document.getElementById('cam');
btncam.addEventListener('click', () => {
  cameras.specialisee();
});
// 3)bouton pour charger la boutique Meubles en chênes
let furnitures = new Boutique("GET", "furniture/")
let btnfurni = document.getElementById('furni');
btnfurni.addEventListener('click', () => {
  furnitures.specialisee();
});
