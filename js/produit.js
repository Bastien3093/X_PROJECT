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
    alert(prId);
}