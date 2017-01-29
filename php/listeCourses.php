<?php
/**
 * Date: 25/01/2017
 */
require_once("../co/connexionBD.php");

$clId = '0';    //$clId = $_SESSION['clId'];
$requete = $_POST['requete'];

//MENU
if ($requete == 'afficherListes') {
    afficherListes($connexion, $clId);
} else {
    $coLibelle = $_POST['coLibelle'];

    if ($requete == 'enregistrerListe') {
        enregistrerListe($connexion, $coLibelle, $clId);
    }else if ($requete == 'afficherListeCourses') {
        afficherListeCourses($connexion, $clId, $coLibelle);
    }else if ($requete == 'supprimerListe') {
        supprimerListe($connexion, $coLibelle, $clId);
    }else if ($requete == 'remplacerPanier') {
        remplacerPanier($connexion, $clId, $coLibelle);
    }
}

/**
 * Requete des éléments permettant l'affichage du pannier
 * @param $connexion
 * @param $clId
 */
function afficherListeCourses($connexion, $clId, $coLibelle) {
    try {
        $prId = array();
        $prQuantite = array();
        $prLibelle = array();
        $prPrixUnitaireHT = array();
        $prImage = array();

        $resultats = $connexion->prepare("SELECT * FROM courses, produit WHERE courses.prId = produit.prId AND clID = '" . $clId . "' AND coLibelle = '" . $coLibelle . "'");
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
 * @param $connexion
 * @param $coLibelle
 * @param $clId
 */
function enregistrerListe($connexion, $coLibelle, $clId)
{
    try {
        $resultats = $connexion->prepare("SELECT * FROM panier WHERE clId='" . $clId . "'");
        $resultats->setFetchMode(PDO::FETCH_OBJ);

    if($resultats->execute()){
        $requete = "INSERT INTO courses (clId, coLibelle, prId, prQuantite) VALUES ";
        $i = 0;
        while ($ligne = $resultats->fetch()) {
            $i++;
            $requete .= "('" . $clId . "', '" . $coLibelle . "', '" . $ligne->prId . "', '" . $ligne->prQuantite . "')";
            if ($i < $resultats->rowCount()) $requete .= ", ";
        }
        $resultats->closeCursor();

        $resultats = $connexion->prepare($requete);
		if($resultats->execute()){
			echo "Liste enregistrée.";
		}
	}
    } catch (PDOException $e) {
        echo 'Erreur liste : ' . $e->getMessage();
    }
}

/**
 * @param $connexion
 * @param $clId
 */
function afficherListes($connexion, $clId){
    $tab = array();
    try {
        $resultats = $connexion->prepare("SELECT DISTINCT coLibelle FROM courses WHERE clId='" . $clId . "' ORDER BY coLibelle");
        $resultats->setFetchMode(PDO::FETCH_OBJ);

		if($resultats->execute()){
			while($ligne = $resultats->fetch()) array_push($tab, $ligne->coLibelle);
			echo json_encode($tab);

			$resultats->closeCursor();
		}
    } catch (PDOException $e) {
        echo 'Erreur liste : ' . $e->getMessage();
    }
}

/**
 * @param $connexion
 * @param $coLibelle
 * @param $clId
 */
function supprimerListe($connexion, $coLibelle, $clId){
    try {
        $resultats = $connexion->prepare("DELETE FROM courses WHERE clId='" . $clId . "' AND coLibelle='" . $coLibelle . "'");
		if($resultats->execute()){
			echo "Liste supprimée.";
		}
    } catch (PDOException $e) {
        echo 'Erreur liste : ' . $e->getMessage();
    }
}


function remplacerPanier($connexion, $clId, $coLibelle) {
    try {
        //suppression du panier
        $resultats = $connexion->prepare("DELETE FROM panier WHERE clID = '" . $clId . "'");
		if($resultats->execute()){
            //ajout des produits de la liste
			$resultats = $connexion->prepare("INSERT INTO `panier` (prId, prQuantite, clId) 
                                                SELECT prId, prQuantite, clId FROM courses 
                                                WHERE clId='" . $clId . "'
                                                AND coLibelle='" . $coLibelle . "';");

			
			if($resultats->execute()){
				echo 'Panier remplacé par la liste "' . $coLibelle . '"';
			}
		}
    } catch (PDOException $e) {
        echo 'Erreur lors de la suppression panier : ' . $e->getMessage();
    }
}

?>
