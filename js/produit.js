/**
 * Created on 09/01/2017.
 */
function plus(prId, prQuantiteStock, source){
    var val;
    if(source) {
        val = parseInt(document.getElementById('pr'+prId).value) + 1;
        if(val <= prQuantiteStock) document.getElementById('pr'+prId).value = val;
    } else {
        val = parseInt(document.getElementById(prId).value) + 1;
        if(val <= prQuantiteStock) document.getElementById(prId).value = val;
    }
}

function moins(prId, source){
    var val;
    if(source) {
        val = parseInt(document.getElementById('pr'+prId).value) - 1;
        if(val >= 0) document.getElementById('pr'+prId).value = val;
    } else {
        val = parseInt(document.getElementById(prId).value) - 1;
        if(val >= 0) document.getElementById(prId).value = val;
    }
}


function requestProduit(prId){
    $.ajax({
        url : 'php/infoProduit.php',
        type : 'POST',
        data : 'prId='+prId,
        dataType : 'html',
        success : function(reponse, statut){
            document.getElementById('bcProduit').innerHTML = reponse;
            $("#produit"+prId).dialog({
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