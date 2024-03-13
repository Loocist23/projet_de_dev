import os
from colorama import init, Fore, Style

# On initialise colorama
init()

ACTUAL_DIRECTORY = os.path.dirname(os.path.abspath(__file__))
current_directory = ACTUAL_DIRECTORY  # Variable pour suivre le dossier courant
explored_directories = []  # Une liste pour stocker les dossiers explorés
history = []  # Une pile pour suivre l'historique des dossiers explorés

def list_files_in_directory(directory):
    # On vérifie si le dossier existe
    if not os.path.exists(directory) or not os.path.isdir(directory):
        print(f"Le dossier '{directory}' n'existe pas.")
        return

    # On récupère le chemin complet du dossier
    directory = os.path.abspath(directory)

    # On liste tous les fichiers et dossiers du dossier donné
    list_dir = sorted(os.listdir(directory), key=natural_sort_key)

    # On détermine le nombre de colonnes
    num_columns = 5

    # On calcule la largeur de chaque colonne
    column_width = max(len(item) for item in list_dir) + 4

    # On affiche le contenu du dossier en 5 colonnes
    print(f"{Fore.GREEN}Dossier actuel: {directory}{Style.RESET_ALL}")
    print(f"{Fore.GREEN}Contenu du dossier actuel:{Style.RESET_ALL}")
    print(f"{Fore.GREEN}{'-' * (column_width * num_columns)}{Style.RESET_ALL}")

    for i, item in enumerate(list_dir, start=1):
        if os.path.isdir(os.path.join(directory, item)):
            print(f"{Fore.GREEN}| {item:<{column_width-2}}", end="")
        else:
            print(f"{Fore.GREEN}|{Fore.RED} {item:<{column_width-2}}", end="")

        # Passer à la ligne après chaque 5 éléments
        if i % num_columns == 0 or i == len(list_dir):
            print(f"{Fore.GREEN} |{Style.RESET_ALL}")

    print(f"{Fore.GREEN}{'-' * (column_width * num_columns)}{Style.RESET_ALL}")

def natural_sort_key(s):
    import re
    return [int(text) if text.isdigit() else text.lower()
            for text in re.split('([0-9]+)', s)]

while True:
    # Afficher le contenu du dossier courant
    list_files_in_directory(current_directory)

    # Demander à l'utilisateur ce qu'il veut faire
    user_input = input("Entrez le nom du dossier à explorer, le nom d'un fichier à ouvrir, 'q' pour quitter, ou '..' pour revenir en arrière : ")

    if user_input.lower() == 'q':
        break  # Quitter la boucle si l'utilisateur entre 'q'

    if user_input == '..':
        # Revenir en arrière si l'utilisateur entre '..'
        if history:
            current_directory = history.pop()
        else:
            print("Vous êtes déjà au niveau supérieur du dossier racine.")
        continue

    # Vérifier si l'utilisateur a spécifié un fichier
    file_to_open = os.path.join(current_directory, user_input)
    if os.path.exists(file_to_open) and os.path.isfile(file_to_open):
        # Si c'est un fichier, ouvrez-le avec l'application par défaut
        os.system(f'start {file_to_open}')
    else:
        # Sinon, vérifiez si l'utilisateur a spécifié un dossier valide
        folder_to_explore = os.path.join(current_directory, user_input)
        if os.path.exists(folder_to_explore) and os.path.isdir(folder_to_explore):
            # Si c'est un dossier valide, mettez à jour le dossier courant
            history.append(current_directory)  # Ajouter le dossier courant à l'historique
            current_directory = folder_to_explore
            # Ajouter le dossier exploré à la liste
            explored_directories.append(current_directory)
        else:
            print(f"Le dossier ou le fichier '{user_input}' n'existe pas.")

# À la fin, vous pouvez afficher la liste des dossiers explorés
print("Dossiers explorés :")
for folder in explored_directories:
    print(folder)