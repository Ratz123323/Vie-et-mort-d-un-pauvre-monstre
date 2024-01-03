var nom; //nom du monstre
var life; //nombre de points de vie du monstre
var money; //argent du monstre
var awake = true; //état du monstre (éveillé = true, false sinon)
const DODO = 7000; //contante du temps de sommeil
var dead = false;
var nbVie =  0;
var travaillerTrop = 0;
var camion = false;


function init(n, l, m){
    nom = n;
    life = l;
    money = m;
    awake = true;
}

/* avec une alert :
function showme(){
    window.alert("nom du monstre : " + nom + ", vie du monstre : " + life + ", argent du monstre : " + money + ", monstre éveillé : " + awake)
}
*/

// avec la fonction log :
function showme(){
    if(dead){
        log("Chat mort");
    }else{
        log("Nom du monstre : " + nom + ", vie du monstre : " + life + ", argent du monstre : " + money + ", monstre éveillé : " + awake);
    image.src = "Chats/citoyen.gif";
    }
}


/*avec la fonction displayStatus :
function showme(){
    log("nom du monstre : " + nom + ", vie du monstre : " + life + ", argent du monstre : " + money + ", monstre éveillé : " + awake)
    displayStatus(life, money, awake);
}
*/

var bRun = document.getElementById("b2");
var bFight = document.getElementById("b3");
var bWork = document.getElementById("b7");
var bSleep = document.getElementById("b4");
var bEat = document.getElementById("b5");
var bShow = document.getElementById("b6");

var bNewLife = document.getElementById("b1");
var bKill = document.getElementById("k");

var aBox = document.getElementById("actionbox");

var lStatus = document.getElementById("status");

var body = document.getElementsByTagName("body")[0];
var html = document.getElementsByTagName("html")[0];

var image = document.getElementsByTagName("img")[0];

var titre = document.getElementsByTagName("h1")[0];

var bouton = document.querySelectorAll(".butt");

var hr = document.querySelectorAll(".hr");

/*
function go(){
    init("Nathan", 18, 0);
    bShow.addEventListener("click", showme);
}
*/

function main(){
    init("Nathan", 18, 10);
    displayStatus(18, 10, true);
    showme();
}

function log(message){
    let fChild = aBox.firstChild;
    let paragraphe = document.createElement("P");

    let text = document.createTextNode(message);
    paragraphe.appendChild(text);

    aBox.insertBefore(paragraphe, fChild);
}


function displayStatus(life, money, awake){

    //création de la nouvelle liste
    let newStatus = document.createElement("ul");
    newStatus.setAttribute("id", "status");

    //création des éléments de la liste
    let fChild = document.createElement("li");
    let sChild = document.createElement("li");
    sChild.setAttribute("class", "argent base");
    let tChild = document.createElement("li");

    //définition des éléments de la liste
    let fText = document.createTextNode("Life : " + life);
    let sText = document.createTextNode("Money : " + money);
    let tText;
    if(dead){
        tText = document.createTextNode("Dead");
    }else if(awake){
        tText = document.createTextNode("Awake");
    }else{
        tText = document.createTextNode("Asleep");
    }
    
    //assemblage des définitions aux élements
    fChild.appendChild(fText);
    sChild.appendChild(sText);
    tChild.appendChild(tText);

    //ajout des éléments dans la nouvelle liste
    newStatus.appendChild(fChild);
    newStatus.appendChild(sChild);
    newStatus.appendChild(tChild);

    //remplacement de l'ancienne liste par la nouvelle
    body.replaceChild(newStatus, lStatus);
    lStatus = document.getElementById("status");

    // variation de la couleur de la boite du monstre en fonction de son nombre de points de vie
    let monstre = document.getElementsByClassName("monster")[0];
    if(dead){
        monstre.id = "monster_dead";
    }else if(life < 5){
        monstre.id = "monster_veryLow";
    }else if((life >= 5) && (life < 10)){
        monstre.id = "monster_low";
    }else if((life >= 10) && (life < 15)){
        monstre.id = "monster_middle";
    }else if((life >= 15) && (life < 20)){
        monstre.id = "monster_hight";
    }else if(life >= 20){
        monstre.id = "monster_veryHight";
    }
    
    //variation de l'épaisseur de la boite du monstre en fonction de son nombre d'argent
    /* ancienne version
    if(dead){
        monstre.className = "monster dead";
    }else if(money < 10){
        monstre.className = "monster poor";
    }else if((money >= 10) && (money < 25)){
        monstre.className = "monster middle";
    }else if((money >= 25) && (money < 50)){
        monstre.className = "monster rich";
    }else if(money >= 50){
        monstre.className = "monster veryRich";
    }
    */

    var argent = document.getElementsByClassName("argent")[0];
    if(dead){
        argent.className = "argent dead";
    }else if(money < 10){
        argent.className = "argent poor";
    }else if((money >= 10) && (money < 25)){
        argent.className = "argent middle";
    }else if((money >= 25) && (money < 50)){
        argent.className = "argent rich";
    }else if(money >= 50){
        argent.className = "argent veryRich";
    }
    
}       

function run(){
    if((life > 1) && awake && !dead){
        life--;
        log("Le monstre fait du sport");
        displayStatus(life, money, awake);
        image.src = "Chats/sport.gif";
        travaillerTrop = 0;
    }else if(dead){
        log("Le monstre est mort, impossible de le faire du sport");
    }else if(!awake){
        log("Le monstre n'est pas réveillé, il ne peut donc pas faire du sport");
    }else if(life = 1){
        log("Le monstre n'a pas assez de points de vie pour faire du sport");
    }
}

