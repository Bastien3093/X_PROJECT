/**
 * Created on 09/01/2017.
 */
function plus(prId){
    var val = parseInt(document.getElementById(prId).value) + 1;
    if(val <= 99) document.getElementById(prId).value = val;
}

function moins(prId){
    var val = parseInt(document.getElementById(prId).value) - 1;
    if(val >= 0) document.getElementById(prId).value = val;
}

function ajoutPanier(prId){
    var prQuantite = document.getElementById(prId).value;
    if(prQuantite != '0'){
        $.ajax({
            url : 'php/panier.php',
            type : 'POST',
            data : 'prId='+prId+'&prQuantite='+prQuantite+'&requete=ajoutPanier',
            dataType : 'html',
            success : function(reponse, statut){
                alert(reponse);
            },
            error : function(resultat, statut, erreur){
                alert("error "+status+" err "+erreur+" res "+resultat);
            }
        });
    }
    document.getElementById(prId).value = '0';
}