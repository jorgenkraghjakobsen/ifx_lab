import subprocess

def getI2c():
    sp = subprocess.run(['i2cdetect', '-y', '1'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if sp.returncode != 0:
        return "ic2detect not working properly."
    else:
        print(sp.stdout)
        
        return sp.stdout