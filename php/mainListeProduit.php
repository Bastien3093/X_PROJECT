<?php
/**
 * Date: 08/01/2017
 */
require_once("../co/connexionBD.php");

$caId = $_POST['caId'];
$raId = $_POST['raId'];

try {
    //Liste catégories adjacentes (TITRE)
    $resultats = $connexion->prepare("SELECT DISTINCT caLibelle, caId FROM categorie WHERE raId='" . $raId . "'");
    $resultats->setFetchMode(PDO::FETCH_OBJ);

	if($resultats->execute()){
		echo '<div id="listeCategorie">';
		while ($ligne = $resultats->fetch()) {
			if ($ligne->caId == $caId) echo '<a href="#" id="active" onclick="requestCategorie(\'' . $ligne->caId . '\' ,\'' . $raId . '\')">' . $ligne->caLibelle . '</a>';
			else echo '<a href="#" onclick="requestCategorie(\'' . $ligne->caId . '\' ,\'' . $raId . '\')">' . $ligne->caLibelle . '</a>';
		}
		echo '</div><hr>';
		$resultats->closeCursor();
	}
    //______________________________________________________________________________________
    //LISTE PRODUITS

    $resultats = $connexion->prepare("SELECT * FROM produit WHERE caId='" . $caId . "'");
	$resultats->setFetchMode(PDO::FETCH_OBJ);

	if($resultats->execute()){
		if ($resultats->rowCount() == 0) {
			echo '<img id="travauxImg" src="images/travaux.png">';
		} else {
			while ($ligne = $resultats->fetch()) {
				echo'<div class="fiche ficheProduit">' .
						'<a href="#" onclick="requestProduit(' . $ligne->prId . ')">' .
							'<img class="imgFiche" src="' . $ligne->prImage . '">';
				//Coupure du libelle si la chaine dépasse les 35 caractères
				if(strlen($ligne->prLibelle) <= 25) echo '<h5>' . $ligne->prLibelle . '</h5>';
					else echo '<h5>' . substr($ligne->prLibelle, 0, 20) . '...</h5>';
				echo    '</a>' .
						'<p>' . $ligne->prPrixUnitaireHT . ' €</p>' .
						'<i>' . $ligne->prPortion . '<br>prix/kg : ' . $ligne->prPrixHT . ' €</i>';
				if ($ligne->prQuantiteStock == 0) echo '<span><img class="imgSpan" src="images/warning.png"><i>En rupture !</i></span>';
				else {
					if ($ligne->prQuantiteStock <= 5) echo '<span><img class="imgSpan" src="images/caution.png"><i>' . $ligne->prQuantiteStock . ' restants.</i></span>';
					echo '<div id="ajout">' .
							'<input type="button" value="-" onclick="moins(' . $ligne->prId . ')">' .
							'<input id="' . $ligne->prId . '" type="text" name="txtRechch" value="0" maxlength="2">' .
							'<input type="button" value="+" onclick="plus(' . $ligne->prId . ', ' . $ligne->prQuantiteStock . ')">' .
							'<input style="margin-left: 20px;" type="submit" value="Ajouter" onclick="ajouterPanier(\'' . $ligne->prId . '\');">' .
						'</div>' ;
				}
				echo '</div>';
			}
		}
		$resultats->closeCursor();
	}
}
catch (PDOException $e) {
    echo 'Erreur liste produit : ' . $e->getMessage();
}
?>