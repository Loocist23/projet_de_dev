import random
from colorama import Fore, init
from time import sleep

# Initialise le module Colorama pour la coloration du texte
init(autoreset=True)

# Fonction pour générer un identifiant aléatoire de 16 chiffres
def generate_random_id():
    return str(random.randint(10**15, 10**16 - 1))

# Fonction pour afficher le texte en rouge, sauf si le solde est positif
def print_red_unless_positive(text, solde):
    if solde > 0:
        print(Fore.GREEN + text)
    else:
        print(Fore.RED + text)

def generate_card_number():
    return str(random.randint(10**15, 10**16 - 1))

def generate_card_pin():
    return str(random.randint(10**3, 10**4 - 1))

def generate_soldes():
    # Génère un solde égal à zéro avec une probabilité de 99.99999%
    if random.random() < 0.9999999:
        return "0"
    # Si la probabilité n'est pas satisfaite, génère un solde positif aléatoire
    return str(random.randint(1, 1e9))

def clear_output():
    print("\033[H\033[J", end="")


def prod():
    clear_output()
    random_soldes = generate_soldes()
    random_id = generate_random_id()
    print_red_unless_positive("Faux Identifiant : " + random_id, float(random_soldes))

    # Génère un numéro de carte et l'affiche en rouge
    random_card_number = generate_card_number()
    # ecrit le faux numero de carte au format 0000 0000 0000 0000
    random_card_number = random_card_number[0:4] + " " + random_card_number[4:8] + " " + random_card_number[8:12] + " " + random_card_number[12:16]
    print_red_unless_positive("Faux Numéro de carte : " + random_card_number, float(random_soldes))

    # Génère un code PIN et l'affiche en rouge
    random_card_pin = generate_card_pin()
    print_red_unless_positive("Faux Code PIN : " + random_card_pin, float(random_soldes))

    # Génère un solde et l'affiche en rouge, sauf s'il est égal à zéro
    
    print_red_unless_positive("Faux Solde : " + random_soldes, float(random_soldes))
    
    print(Fore.CYAN + "TOUT CECI EST FAUX !")
    print(Fore.CYAN + "TOUT CECI EST FAUX !")
    print(Fore.CYAN + "TOUT CECI EST FAUX !")
    print(Fore.CYAN + "TOUT CECI EST FAUX !")
    print(Fore.CYAN + "TOUT CECI EST FAUX !")



while True:
    prod()
    sleep(0.3)