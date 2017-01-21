<?php
/**
 * Date: 08/01/2017
 */
require_once("connexionBD.php");

try {
	$resultats = $connexion->query("SELECT * FROM categorie WHERE raId='".$_POST['raId']."'");
	$resultats->setFetchMode(PDO::FETCH_OBJ);

	echo' <h1>'.$_POST['raLibelle'].'</h1>';

	if ($resultats->rowCount() == 0) {
		echo '<img id="travauxImg" src="images/travaux.png">';
	} else {
        while ($ligne = $resultats->fetch()) {
            echo'<div class="fiche ficheCategorie">' .
					'<a href="#" onclick="requestCategorie(' . $ligne->caId . ', \'' . $ligne->caLibelle . '\')">' .
					'<img class="imgFiche" src="' . $ligne->caImage . '" >' .
					'<h5>' . $ligne->caLibelle . '</h5>' .
					'</a>' .
                '</div>';
        }
    }
	$resultats->closeCursor();
}
catch (PDOException $e) {
    echo 'Erreur liste categories : ' . $e->getMessage();
}
?>
