import json
import os
import time

def compter_prompts(json_data):
    prompts_count = 0
    # Compter tous les messages où le rôle de l'auteur est 'user'
    for item in json_data:
        # Nous assumons que 'mapping' est le champ qui contient les messages
        for key, value in item.get('mapping', {}).items():
            # Ajouter une vérification pour s'assurer que 'message' n'est pas None
            if value.get('message') and value['message'].get('author', {}).get('role') == 'user':
                prompts_count += 1
    return prompts_count

## une methode qui permet de connaitre la date de modification du fichier

def date_modification_fichier():
    # qui me retourne sa au format YYYY-MM-DD HH:MM:SS
    return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(os.path.getmtime('conversations.json')))


if __name__ == '__main__':    
    
    with open('conversations.json', 'r', encoding='utf-8') as file:
        json_data = json.load(file)
    
    conversations = len(json_data)
    prompts = compter_prompts(json_data)
    print(f"Date du fichier: {date_modification_fichier()}")
    print(f"Nombre total de conversations: {conversations}")
    print(f"Nombre total de prompts: {prompts}")
    print(f"Nombre moyen de prompts par conversation: {prompts / conversations}")
    print(f"Nombre max de prompts dans une conversation: {max([len(item.get('mapping', {})) for item in json_data])}")
    print(f"Conversation avec le plus de prompts: {max(json_data, key=lambda item: len(item.get('mapping', {})))['title']}")
    print(f"Conversation avec le moins de prompts: {min(json_data, key=lambda item: len(item.get('mapping', {})))['title']}")
    print(f"Deuxieme conversation avec le moins de prompts: {sorted(json_data, key=lambda item: len(item.get('mapping', {})))[1]['title']}")
    print(f"Deuxieme conversation avec le plus de prompts: {sorted(json_data, key=lambda item: len(item.get('mapping', {})), reverse=True)[1]['title']}")
    print(f"Nombre de prompts dans la deuxieme conversation avec le plus de prompts: {len(sorted(json_data, key=lambda item: len(item.get('mapping', {})), reverse=True)[1]['mapping'])}")
    print(f"Cumul des des deux plus grandes conversations: {len(max(json_data, key=lambda item: len(item.get('mapping', {})))['mapping']) + len(sorted(json_data, key=lambda item: len(item.get('mapping', {})), reverse=True)[1]['mapping'])}")
    print(f"Nombre total de characters dans les conversations: {sum([len(item.get('title', '')) for item in json_data])}")