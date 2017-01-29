/**
 * Created on 25/01/2017.
 */

/**
 *
 */
function afficherListes(){
    pageCourante = 'listeCourses';
    //Fermeture de toutes les boites de dialogues
    $(".ui-dialog-content").dialog("close");

    var res = '<h1>Mes listes de courses</h1>' +
                '<hr>' +
                    '<div id="tbListeCourses">';

    $.ajax({
        url : 'php/listeCourses.php',
        type : 'POST',
        data : 'requete=afficherListes',
        dataType : 'json',
        success : function(reponse){
            //tableau reponse contient les libelles de chaque liste de courses
            if(reponse.length == 0) res += '<p>Vous n\'avez aucune liste d\'enregistrée !</p>';
            else {
                res += '<table>';
                for (var i = 0; i < reponse.length; i++) {
                    res += '<tr>' +
                                '<td><input type="button" value="' + reponse[i] + '" onclick="afficherListeCourses(\'' + addslashes(reponse[i]) + '\')"></td>' +
                                '<td><a href="#" onclick="confirmerSuppressionListeCourses(\'' + addslashes(reponse[i]) + '\')"><img src="images/delete.png"></a></td>' +
                            '</tr>';
                }
                res += '<table>';
            }
            res += '<hr>' +
                    '<input type="button" value="Retour à l\'accueil" onclick="document.location.href=\'index.html\'">' +
                '</div>';
            document.getElementById('bcMain').innerHTML = res;
        },
        error : function(resultat, statut, erreur){
            erreurRequeteFile(statut, erreur, resultat);
        }
    });
}

/**
 *
 */
function verificationEnregistrementListesCourses(){
    var coLibelle = document.getElementById("coLibelle").value;
    coLibelle = addslashes(coLibelle);
    closeDialogue();

    $.ajax({
        url : 'php/listeCourses.php',
        type : 'POST',
        data : 'requete=afficherListes',
        dataType : 'json',
        success : function(reponse){
            var nbListes = reponse.length;
            var exist = false;
            for(var i = 0; i < nbListes; i++){
                if(reponse[i] == coLibelle) exist = true;
            }
            //Définit le nombre MAXIMUM de listes par user
            if (nbListes >= 4) {
                alerteSimple("trop de listes", "afficherListes();");
            } else if(exist) {
                alerteSimple("nom de liste déjà utilisé", "confirmerEnregistrementPanier();");
            } else {
                enregistrerPanier(coLibelle);
            }
        },
        error : function(resultat, statut, erreur){
            erreurRequeteFile(statut, erreur, resultat);
        }
    });
}

/**
 *
 * @param coLibelle
 */
function afficherListeCourses(coLibelle){
    $.ajax({
        url : 'php/listeCourses.php',
        type : 'POST',
        data : 'requete=afficherListeCourses&coLibelle=' + addslashes(coLibelle),
        dataType : 'json',
        success : function(reponse){
            //SI le tableau reponse est vide
            var total = 0.0;
            var res = '<h1>' + coLibelle + '</h1>' +
                        '<hr>' +
                    '<div  id="tbPanier">' +
                        '<table>' +
                            '<thead>' +
                                '<tr>' +
                                    '<th></th>' +
                                    '<th>Libelle</th>' +
                                    '<th>Prix Unitaire</th>' +
                                    '<th>Quantite</th>' +
                                    '<th>Sous-total</th>' +
                                '</tr>' +
                            '</thead>';
            for (var i = 0; i < reponse[0].length; i++) {
                var sousTotal = (reponse[3][i]*reponse[1][i]).toFixed(2);
                total += Number(sousTotal);
                //$prId, $prQuantite, $prLibelle, $prPrixUnitaireHT, $prImage
                res+='<tr>' +
                        '<td><a href="#" onclick="requestProduit(' + reponse[0][i] + ')"><img src="' + reponse[4][i] + '"></a></td>';
                //Coupure du libelle si la chaine dépasse les 20 caractères
                if(reponse[2][i].length <= 20) res+= '<td>' + reponse[2][i] + '</td>';
                else res+= '<td>' + reponse[2][i] + '...</td>';
                    res += '<td>' + reponse[3][i].substr(0, 35) + ' €</td>' +
                            '<td>' + reponse[1][i] + '</td>' +
                            '<td>' + sousTotal + ' €</td>' +
                    '</tr>';
            }
            //garde 2 chiffres après la virgule
            total = (total).toFixed(2);
            res += '</table>' +
                    '<div id="total">Total : ' + total + ' €</div>' +
                    '<hr>' +
                    '<input type="button" value="Supprimer la liste" onclick="confirmerSuppressionListeCourses(\'' + coLibelle + '\');" style="float: left; box-shadow: 0px 0px 7px 5px #D44D4A;">' +
                    '<input type="button" value="En faire mon panier" onclick="confirmerRemplacerPanier(\'' + coLibelle + '\');">' +
                '</div>';

            document.getElementById('bcMain').innerHTML = res;
        },
        error : function(resultat, statut, erreur){
            erreurRequeteFile(statut, erreur, resultat);
        }
    });

}

/**
 *
 * @param coLibelle
 */
function confirmerSuppressionListeCourses(coLibelle) {
    alerte("Etes vous sûr de vouloir supprimer la liste \"" + coLibelle + "\" ?!",
            "supprimerListeCourses('" + addslashes(coLibelle) + "');");
}

/**
 *
 * @param coLibelle
 */
function supprimerListeCourses(coLibelle){
    $('#bcAlerte').dialog("destroy");
    coLibelle = addslashes(coLibelle);

    $.ajax({
        url : 'php/listeCourses.php',
        type : 'POST',
        data : 'requete=supprimerListe&coLibelle='+coLibelle,
        dataType : 'html',
        success : function(reponse){
            alerteSimple(reponse, "afficherListes();");
        },
        error : function(resultat, statut, erreur){
            erreurRequeteFile(statut, erreur, resultat);
        }
    });
}

function confirmerRemplacerPanier(coLibelle){
    alerte("Etes vous sûr de vouloir remplacer votre panier par cette liste ?!",
            "remplacerPanier('" + coLibelle + "');");
}

/**
 *
 * @param coLibelle
 */
function remplacerPanier(coLibelle){
    $.ajax({
        url : 'php/listeCourses.php',
        type : 'POST',
        data : 'requete=remplacerPanier&coLibelle=' + coLibelle,
        dataType : 'html',
        success : function(reponse){
            alerteSimple(reponse, "afficherPanier();");
        },
        error : function(resultat, statut, erreur){
            erreurRequeteFile(statut, erreur, resultat);
        }
    });
}