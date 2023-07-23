from tkinter import *
from tkinter import ttk
import random
import string

def generate_password(size):
    password = []
    for i in range(size):
        alpha = random.choice(string.ascii_letters)
        symbol = random.choice("!@#$%^&*")
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
label.grid(row=0, column=0)
sizelabel = ttk.Label(root, text="Size min: 8, max: 128")
sizelabel.grid(row=1, column=0)
passlabel = ttk.Label(root, text="Password: ")
passlabel.grid(row=3, column=0)
passwordlabel = ttk.Label(root, text="")
passwordlabel.grid(row=3, column=1)
# Button

GenButton = ttk.Button(root, text="Generate", command=check)
GenButton.grid(row=2, column=1)
CopieButton = ttk.Button(root, text="Copy password", command=copypassword)
CopieButton.grid(row=3, column=2, sticky="W")
# Entry

NumEntry = ttk.Entry(root)
NumEntry.grid(row=2, column=0)

#now we create the app


root.mainloop()