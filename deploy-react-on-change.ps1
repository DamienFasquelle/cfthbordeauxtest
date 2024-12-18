# Paramètres FTP
$ftpServer = "ftp.cluster029.hosting.ovh.net"
$ftpUsername = "cfthbol"
$ftpPassword = "wJJ548K6eaL6rv"
$remotePath = "/www"
$localBuildPath = "C:\Users\fasqu\Desktop\Travail\cfth\cfthbordeaux\frontend\build"
$projectPath = "C:\Users\fasqu\Desktop\Travail\cfth\cfthbordeaux\frontend"

# Fonction pour uploader les fichiers via FTP en une seule connexion
function UploadFiles($localPath, $remotePath) {
    # Prépare le script FTP
    $ftpScript = @"
open $ftpServer
user $ftpUsername $ftpPassword
binary
"@

    # Ajoute les commandes pour uploader chaque fichier
    foreach ($file in Get-ChildItem -Recurse -Path $localPath) {
        $remoteFilePath = $remotePath + $file.FullName.Substring($localPath.Length).Replace("\", "/")
        
        # Crée les dossiers distants au besoin et upload le fichier
        $ftpScript += "lcd ""$($file.Directory.FullName)""`n"
        $ftpScript += "cd $remotePath`n"
        $ftpScript += "put ""$($file.FullName)"" ""$remoteFilePath""`n"
    }

    # Ajoute la commande pour quitter
    $ftpScript += "bye"

    # Sauvegarde le script FTP dans un fichier temporaire
    $tempFtpFile = [System.IO.Path]::GetTempFileName()
    Set-Content -Path $tempFtpFile -Value $ftpScript

    # Exécute la commande FTP en utilisant le fichier de script temporaire
    Start-Process -FilePath "ftp.exe" -ArgumentList "-s:$tempFtpFile" -Wait

    # Supprime le fichier temporaire après l'exécution
    Remove-Item $tempFtpFile
}

# Change le répertoire de travail vers le chemin du projet
Set-Location -Path $projectPath

# Exécute le build du projet
Write-Host "Lancement de la construction du projet React dans le répertoire $projectPath..."
Invoke-Expression "npm run build"
Write-Host "Build terminé. Début de l'upload des fichiers..."

# Appelle la fonction d'upload pour déployer les fichiers construits
UploadFiles $localBuildPath $remotePath
Write-Host "Déploiement terminé."
