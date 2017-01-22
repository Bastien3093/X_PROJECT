/**
 * Created on 09/01/2017.
 */
function plus(prId, prQuantiteStock){
    var val = parseInt(document.getElementById(prId).value) + 1;
    if(val <= prQuantiteStock) document.getElementById(prId).value = val;
}

function moins(prId){
    var val = parseInt(document.getElementById(prId).value) - 1;
    if(val >= 0) document.getElementById(prId).value = val;
}

function requestProduit(prId){
    $.ajax({
        url : 'php/infoProduit.php',
        type : 'POST',
        data : 'prId='+prId,
        dataType : 'html',
        success : function(reponse, statut){
            document.getElementById('bcProduit').innerHTML = reponse;
            $("#produit").dialog({
                draggable: true,
                width: 550,
                modal: true,
                resizable: true,
                show: "slow"
            });
            document.getElementById('bcProduit').innerHTML = ""
        },
        error : function(resultat, statut, erreur){
            erreurRequeteFile(statut, erreur, resultat);
        }
    });
}