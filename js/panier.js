/**
 * Created on 10/01/2017.
 */

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
            var res = '<input type="button" value="Vider le Panier" onclick="supprimerPanier();">'
                    + '<input type="button" value="Valider le Panier" onclick="validerPanier();">';
            for(var i=0; i<reponse[0].length; i++){
                res += '<p>prId = '+reponse[0][i]+'<i> Quantite = '+reponse[1][i]+'</i></p>';
            }
            document.getElementById('bcMain').innerHTML = res;
        },
        error : function(resultat, statut, erreur){
            fileError = fileSystem.OpenTextFile("erreur_ajax_panier.txt", 2 ,true);
            fileError.WriteLine("error "+status+" err "+erreur+" res "+resultat);
            fileError.Close();
        }
    });

}

/**
 *
 * @param prId
 */
function ajouterPanier(prId){
    var quantiteSaisie = document.getElementById(prId).value;
    if(quantiteSaisie != '0'){
        $.ajax({
            url : 'php/panier.php',
            type : 'POST',
            data : 'prId='+prId+'&quantiteSaisie='+quantiteSaisie+'&requete=ajouterPanier',
            dataType : 'html',
            success : function(reponse, statut){
                alert(reponse);
            },
            error : function(resultat, statut, erreur){
                erreurRequeteFile(statut, erreur, resultat);
            }
        });
    }
    document.getElementById(prId).value = '0';
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
            alert('Panier supprimé');
            document.location.href="index.html"
        },
        error : function(resultat, statut, erreur){
            erreurRequeteFile(statut, erreur, resultat);
        }
    });
}