<?php global $connexion; try {
	$connexion= new PDO("mysql:host=localhost; dbname=x_project", "x_project", "V4KqzFtLgyNjuFYK", array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8') );
}catch (PDOException $e) { echo("Erreur lors de la connexion".$e->getMessage()); } ?>

<?php global $connexion; try {
    $connexion= new PDO("mysql:host=sql.free.fr; dbname=epimarche", "epimarche", "rs87XsTV", array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8') );
} catch (PDOException $e) { echo("Erreur lors de la connexion".$e->getMessage()); } ?>
