import shutil
import os
from pathlib import Path 

pathCopy = 'source.txt'
pathPaste = 'source - copy.txt'

files = os.listdir()
print("Datoteke prije dohvaćanja datoteka: {}".format(files))
fileSrc = open(pathCopy,'r')
print("Size of source file: {} MB.".format(Path(pathCopy).stat().st_size/(1024*1024)))

fileDst = open(pathPaste,'w')
files = os.listdir()
print("Datoteke nakon dohvaćanja datoteka: {}".format(files))

shutil.copyfileobj(fileSrc, fileDst) 

fileSrc.close()
fileDst.close()

print("Size of new file: {} MB.".format(Path(pathPaste).stat().st_size/(1024*1024)))
