<?php
/**
 * Date: 10/01/2017
 */
require_once("../co/connexionBD.php");

$clId = '0';    //$clId = $_SESSION['clId'];
$requete = $_POST['requete'];

//MENU
if ($requete == 'ajouterPanier') {
    $prId = $_POST['prId'];
    $quantiteSaisie = $_POST['quantiteSaisie'];

    ajouterPanier($connexion, $prId, $quantiteSaisie, $clId);
}else if ($requete == 'afficherPanier') {
    afficherPanier($connexion, $clId);
}else if ($requete == 'supprimerPanier') {
    supprimerPanier($connexion, $clId);
}else if ($requete == 'validerPanier') {
    validerPanier($connexion, $clId);
}else if ($requete == 'supprimerProduitPanier') {
    $prId = $_POST['prId'];

    supprimerProduitPanier($connexion, $prId, $clId);
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
            $resultats = $connexion->prepare("SELECT prQuantiteStock FROM produit WHERE prId='" . $prId . "'");
			
		if($resultats->execute()){
            $prQuantiteStock = $resultats->fetch(); //Stockage de la quantite de produit présente dans le panier dans $count
            $prQuantiteStock = $prQuantiteStock['prQuantiteStock'];
            $resultats->closeCursor();

			if ($prQuantiteStock == 0){
				echo 'Produit indisponible !';
			}else {
				//Vérification de l'existance du produit dans le panier
					$resultats = $connexion->prepare("SELECT prQuantite FROM panier WHERE clId='" . $clId . "' AND prId='" . $prId . "'");
					
					if($resultats->execute()){
						$prQuantite = $resultats->fetch(); //Stockage de la quantite de produit présente dans le panier dans $count
						$prQuantite = $prQuantite['prQuantite'];
						$resultats->closeCursor();
					}

				//Si le produit n'est pas dans le panier du client, on l'ajoute
				if ($prQuantite == null) {
					if ($quantiteSaisie <= $prQuantiteStock) {
						$resultats = $connexion->prepare("INSERT INTO panier (prId, prQuantite, clId) VALUES ('" . $prId . "', '" . $quantiteSaisie . "', '" . $clId . "')");
						
						if($resultats->execute()){
							echo 'Article ajouté';
						}
					} else {
						echo 'Il ne reste que ' . $prQuantiteStock . ' en stock !';
					}

				//Si le produit est deja dans le panier du client, on met à jour la quantité
				} else {
					$newQuantite = $quantiteSaisie + $prQuantite;
					//Verification du dépassement de la limite de quantité commandable
					if ($newQuantite <= $prQuantiteStock) {
						if ($newQuantite < 100) {
							$resultats = $connexion->prepare("UPDATE panier SET prQuantite='" . $newQuantite . "' WHERE prId='" . $prId . "' AND clId='" . $clId . "'");
							
							if($resultats->execute()){
								echo 'Article rajouté';
							}
						} else {
							echo 'Vous ne pouvez pas ajouter plus 99 mêmes produits à votre panier !';
						}
					} else {
						if (($prQuantiteStock - $prQuantite) == 0) {
							echo 'Produit indisponibles, vous avez les derniers dans votre panier !';
						}else{
							echo 'Il ne reste que ' . $prQuantiteStock . ' article(s) en stock ! Vous ne pouvez rajouter que ' . ($prQuantiteStock - $prQuantite) . ' article(s).';
						}
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
        $prLibelle = array();
        $prPrixUnitaireHT = array();
        $prImage = array();

        $resultats = $connexion->prepare("SELECT * FROM panier, produit WHERE panier.prId = produit.prId AND clID = '" . $clId . "'");
        $resultats->setFetchMode(PDO::FETCH_OBJ);

		if($resultats->execute()){
			// prId - prQuantite - clId - prId - prLibelle - prPrixUnitaireHT - prPortion - prPrixHT - prImage - prDescription - prQuantiteStock - caId
			while ($ligne = $resultats->fetch()) {
				array_push($prId, $ligne->prId);
				array_push($prQuantite, $ligne->prQuantite);
				array_push($prLibelle, $ligne->prLibelle);
				array_push($prPrixUnitaireHT, $ligne->prPrixUnitaireHT);
				array_push($prImage, $ligne->prImage);
			}
			$resultats->closeCursor();


			echo json_encode(array($prId, $prQuantite, $prLibelle, $prPrixUnitaireHT, $prImage));
		}
    } catch (PDOException $e) {
        echo 'Erreur lors de l\'affichage du panier : ' . $e->getMessage();
    }
}

/**
 * Supprime un produit du panier
 * @param $connexion
 * @param $clId
 */
function supprimerProduitPanier($connexion, $prId, $clId){
    try{
        $resultats = $connexion->prepare("DELETE FROM panier WHERE clID = '" . $clId . "' AND prId = '" . $prId . "'");
		
		if($resultats->execute()){
			echo "Produit supprimé du panier.";
		}
    } catch (PDOException $e) {
        echo 'Erreur lors de la suppression panier : ' . $e->getMessage();
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
        $resultats = $connexion->prepare("DELETE FROM panier WHERE clID = '" . $clId . "'");
		
		if($resultats->execute()){
			echo "Panier supprimé.";
		}
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