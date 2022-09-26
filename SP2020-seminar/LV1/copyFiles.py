# importing shutil module
import shutil

from pathlib import Path
import time

source = 'file5GB.txt'
fileSrc = open(source,'r')
destination = 'file5GB-copy.txt'
fileDst = open(destination,'w')

start = time.time()
shutil.copyfileobj(fileSrc,fileDst,256)
end = time.time()
print("Spent time(buff-256): {} ms.".format((end-start)*1000))

fileSrc.close()
fileDst.close()
print("Size of source file: {} KB.".format(Path(source).stat().st_size/1024))
print("Size of destination file: {} KB.".format(Path(destination).stat().st_size/1024))
