/**
 * Created on 12/01/2017.
 */

//***** Initialisation *****

    //Variable de localisation de page (sur quelle page on est...)
    var pageCourante = 'accueil';


//Définition de la hauteur du main
//Hauteur du main = hauteur totale - ( hauteur header(125px) + hauteur menu(80px) + hauteur footer(25px) + marge de sécurité(10px) -> 240px )
var headerHeight = 240;
var mainHeight = $(document).height() - headerHeight;
//si la hauteur du main est trop petite (ex : smartphones) main = 100%
if (mainHeight < (550-240)) document.querySelector('main').style.height = "100%";
//sinon hauteur fixe
else document.querySelector('main').style.height = mainHeight + 'px';


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

/**
 *
 * @param message
 * @param bouton
 * @param autreDonnee
 */
function alerte(message, bouton, autreDonnee) {
    if($('#bcAlerte').is(':ui-dialog')) closeDialogue();

    var data = '<div id="alerte">' +
                    '<p>' + message + '</p>';
    if(autreDonnee) data += autreDonnee;
            data += '<input type="button" value="Annuler" onclick="closeDialogue();">' +
                    '<input type="button" value="Confirmer" onclick="' + bouton + '">' +
                '</div>';

    document.getElementById('bcAlerte').innerHTML = data;
    $("#bcAlerte").dialog({
        close: function() {
            document.getElementById('bcAlerte').innerHTML = "";
            $('#bcAlerte').dialog("destroy");
        },
        draggable: false,
        resizable: false,
        modal: true
    });
}

/**
 *
 * @param message
 */
function alerteSimple(message, sortie) {
    if($('#bcAlerte').is(':ui-dialog')) closeDialogue();


        var data = '<div id="alerte">' +
                        '<p>' + message + '</p>';
    if (sortie) data += '<input type="button" value="Ok" onclick="' + sortie + '">';
    else        data += '<input type="button" value="Ok" onclick="closeDialogue();">';
            data += '</div>';

    document.getElementById('bcAlerte').innerHTML = data;
    $("#bcAlerte").dialog({
        close: function() {
            document.getElementById('bcAlerte').innerHTML = "";
            $('#bcAlerte').dialog("destroy");
        },
        draggable: false,
        resizable: false,
        modal: true
    });
}

/**
 *
 */
function closeDialogue(){
    document.getElementById('bcAlerte').innerHTML = "";
    $('#bcAlerte').dialog("destroy");
}

function addslashes(ch) {
    ch = ch.replace(/\\/g, "\\\\")
    ch = ch.replace(/\'/g, "\\'")
    ch = ch.replace(/\"/g, "\\\"")
    return ch
}