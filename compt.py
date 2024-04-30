import json

# Spécifiez le chemin vers votre fichier JSON exporté
chemin_fichier_json = "conversations.json"

# Compteur pour les chats
nombre_de_chats = 0

# Ouvrir le fichier JSON en mode lecture
with open(chemin_fichier_json, "r") as fichier:
    # Charger le contenu du fichier JSON
    donnees_json = json.load(fichier)
    
    # Parcourir chaque élément dans le JSON
    for element in donnees_json:
        # Vérifier si l'élément est un chat en vérifiant s'il commence par la clé "title"
        if "title" in element:
            nombre_de_chats += 1

# Afficher le nombre total de chats
print("Nombre total de chats :", nombre_de_chats)
