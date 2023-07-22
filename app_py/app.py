from tkinter import *
from tkinter import ttk

def change_text():
    #recupere les valeurs du champs Entry
    value = Entry.get()
    #on affiche la valeur dans le label
    label.config(text=value)


root = Tk()
root.title("App Python")

# Label
label = ttk.Label(root, text="Generate a password")

# Button

Button = ttk.Button(root, text="Click Me", command=change_text)

# Entry

Entry = ttk.Entry(root, width=30)

#now we create the app

label.pack()
Button.pack()
Entry.pack()

root.mainloop()