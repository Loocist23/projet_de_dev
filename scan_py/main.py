# ceci est un script qui va scanner le reseau local et afficher les adresses IP et MAC des machines connectees

import os


print(os.system("arp -a"))
print(os.system("ping google.fr"))
