import shutil
import os
import time
from pathlib import Path 

def showMetaData(file):
    stat_info = os.stat(file)
    print('\tProtection bits        : {}' .format(stat_info.st_mode))
    print('\tSize                   : {} B' .format(stat_info.st_size))
    print('\tRecent access time     : {}' .format(time.ctime(stat_info.st_atime)))
    print('\tRecent content change  : {}' .format(time.ctime(stat_info.st_mtime)))
    print('\tRecent metadata change : {}' .format(time.ctime(stat_info.st_ctime)))
    
pathCopy = 'source.docx'
pathPaste = 'destination.docx'
print('==================== prije kopiranja ========== ')
print('======= izvorna datoteka ')
showMetaData(pathCopy)
print('\n')
print('======= kopija datoteke ')
showMetaData(pathPaste)
dest = shutil.copyfile(pathCopy,pathPaste)
##
print('==================== nakon kopiranja ========== ')
showMetaData(pathPaste)



