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
