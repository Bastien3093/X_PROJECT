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
                var res =   '<input type="button" value="Vider le Panier" onclick="supprimerPanier();">'+
                            '<input type="button" value="Valider le Panier" onclick="validerPanier();">';
                for (var i = 0; i < reponse[0].length; i++) {
                    res += '<p>prId = ' + reponse[0][i] + '<i> Quantite = ' + reponse[1][i] + '</i></p>';
                }
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
    document.getElementById(prId).value = '0';
}
function dialogue(prId, data){
    $("#produit"+prId).dialog("close");
    alert(data);
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