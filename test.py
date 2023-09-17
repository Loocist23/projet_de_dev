import json, os, sys
import yaml

#check si on nous a donner quelque chose dans la ligne de commande

if len(sys.argv) > 1:
    fichier = sys.argv[1]
else:
    fichier = input("Entrez le nom du fichier à ouvrir : ")

#verifie si le fichier est deja existant #et si il est bien formaté


if os.path.exists(fichier):
    try:
        with open(fichier, "r") as f:
            data = json.load(f)
            print("Le fichier est au format JSON")
            #transformer le JSON en yaml
            with open("test.yaml", "w") as f:
                yaml.dump(data, f, default_flow_style=False, encoding='utf-8', allow_unicode=True)
                print("Le fichier a bien été converti en YAML")

    except:
        print("Le fichier n'est pas au format JSON")
else:
    print("Le fichier n'existe pas")
        
