import requests
from bs4 import BeautifulSoup
import json

MAX_DEPTH = 3

def check_url(url, base_url):
    if url.startswith("http://") or url.startswith("https://"):
        return url
    elif url == "" or url.startswith("javascript:") or url.startswith("#"):
        return None
    else:
        return base_url + url

def scrap(url, depth=0, visited=None, type_search="a"):
    if visited is None:
        visited = set()

    if depth > MAX_DEPTH:
        print("Profondeur maximale atteinte")
        return

    url = check_url(url, "http://")
    if not url:
        print("L'url est invalide ou vide")
        return

    if url in visited:
        print(f"URL déjà visité: {url}")
        return

    visited.add(url)

    r = requests.get(url)

    if r.status_code != 200:
        print(f"Impossible d'accéder à l'URL: {url}")
        return

    soup = BeautifulSoup(r.text, "html.parser")
    links = soup.find_all(type_search)

    links_dict = {}

    for link in links:
        text = link.text
        href = link.get("href")

        full_url = check_url(href, url)
        if full_url and full_url not in visited:
            links_dict[text] = full_url
            scrap(full_url, depth+1, visited)

    with open(f"links_depth_{depth}.json", "w") as f:
        json.dump(links_dict, f, indent=4)
        print(f"Fichier links_depth_{depth}.json créé")

url = input("Entrez l'URL à crawler : ")
print("Quelle type de balise voulez-vous crawler ?")
print("1 - a (lien)")
print("2 - img (image)")
type_search = input("Votre choix : ")
scrap(url, type_search=type_search)
