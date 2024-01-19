from transformers import GPT2LMHeadModel, GPT2Tokenizer
from googlesearch import search
import sqlite3
import sympy as sp
import markovify
import openai
import gym
import speech_recognition as sr
from gtts import gTTS
import pygame
import threading
import webbrowser
import tkinter as tk
from tkinter import messagebox
import random

class IAAutonome:
    def __init__(self, api_key, model_name="EleutherAI/gpt-neo-2.7B"):
        openai.api_key = api_key
        self.model_name = model_name
        self.instructions = {
            "ajouter": self.ajouter,
            "modifier": self.modifier,
            "supprimer": self.supprimer,
            "lire": self.lire,
            "rechercher": self.rechercher_internet,
            "calculer": self.calculer,
            "generer": self.generer_phrase,
            "discuter": self.demarrer_conversation,
            "reconnaissance_vocale": self.reconnaissance_vocale,
            # Ajoutez d'autres mappings d'ordres à des instructions ici
        }
        self.conn = sqlite3.connect('apprentissage.db')
        self.c = self.conn.cursor()
        self.initialiser_ia()
        self.env = gym.make('CartPole-v1')
        self.setup_interface()

    # Méthodes du premier script

    def initialiser_ia(self):
        self.tokenizer = GPT2Tokenizer.from_pretrained(self.model_name)
        self.model = GPT2LMHeadModel.from_pretrained(self.model_name)

    def comprendre_instruction(self, instruction):
        input_ids = self.tokenizer.encode(instruction, return_tensors='pt')
        output = self.model.generate(input_ids, max_length=100, num_return_sequences=1)
        reponse = self.tokenizer.decode(output[0], skip_special_tokens=True)
        return reponse

    def ajouter_au_contexte(self, question, reponse):
        try:
            self.c.execute("INSERT INTO apprentissage (question, réponse) VALUES (?, ?)", (question, reponse))
            self.conn.commit()
            print("Élément ajouté avec succès.")
        except Exception as e:
            print(f"Erreur lors de l'ajout de l'élément : {e}")

    # Méthodes du deuxième script

    def reconnaissance_vocale(self):
        r = sr.Recognizer()
        with sr.Microphone() as source:
            print("Dites quelque chose...")
            audio = r.listen(source)
        try:
            texte = r.recognize_google(audio, language='fr-FR')
            print("Vous avez dit : " + texte)
            return texte
        except sr.UnknownValueError:
            print("Google Speech Recognition n'a pas pu comprendre l'audio.")
        except sr.RequestError as e:
            print("Impossible d'obtenir la réponse de Google Speech Recognition ; {0}".format(e))

    def synthese_vocale(self, texte):
        tts = gTTS(text=texte, lang='fr')
        tts.save("output.mp3")
        pygame.mixer.init()
        pygame.mixer.music.load("output.mp3")
        pygame.mixer.music.play()

    def setup_interface(self):
        self.root = tk.Tk()
        self.root.title("IA Autonome")
        self.root.geometry("600x400")
        self.input_text = tk.StringVar()
        self.input_entry = tk.Entry(self.root, textvariable=self.input_text, font=('calibre', 14, 'normal'))
        self.input_entry.place(relx=0.5, rely=0.2, anchor=tk.CENTER)
        self.output_text = tk.StringVar()
        self.output_label = tk.Label(self.root, textvariable=self.output_text, font=('calibre', 14, 'bold'))
        self.output_label.place(relx=0.5, rely=0.4, anchor=tk.CENTER)
        self.ask_button = tk.Button(self.root, text='Demander', command=self.executer_ordre)
        self.ask_button.place(relx=0.5, rely=0.6, anchor=tk.CENTER)
        self.root.mainloop()

    # Méthodes du deuxième script

    def executer_ordre(self):
        ordre_utilisateur = self.input_text.get().lower()
        instruction_transformee = self.transformer_en_instruction(ordre_utilisateur)
        self.instructions.get(instruction_transformee, self.afficher_erreur())

    def transformer_en_instruction(self, ordre):
        mots = ordre.split()
        instruction = [self.instructions.get(mot, mot) for mot in mots]
        return " ".join(instruction)

    # Les autres méthodes du code sont inchangées.

    # Méthodes du premier script

    def apprendre_par_renforcement(self):
        EPISODES_APPRENTISSAGE = 1000
        for _ in range(EPISODES_APPRENTISSAGE):
            state = self.env.reset()
            done = False
            while not done:
                instruction = self.comprendre_instruction(str(state))
                input_ids = self.tokenizer.encode(instruction, return_tensors='pt')
                output = self.model.generate(input_ids, max_length=100, num_return_sequences=1)
                action = self.tokenizer.decode(output[0], skip_special_tokens=True)

                next_state, reward, done, _ = self.env.step(int(action))
                self.memory(state, action, reward, next_state)
                state = next_state

            self.mettre_a_jour_modele()

    def mettre_a_jour_modele(self):
        # Implémentez la logique pour mettre à jour le modèle en fonction des nouvelles données
        pass

    def memory(self, state, action, reward, next_state):
        # Implémentez la logique pour stocker les données d'apprentissage par renforcement
        pass

    # Méthodes du deuxième script

    def generer_reponse(self, prompt):
        try:
            response = openai.Completion.create(
                engine="text-davinci-004",
                prompt=prompt,
                max_tokens=150,
                n=1,
                stop=None
            )
            return response.choices[0].text.strip()
        except Exception as e:
            print(f"Erreur lors de la génération de la réponse : {e}")
            return "Erreur : Impossible de générer une réponse."

    def afficher_erreur(self):
        print("Commande non reconnue.")

# Exemple d'utilisation
if __name__ == "__main__":
    api_key = "VOTRE_CLE_API_OPENAI"
    ia = IAAutonome(api_key)
    while True:
        ia.executer_ordre()
