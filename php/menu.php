<?php
/**
 * Date: 08/01/2017
 */
require_once("connexionBD.php");

//construction tableau RAYON
	$resultats = $connexion->query("SELECT * FROM rayon");
	$resultats->setFetchMode(PDO::FETCH_OBJ);
	
	//init array
	$raId = array(); $raLib = array(); $raImg = array();
	
	while( $ligne = $resultats->fetch()) {
		array_push($raId, $ligne->raId);
		array_push($raLib, $ligne->raLibelle);
		array_push($raImg, $ligne->raImage);
	}
	$resultats->closeCursor();
	
	//matrice rayon
	$rayon = array($raId, $raLib, $raImg);
	
//construction tableau CATEGORIE
	$resultats = $connexion->query("SELECT * FROM categorie");
	$resultats->setFetchMode(PDO::FETCH_OBJ);
	
	//init array
	$caId = array(); $caLib = array(); $raId = array();
	
	while( $ligne = $resultats->fetch())
	{
		array_push($caId, $ligne->caId);
		array_push($caLib, $ligne->caLibelle);
		array_push($raId, $ligne->raId);
	}
	$resultats->closeCursor();
	
	//matrice categorie
	$categorie = array($caId, $caLib, $raId);
	
//AFFICHAGE des listes
	$j=0;
	for($i=0;$i<count($rayon[0]);$i=$i+1)
	{
		echo'<li><a href="#" onclick="requestRayon('.$rayon[0][$i].', \''.$rayon[1][$i].'\');">'.
					'<img src="'.$rayon[2][$i].'">'.
					'<p>'.$rayon[1][$i].'</p></a>'.
				'<ul>';
		while($rayon[0][$i]==$categorie[2][$j])
		{
			echo	'<li><a href="#" onclick="requestCategorie('.$categorie[0][$j].', \''.$categorie[1][$j].'\');">'.
						$categorie[1][$j].
					'</a></li>';
			$j++;
			if($j == count($categorie[2])) break;
		}
		echo	'</ul>'.
			'</li>';
	}
?>