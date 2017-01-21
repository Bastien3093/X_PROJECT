/**
 * Created on 12/01/2017.
 */

//***** Initialisation *****
//Définition de la hauteur du main
//Hauteur du main = hauteur totale - ( hauteur header(125px) + hauteur menu(80px) + hauteur footer(25px) + marge de sécurité(10px) -> 240px )
var headerHeight = 240;
var mainHeight = $(document).height() - headerHeight;
document.querySelector('main').style.height = mainHeight + 'px';


//window.onresize = function () {
//    mainHeight = $(document).height() - headerHeight;
//    document.getElementById("bcMain").innerHTML = mainHeight;
//    document.querySelector('main').style.height = mainHeight + 'px';
//}






/**
 * Ecrit l'erreur de requete HTTP dnas le fichier erreur_ajax.txt
 * @param statut
 * @param erreur
 * @param resultat
 */
function erreurRequeteFile(statut, erreur, resultat){

    var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
    var fileError = fileSystem.OpenTextFile("erreur_ajax.txt", 2 ,true);

    fileError.WriteLine("error "+statut+" err "+erreur+" res "+resultat);
    fileError.Close();
}

