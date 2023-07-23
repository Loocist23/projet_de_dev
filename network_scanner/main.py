import subprocess
from tkinter import *

def is_valid_ip(ip):
    try:
        parts = ip.split(".")
        if len(parts) != 4:
            return False
        for part in parts:
            if not 0 <= int(part) <= 255:
                return False
        return True
    except ValueError:
        return False

def scan_network():
    try:
        arp_result = subprocess.check_output(["arp", "-a"], universal_newlines=True)
        ip_addresses = set()
        lines = arp_result.splitlines()
        for line in lines:
            if "." in line:
                ip = line.split()[0]
                if is_valid_ip(ip):
                    ip_addresses.add(ip)
        sorted_ips = sorted(ip_addresses)
        return sorted_ips
    except subprocess.CalledProcessError:
        return []


def nmap_scan(ip_address, ports):
    try:
        ports_str = ",".join(ports)
        nmap_result = subprocess.check_output(["C:\\Program Files (x86)\\Nmap\\nmap.exe", "-p", ports_str, ip_address], universal_newlines=True)
        return nmap_result
    except subprocess.CalledProcessError:
        return "Impossible d'effectuer le scan Nmap."

def scan_ports():
    selected_index = ip_listbox.curselection()
    if selected_index:
        ip_address = ip_listbox.get(selected_index)
        ports = ports_entry.get().split(",")
        nmap_result = nmap_scan(ip_address, ports)

        result_text.config(state=NORMAL)
        result_text.delete("1.0", END)
        result_text.insert(END, f"\n\nScan Nmap pour {ip_address} sur les ports {', '.join(ports)} :\n")
        result_text.insert(END, nmap_result)
        result_text.config(state=DISABLED)

root = Tk()
root.title("Scanner de ports d'une adresse IP")

Label(root, text="Appuyez sur le bouton 'Scan réseau' pour détecter les adresses IP du réseau local.").pack()

ip_listbox = Listbox(root, width=50, height=10)
ip_listbox.pack()

def on_scan_network():
    ip_listbox.delete(0, END)
    ip_addresses = scan_network()
    for ip in ip_addresses:
        ip_listbox.insert(END, ip)

scan_network_button = Button(root, text="Scan réseau", command=on_scan_network)
scan_network_button.pack()

Label(root, text="Liste des ports (séparés par des virgules) :").pack()
ports_entry = Entry(root)
ports_entry.pack()

scan_button = Button(root, text="Scanner le(s) port(s)", command=scan_ports)
scan_button.pack()

result_text = Text(root, wrap=WORD, width=50, height=15, state=DISABLED)
result_text.pack()

root.mainloop()
