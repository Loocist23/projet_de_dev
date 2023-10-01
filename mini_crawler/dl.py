from selenium import webdriver
from selenium.webdriver.common.by import By
import requests

def telecharger_image(browser, lien, nom_fichier):
    browser.get(lien)
    image_url = browser.find_element(By.TAG_NAME, "img").get_attribute("src")
    
    if not image_url:
        print("Impossible de trouver l'URL de l'image.")
        return

    reponse = requests.get(image_url, stream=True)
    reponse.raise_for_status()

    with open(nom_fichier, 'wb') as fichier:
        for chunk in reponse.iter_content(chunk_size=8192): 
            fichier.write(chunk)

if __name__ == "__main__":
    url_page = input("Entrez l'URL de la page contenant l'image: ")
    nom_fichier = input("Entrez le nom du fichier (avec l'extension): ")
    
    with webdriver.Chrome() as browser:
        telecharger_image(browser, url_page, nom_fichier)

    print(f"L'image a été téléchargée sous le nom {nom_fichier}!")
