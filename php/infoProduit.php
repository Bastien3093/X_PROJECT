<?php
/**
 * Date: 08/01/2017
 */
require_once("../co/connexionBD.php");

$prId = $_POST['prId'];

try {
    $resultats = $connexion->prepare("SELECT * FROM produit WHERE prId='" . $prId . "'");
    $resultats->setFetchMode(PDO::FETCH_OBJ);
	
    if($resultats->execute()){

		$ligne = $resultats->fetch();
		echo'<div class="ficheProduit produit" id="produit' . $prId . '" title="' . htmlentities($ligne->prLibelle) . '">' .
				'<img id="prImage" src="' . $ligne->prImage . '">' .
				'<em>' . $ligne->prDescription . '</em>' .
				'<hr>' .
				'<p>' . $ligne->prPrixUnitaireHT . ' €</p>' .
				'<i>' . $ligne->prPortion . '<br>prix/kg : ' . $ligne->prPrixHT . ' €</i>';

		if ($ligne->prQuantiteStock == 0) echo '<span><img class="imgSpan" src="images/warning.png"><i>En rupture !</i></span>';
		else if ($ligne->prQuantiteStock <= 5) echo '<span><img class="imgSpan" src="images/caution.png"><i>' . $ligne->prQuantiteStock . ' restants.</i></span>';

		if ($ligne->prQuantiteStock == 0) echo '<div id="ajout" style="visibility: hidden;">';
		else echo '<div id="ajout" style="clear: both;">';
			echo    '<input type="button" value="-" onclick="moins(' . $ligne->prId . ', \'true\')">' .
					'<input id="pr' . $ligne->prId . '" type="text" name="txtRechch" value="0" maxlength="2">' .
					'<input type="button" value="+" onclick="plus(' . $ligne->prId . ', ' . $ligne->prQuantiteStock . ', \'true\')">' .
					'<input style="margin-left: 20px;" type="submit" value="Ajouter" onclick="ajouterPanier(\'' . $ligne->prId . '\', \'true\');">' .
				'</div>' .
			'</div>';
		$resultats->closeCursor();
	}
}
catch (PDOException $e) {
    echo 'Erreur produit : ' . $e->getMessage();
}
?>