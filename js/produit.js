/**
 * Created on 09/01/2017.
 */
/**
 *
 * @param prId
 * @param prQuantiteStock
 * @param source
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

/**
 *
 * @param prId
 * @param source
 */
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

/**
 * Affichage des infos produit dans une boite de dialogue
 * @param prId
 */
function requestProduit(prId){
    //Si la boite de dialogue a déjà été créée, on la réouvre
    if ($("#produit"+prId).size()) {
        $("#produit"+prId).dialog("open");
    }else {
        $.ajax({
            url: 'php/infoProduit.php',
            type: 'POST',
            data: 'prId=' + prId,
            dataType: 'html',
            success: function (reponse, statut) {
                document.getElementById('bcProduit').innerHTML = reponse;
                $("#produit" + prId).dialog({
                    open: function() { document.getElementById(prId).value = '0' },
                    close: function() { document.getElementById("pr"+prId).value = '0' },
                    draggable: true,
                    width: 550,
                    resizable: true,
                    show: { effect: "blind" },
                    hide: { effect: "slide" },
                    closeText: "Fermer"
                });
            },
            error: function (resultat, statut, erreur) {
                erreurRequeteFile(statut, erreur, resultat);
            }
        });
    }
}

/**
 * fermeture de la boite de dialogue infos produit
 * ouverture de l'alerte affichant la réponse de la requete
 * effectué lors de l'ajout au panier
 * @param prId
 * @param data
 */
function dialogueAjoutPanier(prId, data){
    $("#produit"+prId).dialog("close");

    data = '<div id="alerte">' +
                '<p>' + data + '</p>';

    if (pageCourante == 'panier') data += '<input type="button" value="OK" onclick="closeDialogue();">';
    else data +='<input type="button" value="Afficher le Panier" onclick="afficherPanier();">' +
                '<input type="button" value="Continuer ses achats" onclick="closeDialogue();">';

    data += '</div>';

    document.getElementById('bcAlerte').innerHTML = data;
    $("#bcAlerte").dialog({
        //open: function(event, ui) { $(".ui-dialog-titlebar", ui.dialog | ui).hide(); }, //problème -> cache TOUTES les barres et bouttons close
        close: function() {
            document.getElementById('bcAlerte').innerHTML = "";
            $('#bcAlerte').dialog("destroy");
        },
        draggable: false,
        resizable: false,
        modal: true
    });
}

