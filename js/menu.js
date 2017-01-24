/**
 * Created on 08/01/2017.
 */
//Initialisation du menu
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/menu.php', false);
    xhr.send(null);
    document.getElementById('menu').innerHTML = xhr.responseText;

	
//Requete onclik RAYON
function requestRayon(raId, raLibelle){
    //Fermeture de toutes les boites de dialogues
    $(".ui-dialog-content").dialog("close");

	var donnees = "raId="+raId+"&raLibelle="+raLibelle;

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'php/mainListeCategorie.php', false);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(donnees);
	document.getElementById('bcMain').innerHTML = xhr.responseText;
}

//Requete onclik CATEGORIE
function requestCategorie(caId, raId){
    //Fermeture de toutes les boites de dialogues
    $(".ui-dialog-content").dialog("close");

	var donnees = "caId="+caId+"&raId="+raId;
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'php/mainListeProduit.php', false);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(donnees);

	document.getElementById('bcMain').innerHTML = xhr.responseText;
}