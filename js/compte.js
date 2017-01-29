/**
 * Created on 22/01/2017.
 */

/**
 *
 */
function afficherCompte() {
    pageCourante = 'compte';
    //Fermeture de toutes les boites de dialogues
    $(".ui-dialog-content").dialog("close");


    document.getElementById('bcMain').innerHTML = "<p>MON COMPTE</p>";

    alert(pageCourante);

}