/**
 * Created on 10/01/2017.
 */

/**
 *
 */
function afficherPanierVide() {

    var res =   '<p>Votre panier est vide !</p>'+
        '<input type="button" value="Retour à l\'accueil" onclick="document.location.href=\'index.html\'">';

    document.getElementById('bcMain').innerHTML = res;

}

/**
 *
 */
function afficherPanier(){
    //Fermeture de toutes les boites de dialogues
    $(".ui-dialog-content").dialog("close");

    $.ajax({
        url : 'php/panier.php',
        type : 'POST',
        data : 'requete=afficherPanier',
        dataType : 'json',
        success : function(reponse, statut){
            //SI le tableau reponse est vide
            if(reponse == ',') {
                afficherPanierVide();
            }else {
                var res = '<table id="tbPanier">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th>prID</th>' +
                                    '<th></th>' +
                                    '<th>Libelle</th>' +
                                    '<th>PrixU</th>' +
                                    '<th>Quantite</th>' +
                                    '<th>Total</th>' +
                                '</tr>' +
                            '</thead>';
                for (var i = 0; i < reponse[0].length; i++) {
                    //$prId, $prQuantite, $prLibelle, $prPrixUnitaireHT, $prImage, $prDescription, $prQuantiteStock
                    res+='<tr>' +
                            '<td>' + reponse[0][i] + '</td>' +
                            '<td><img src="' + reponse[4][i] + '"></td>' +
                            '<td>' + reponse[2][i] + '</td>' +
                            '<td>' + reponse[3][i] + '</td>' +
                            '<td>' + reponse[1][i] + '</td>' +
                            '<td>' + (reponse[3][i]*reponse[1][i]) + '</td>' +
                        '</tr>';
                }
                res += '</table>' +
                        '<input type="button" value="Vider le Panier" onclick="supprimerPanier();">'+
                        '<input type="button" value="Valider le Panier" onclick="validerPanier();">';

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
            success : function(reponse, statut){
                dialogue(prId, reponse);
            },
            error : function(resultat, statut, erreur){
                erreurRequeteFile(statut, erreur, resultat);
            }
        });
    }
    if(source) document.getElementById("pr"+prId).value = '0';
    else document.getElementById(prId).value = '0';
}
/**
 *
 */
function supprimerPanier(){
    $.ajax({
        url : 'php/panier.php',
        type : 'POST',
        data : 'requete=supprimerPanier',
        dataType : 'html',
        success : function(reponse, statut){
            afficherPanierVide();
        },
        error : function(resultat, statut, erreur){
            erreurRequeteFile(statut, erreur, resultat);
        }
    });
}

/**
 *
 */
function validerPanier(){
    $.ajax({
        url : 'php/panier.php',
        type : 'POST',
        data : 'requete=validerPanier',
        dataType : 'html',
        success : function(reponse, statut){
            alert(reponse);
            // document.location.href="index.html"
        },
        error : function(resultat, statut, erreur){
            erreurRequeteFile(statut, erreur, resultat);
        }
    });
}