/**
 * Created on 10/01/2017.
 */

function afficherPanier(){
    $.ajax({
        url : 'php/panier.php',
        type : 'POST',
        data : 'requete=afficherPanier',
        dataType : 'json',
        success : function(reponse, statut){
            var res = '<input type="button" value="Vider le Panier" onclick="supprimerPanier();">';
            for(var i=0; i<reponse[0].length; i++){
                res += '<p>prId = '+reponse[0][i]+'<i> Quantite = '+reponse[1][i]+'</i></p>';
            }
            document.getElementById('bcMain').innerHTML = res;
        },
        error : function(resultat, statut, erreur){
            alert("error "+status+" err "+erreur+" res "+resultat);
        }
    });

}

function supprimerPanier(){
    $.ajax({
        url : 'php/panier.php',
        type : 'POST',
        data : 'requete=supprimerPanier',
        dataType : 'html',
        success : function(reponse, statut){
            alert('Panier supprimé');
            document.location.href="index.html"
        },
        error : function(resultat, statut, erreur){
            alert("error "+status+" err "+erreur+" res "+resultat);
        }
    });
}