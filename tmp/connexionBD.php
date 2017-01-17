<?php
try {
	$connexion= new PDO("mysql:host=sql.free.fr; dbname=famille_alv",
					"famille.alv", "v3pe6ehv",
					array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8')
				);					
}
catch (PDOException $e) {
	echo("Erreur lors de la connexion".$e->getMessage());
}

?>
