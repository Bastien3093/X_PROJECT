/**
 * Created on 10/01/2017.
 */

/**
 * AFFICHAGE DU PANIER VIDE
 */
function afficherPanierVide() {
    //Fermeture de toutes les boites de dialogues
    $(".ui-dialog-content").dialog("close");

    var res='<div id="panierVide">' +
                '<h1>Votre panier est vide !</h1>' +
                '<hr>' +
                '<input type="button" value="Retour à l\'accueil" onclick="document.location.href=\'index.html\'">' +
            '</div>';

    document.getElementById('bcMain').innerHTML = res;

}

/**
 * AFFICHAGE DU PANIER
 */
function afficherPanier(){
    pageCourante = 'panier';
    //Fermeture de toutes les boites de dialogues
    $(".ui-dialog-content").dialog("close");

    $.ajax({
        url : 'php/panier.php',
        type : 'POST',
        data : 'requete=afficherPanier',
        dataType : 'json',
        success : function(reponse){
            //SI le tableau reponse est vide
            if(reponse[0] == '') {
                afficherPanierVide();
            }else {
                var total = 0.0;
                var res = '<h1>Votre panier</h1>' +
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
                                    '<th></th>' +
                                '</tr>' +
                            '</thead>';
                for (var i = 0; i < reponse[0].length; i++) {
                    var sousTotal = (reponse[3][i]*reponse[1][i]).toFixed(2);
                    total += Number(sousTotal);
                    //$prId, $prQuantite, $prLibelle, $prPrixUnitaireHT, $prImage
                    res+='<tr>' +
                            '<td><a href="#" onclick="requestProduit(' + reponse[0][i] + ')"><img src="' + reponse[4][i] + '"></a></td>';
                    //Coupure du libelle si la chaine dépasse les 35 caractères
                    if(reponse[2][i].length <= 30) res+= '<td>' + reponse[2][i] + '</td>';
                    else res+= '<td>' + reponse[2][i].substr(0, 30) + '...</td>';
                        res+='<td>' + reponse[3][i] + ' €</td>' +
                            '<td>' + reponse[1][i] + '</td>' +
                            '<td>' + sousTotal + ' €</td>' +
                            '<td><a href="#" onclick="confimerSuppressionProduit(' + reponse[0][i] + ')"><img src="images/delete.png"></a></td>' +
                        '</tr>';
                }
                //garde 2 chiffres après la virgule
                total = (total).toFixed(2);
                res += '</table>' +
                            '<div id="total">Total : ' + total + ' €</div>' +
                        '<hr>' +
                        '<input type="button" value="Vider le Panier" onclick="confimerSuppressionPanier();" style="float: left; box-shadow: 0px 0px 7px 5px #D44D4A;">' +
                        '<input id="valBtn" type="button" value="Valider le Panier" onclick="validerPanier(\'' + total + '\');">' +
                        '<input type="button" value="Enregistrer la liste" onclick="confirmerEnregistrementPanier();">' +
                    '</div>';

                document.getElementById('bcMain').innerHTML = res;
            }
        },
        error : function(resultat, statut, erreur){
            erreurRequeteFile(statut, erreur, resultat);
        }
    });

}

/**
 *
 * @param prId
 * @param source : true si le click viens de la piche produit.
 */
function ajouterPanier(prId, source){

    var quantiteSaisie;
    if(source) quantiteSaisie = document.getElementById("pr"+prId).value;
    else quantiteSaisie = document.getElementById(prId).value;

    if(quantiteSaisie != '0'){
        $.ajax({
            url : 'php/panier.php',
            type : 'POST',
            data : 'prId='+prId+'&quantiteSaisie='+quantiteSaisie+'&requete=ajouterPanier',
            dataType : 'html',
            success : function(reponse){
                dialogueAjoutPanier(prId, reponse);
            },
            error : function(resultat, statut, erreur){
                erreurRequeteFile(statut, erreur, resultat);
            }
        });
    }
    if(source) document.getElementById("pr"+prId).value = '0';
    else document.getElementById(prId).value = '0';

    //actualisation du panier s'il est ouvert.
    if(pageCourante == 'panier') afficherPanier();
}
/**
 * Confimation de la suppresion d'un prduit du panier
 */
function confimerSuppressionProduit(prId) {
    var message = 'Etes vous sûr de vouloir retirer ce produit de votre panier ?!';
    var bouton = 'supprimerProduitPanier(\'' + prId + '\');';
    alerte(message, bouton);
}
/**
 *
 * @param prId
 */
function supprimerProduitPanier(prId){
    $.ajax({
        url : 'php/panier.php',
        type : 'POST',
        data : 'prId='+prId+'&requete=supprimerProduitPanier',
        dataType : 'html',
        success : function(reponse){
            alerteSimple(reponse, "afficherPanier();");
        },
        error : function(resultat, statut, erreur){
            erreurRequeteFile(statut, erreur, resultat);
        }
    });
}

/**
 * Confimation de la suppresion totale du panier
 */
function confimerSuppressionPanier() {
    var message = 'Etes vous sûr de vouloir vider le panier ?!';
    var bouton = 'supprimerPanier();';
    alerte(message, bouton);
}

/**
 *
 */
function supprimerPanier(){
    $('#bcAlerte').dialog("destroy");

    $.ajax({
        url : 'php/panier.php',
        type : 'POST',
        data : 'requete=supprimerPanier',
        dataType : 'html',
        success : function(reponse){
            alerteSimple(reponse, "afficherPanierVide();");
        },
        error : function(resultat, statut, erreur){
            erreurRequeteFile(statut, erreur, resultat);
        }
    });
}

/**
 *
 */
function confirmerEnregistrementPanier(){
    var message = 'Saisir nom de la liste : ';
    var bouton = 'verificationEnregistrementListesCourses();';
    var autre = '<input id="coLibelle" type="text" size="30" maxlength="50" value="Ma liste de courses">';
    alerte(message, bouton, autre);
}

/**
 *
 * @param coLibelle
 */
function enregistrerPanier(coLibelle) {
    $.ajax({
        url: 'php/listeCourses.php',
        type: 'POST',
        data: 'coLibelle=' + coLibelle + '&requete=enregistrerListe',
        dataType: 'html',
        success: function (reponse) {
            alerteSimple(reponse);
        },
        error: function (resultat, statut, erreur) {
            erreurRequeteFile(statut, erreur, resultat);
        }
    });
}

/**
 *
 */
function validerPanier(total){
    $.ajax({
        url : 'php/panier.php',
        type : 'POST',
        data : 'requete=validerPanier',
        dataType : 'html',
        success : function(reponse){
            alert(reponse + " -> " + total);
        },
        error : function(resultat, statut, erreur){
            erreurRequeteFile(statut, erreur, resultat);
        }
    });
}