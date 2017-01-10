<?php
/**
 * Date: 08/01/2017
 */
include ("connexionBD.php");
	
	$resultats = $connexion->query("SELECT * FROM categorie WHERE raId='".$_POST['raId']."'");
	$resultats->setFetchMode(PDO::FETCH_OBJ);

	echo' <h1>'.$_POST['raLibelle'].'</h1>';
	while( $ligne = $resultats->fetch()) {
		echo'<div class="fiche ficheCategorie">'.
				'<a href="#" onclick="requestCategorie(\''.$ligne->caId.'\', \''.$ligne->caLibelle.'\')">'.
					'<img src="'.$ligne->caImage.'">'.
					'<h5>'.$ligne->caLibelle.'</h5>'.
				'</a>'.
			'</div>';
	}
	$resultats->closeCursor();
?>