function fight(){
    if((life > 3) && awake && !dead){
        life -= 3;
        log("Le monstre se bat");
        displayStatus(life, money, awake);
        image.src = "Chats/jouer.gif";
        travaillerTrop = 0;
    }else if(dead){
        log("Le monstre est mort, on ne fait pas combattre un mort !");
    }else if(!awake){
        log("Le monstre n'est pas réveillé, il ne peut donc pas se battre");
    }else if((life <= 3) && (life >= 1)){
        log("Le monstre n'a presque plus de vie ! Tu veux le tuer ?");
    }
}

function work(){
    if(travaillerTrop >= 3){
        camion = true;
        log("Le monstre a trop travaillé, IL S'EST FAIT ECRASE PAR UN CAMION !!!");
        awake = false;
        dead = true;
        displayStatus(0, 0, null);
        image.src = "Chats/camion.png";
        titre.id = "titreMort";
        html.className = "htmlMort";
        aBox.id = "actionboxMort";
        for (var i = 0; i < bouton.length; i++) {
            bouton[i].classList.replace("butt", "buttMort");
        }
        for (var i = 0; i < hr.length; i++) {
            hr[i].classList.replace("hr", "hrMort");
        }
        let monstre = document.getElementsByClassName("monster")[0];
        monstre.id = "monster_veryLow";
    }else if((life > 1) && awake && !dead){
        life--;
        money += 2;
        log("Le monstre travaille");
        displayStatus(life, money, awake);
        image.src = "Chats/travailler.gif";
        travaillerTrop++;
    }else if(dead){
        log("Le monstre est mort, tu ne peux pas le faire travailler");
    }else if(!awake){
        log("La vie n'est pas que du travail ! Laisse le monstre dormir !");
    }else if(life = 1){
        log("Le monstre n'a plus assez de points de vie pour travailler, laisse le se reposer un peu");
    }
}

function eat(){
    if(awake && (money > 3) && !dead){
        money -=3;
        life += 2;
        log("Le monstre mange");
        displayStatus(life, money, awake);
        image.src = "Chats/cuisiner.gif";
        travaillerTrop = 0;
    }else if(dead){
        log("Le monstre est mort ! Comment veux-tu qu'il mange ?");
    }else if(!awake){
        log("le monstre n'est pas réveillé");
    }else if(money <= 3){
        log("Plus assez d'argent pour manger ! Il faut travailler !");
    }
}

function sleep(){
    if(awake && !dead){
        log("Le monstre s'endort");
        awake = false;
        displayStatus(life, money, awake);
        life++;
        image.src = "Chats/bricoler.gif";
        travaillerTrop = 0;
        setTimeout(() => {
            displayStatus(life, money, true);
            image.src = "Chats/détente.gif";
        }, DODO);
        setTimeout(() => {
            log("Le monstre se réveille");
            awake = true;
        }, DODO);
    }
    else if(dead){
        log("Le monstre est mort, on peut dire qu'il dort déjà mais il ne va pas regagner de vie");
    }else if(!awake){
        log("Le monstre dort déjà");
    }
}

var tableauActions = [run, fight, work, eat, sleep];

function hasard(){
    let place = Math.round(Math.random()*100);
    while(!(place < 5)){
        place = Math.round(Math.random()*100);
    }
    tableauActions[place]();
}

function kill(){
    if(!dead && awake){
        log("Le monstre meurt");
        awake = false;
        dead = true;
        displayStatus(0, 0, null);
        image.src = "Chats/mort.png";
        travaillerTrop = 0;
    }else if(!awake){
        log("Tu veux tuer le monstre pendant son sommeil ? Tu es un lâche ! Le monstre est invincible pendant son sommeil !");
    }else if(dead){
        log("Le monstre est déjà mort et tu veux encore le tuer ?");
    }
}

function newLife(){
    if(dead){
        dead = false;

        let nouveauNom = window.prompt("Quel est le nom du nouveau monstre ?", "");
        let nouveauPtsVie = window.prompt("Quel est le nombre de points de vie de " + nouveauNom + " ?", "");

        // test de si le nombre de points de vie est correct
        while(isNaN(nouveauPtsVie) || nouveauPtsVie.trim() === ""){
            nouveauPtsVie = window.prompt("Quel est le nombre de points de vie de " + nouveauNom + " ? (Il faut donner un nombre)", "");
        }

        log("Nouvelle vie pour le monstre ! Il s'appelle maintenant " + nouveauNom);
        init(nouveauNom, nouveauPtsVie, 0);
        displayStatus(nouveauPtsVie, 0, true);
        nbVie++;
        image.src = "Chats/citoyen.gif";
        
        body.className = "normal";
        titre.id = "titre";
        html.className = "htmlBase";
        aBox.id = "actionbox";
        if(camion){
            for (var i = 0; i < bouton.length; i++) {
                bouton[i].classList.replace("buttMort", "butt");
            }
            for (var i = 0; i < hr.length; i++) {
                hr[i].classList.replace("hrMort", "hr");
            }
            camion = false;
        }
        travaillerTrop = 0;
    }else{
        log("Le monstre est encore en vie, il ne peut pas avoir 2 vies en même temps !");
    }
}

window.addEventListener("load", () => {
    main();
    //go();
    bShow.addEventListener("click", showme);

    bRun.addEventListener("click", run);
    bFight.addEventListener("click", fight);
    bWork.addEventListener("click", work);
    bEat.addEventListener("click", eat);
    bSleep.addEventListener("click", sleep);
    bKill.addEventListener("click", kill);
    bNewLife.addEventListener("click", newLife);
    
    //setInterval(hasard, 12000);
});