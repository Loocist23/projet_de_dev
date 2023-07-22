from tkinter import *
from tkinter import ttk
import random
import string

def generate_password(size):
    password = []
    for i in range(size):
        alpha = random.choice(string.ascii_letters)
        symbol = random.choice(string.punctuation)
        numbers = random.choice(string.digits)
        password.append(random.choice([alpha, symbol, numbers]))
    y = "".join(str(x) for x in password)
    passwordlabel.config(text=y)
    
def check():
    try:
        value = int(NumEntry.get())
    except ValueError:
        passwordlabel.config(text="Please enter a number")
        return
    if value < 8:
        passwordlabel.config(text="Password too short")
    elif value > 128:
        passwordlabel.config(text="Password too long")
    else:
        generate_password(value)

def copypassword():
    root.clipboard_clear()
    root.clipboard_append(passwordlabel.cget("text"))

# Create the window

root = Tk()
root.title("App Python")

# Label
label = ttk.Label(root, text="Generate a password")
sizelabel = ttk.Label(root, text="Size, min: 8, max: 128")
passlabel = ttk.Label(root, text="Password: ")
passwordlabel = ttk.Label(root, text="")

# Button

GenButton = ttk.Button(root, text="Click Me", command=check)
CopieButton = ttk.Button(root, text="Copie abc", command=copypassword)

# Entry

NumEntry = ttk.Entry(root)

#now we create the app

label.pack()
sizelabel.pack()
GenButton.pack()
NumEntry.pack()
passlabel.pack()
passwordlabel.pack()
CopieButton.pack()

root.mainloop()