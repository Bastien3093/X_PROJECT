/**
 * Created on 12/01/2017.
 */

/**
 * Ecrit l'erreur de requete HTTP dnas le fichier erreur_ajax.txt
 * @param statut
 * @param erreur
 * @param resultat
 */
function erreurRequeteFile(statut, erreur, resultat){

    var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
    var fileError = fileSystem.OpenTextFile("erreur_ajax.txt", 2 ,true);

    fileError.WriteLine("error "+statut+" err "+erreur+" res "+resultat);
    fileError.Close();
}
