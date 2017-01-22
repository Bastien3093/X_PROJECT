<?php
/**
 * Date: 10/01/2017
 */
require_once("../co/connexionBD.php");
$clId = '0';    //$clId = $_SESSION['clId'];

//MENU
if ($_POST['requete'] == 'ajouterPanier') {
    $prId = $_POST['prId'];
    $quantiteSaisie = $_POST['quantiteSaisie'];
    ajouterPanier($connexion, $prId, $quantiteSaisie, $clId);
}else if ($_POST['requete'] == 'afficherPanier') {
    afficherPanier($connexion, $clId);
}else if ($_POST['requete'] == 'supprimerPanier') {
    supprimerPanier($connexion, $clId);
}else if ($_POST['requete'] == 'validerPanier') {
    validerPanier($connexion, $clId);
}

/**
 * Fonction d'ajout d'un produit au panier
 * lors du click sur "ajout" de la fiche produit
 * @param $connexion
 * @param $clId
 */
function ajouterPanier($connexion, $prId, $quantiteSaisie, $clId)
{
    try {
        //Récupération de la quantité disponible en stock
            $resultats = $connexion->query("SELECT prQuantiteStock FROM produit WHERE prId='" . $prId . "'");
            $prQuantiteStock = $resultats->fetch(); //Stockage de la quantite de produit présente dans le panier dans $count
            $prQuantiteStock = $prQuantiteStock['prQuantiteStock'];
            $resultats->closeCursor();

        if ($prQuantiteStock == 0){
            echo 'Produit indisponible !';
        }else {
            //Vérification de l'existance du produit dans le panier
                $resultats = $connexion->query("SELECT prQuantite FROM panier WHERE clId='" . $clId . "' AND prId='" . $prId . "'");
                $prQuantite = $resultats->fetch(); //Stockage de la quantite de produit présente dans le panier dans $count
                $prQuantite = $prQuantite['prQuantite'];
                $resultats->closeCursor();

            //Si le produit n'est pas dans le panier du client, on l'ajoute
            if ($prQuantite == null) {
                if ($quantiteSaisie <= $prQuantiteStock) {
                    $resultats = $connexion->query("INSERT INTO panier (prId, prQuantite, clId) VALUES ('" . $prId . "', '" . $quantiteSaisie . "', '" . $clId . "')");
                    echo 'Article ajouté';
                } else {
                    echo 'Il ne reste que ' . $prQuantiteStock . ' en stock !';
                }

            //Si le produit est deja dans le panier du client, on met à jour la quantité
            } else {
                $newQuantite = $quantiteSaisie + $prQuantite;
                //Verification du dépassement de la limite de quantité commandable
                if ($newQuantite <= $prQuantiteStock) {
                    if ($newQuantite < 100) {
                        $resultats = $connexion->query("UPDATE panier SET prQuantite='" . $newQuantite . "' WHERE prId='" . $prId . "' AND clId='" . $clId . "'");
                        echo 'Article rajouté';
                    } else {
                        echo 'Vous ne pouvez pas ajouter plus 99 mêmes produits à votre panier !';
                    }
                } else {
                    if (($prQuantiteStock - $prQuantite) == 0) {
                        echo 'Produit indisponibles, vous avez les derniers dans votre panier !';
                    }else{
                        echo 'Il ne reste que ' . $prQuantiteStock . ' articles en stock ! Vous ne pouvez rajouter que ' . ($prQuantiteStock - $prQuantite) . ' articles.';
                    }
                }
            }
        }
    } catch (PDOException $e) {
        echo 'Erreur lors de l\'ajout au panier : ' . $e->getMessage();
    }

// "UPDATE panier, produit SET prQuantite='" . $prQuantite . "', prQuantiteStock='" . $prQuantiteStock . "' WHERE panier.prId='" . $prId . "' AND produitprId='" . $prId . "' AND clId='" . $clId . "'"
}


/**
 * Requete des éléments permettant l'affichage du pannier
 * @param $connexion
 * @param $clId
 */
function afficherPanier($connexion, $clId)
{
    try {
        $prId = array();
        $prQuantite = array();

        $resultats = $connexion->query("SELECT prId, prQuantite FROM panier WHERE clID = '" . $clId . "'");
        $resultats->setFetchMode(PDO::FETCH_OBJ);

        while ($ligne = $resultats->fetch()) {
            array_push($prId, $ligne->prId);
            array_push($prQuantite, $ligne->prQuantite);
        }
        $resultats->closeCursor();

        echo json_encode(array($prId, $prQuantite));

    } catch (PDOException $e) {
        echo 'Erreur lors de l\'affichage du panier : ' . $e->getMessage();
    }
}

/**
* Suppression du pannier du client
* @param $connexion
* @param $clId
*/
function supprimerPanier($connexion, $clId)
{
    try{
        $resultats = $connexion->query("DELETE FROM panier WHERE clID = '" . $clId . "'");
        echo "Panier supprimé.";
    } catch (PDOException $e) {
        echo 'Erreur lors de la suppression panier : ' . $e->getMessage();
    }
}

/**
 * Validation du panier, // acces paiement.
 * @param $connexion
 * @param $clId
 */
function validerPanier($connexion, $clId) {

    echo "Panier validé.";

}

?>