<?php
/**
 * Date: 08/01/2017
 */
include ("connexionBD.php");
	
	$resultats = $connexion->query("SELECT * FROM produit WHERE caId='".$_POST['caId']."'");
	$resultats->setFetchMode(PDO::FETCH_OBJ);

	echo' <h1>'.$_POST['caLibelle'].'</h1>';
	while( $ligne = $resultats->fetch()) {
		echo'<div class="fiche ficheProduit">'.
				'<a href="#">'.
					'<img src="'.$ligne->prImage.'">'.
					'<h5>'.$ligne->prLibelle.'</h5>'.
				'</a>'.
				'<p>'.$ligne->prPrixUnitaireHT.' €</p>'.
				'<i>'.$ligne->prPortion.'<br>prix/kg : '.$ligne->prPrixHT.' €</i>'.
				'<div id="ajout">'.
					'<input type="button" value="-" onclick="moins(\''.$ligne->prId.'\')">'.
					'<input id="'.$ligne->prId.'" type="text" name="txtRechch" value="0" maxlength="2">'.
					'<input type="button" value="+" onclick="plus(\''.$ligne->prId.'\')">'.
					'<input style="margin-left: 20px;" type="submit" value="Ajouter" onclick="ajouterPanier(\''.$ligne->prId.'\');">'.
				'</div>'.
			'</div>';
	}
	$resultats->closeCursor();
?>

