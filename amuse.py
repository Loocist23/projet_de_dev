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
        print(text)
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

def prod():
    random_id = generate_random_id()
    print_red_unless_positive("Identifiant : " + random_id, 0.0)

    # Génère un numéro de carte et l'affiche en rouge
    random_card_number = generate_card_number()
    print_red_unless_positive("Numéro de carte : " + random_card_number, 0.0)

    # Génère un code PIN et l'affiche en rouge
    random_card_pin = generate_card_pin()
    print_red_unless_positive("Code PIN : " + random_card_pin, 0.0)

    # Génère un solde et l'affiche en rouge, sauf s'il est égal à zéro
    random_soldes = generate_soldes()
    print_red_unless_positive("Solde : " + random_soldes, float(random_soldes))


while True:
    prod()
    sleep(0.3)