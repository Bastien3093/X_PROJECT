<?php
/**
 * Date: 10/01/2017
 */
include ("connexionBD.php");
$clId = '0';    //$clId = $_SESSION['clId'];

//MENU
if ($_POST['requete'] == 'ajoutPanier') {
    $prId = $_POST['prId'];
    $prQuantite = $_POST['prQuantite'];
    ajoutPanier($connexion, $prId, $prQuantite, $clId);
}else if ($_POST['requete'] == 'afficherPanier') {
    afficherPanier($connexion, $clId);
}else if ($_POST['requete'] == 'supprimerPanier') {
    supprimerPanier($connexion, $clId);
}

/**
 * Fonction d'ajout d'un produit au panier
 * lors du click sur "ajout" de la fiche produit
 * @param $connexion
 * @param $clId
 */
function ajoutPanier($connexion, $prId, $prQuantite, $clId)
{
    try {
        //Vérification de l'existance du produit à ajouter dans le panier
        $resultats = $connexion->query("SELECT prQuantite FROM panier WHERE clId='" . $clId . "' AND prId='" . $prId . "'");
        $count = $resultats->fetch(); //Stockage de la quantite de produit présente dans le panier dans $count
        $resultats->closeCursor();

        if ($count['prQuantite'] == null) {
            //Si le produit n'est pas dans le panier du client, on l'ajoute
            $resultats = $connexion->query("INSERT INTO panier (prId, prQuantite, clId) VALUES ('" . $prId . "', '" . $prQuantite . "', '" . $clId . "')");
            echo 'Article ajouté';
        } else {
            //Si le produit est deja dans le panier du client, on met à jour la quantité
            $prQuantite += $count['prQuantite'];
            //Verification du dépassement de la limite de quantité commandable
            if ($prQuantite < 100) {
                $resultats = $connexion->query("UPDATE panier SET prQuantite='" . $prQuantite . "' WHERE prId='" . $prId . "' AND clId='" . $clId . "'");
                echo 'Article rajouté';
            }else{
                echo 'Vous ne pouvez pas ajouter plus 99 produit à votre panier !';
            }
        }
    } catch (PDOException $e) {
        echo 'Erreur lors de l\'ajout au panier : ' . $e->getMessage();
    }

// SELECT (CASE
//      WHEN (SELECT COUNT(prId) FROM panier WHERE clId='0' AND prId='6')=0
//          THEN (INSERT INTO panier (prId, prQuantite, clId) VALUES ('15','15','15'))
//      ELSE (UPDATE panier SET prQuantite='9' WHERE prId='3' AND clId='0' )
// END)

}


/**
 * Requete des éléments permettant l'affichage du pannier
 * @param $connexion
 * @param $clId
 */
function afficherPanier($connexion, $clId)
{
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
}

/**
* Suppression du pannier du client
* @param $connexion
* @param $clId
*/
function supprimerPanier($connexion, $clId)
{
    $resultats = $connexion->query("DELETE FROM panier WHERE clID = '" . $clId . "'");
}

?>