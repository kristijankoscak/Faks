import shutil
import os
import time

def showMetaData(file):
    stat_info = os.stat(file)
    print('\tProtection bits        : {}' .format(stat_info.st_mode))
    print('\tSize                   : {} B' .format(stat_info.st_size))
    print('\tRecent access time     : {}' .format(time.ctime(stat_info.st_atime)))
    print('\tRecent content change  : {}' .format(time.ctime(stat_info.st_mtime)))
    print('\tRecent metadata change : {}' .format(time.ctime(stat_info.st_ctime)))
    
pathCopy = 'shortcut.docx'
pathPaste = 'shortcut-copy.docx'
dest = shutil.copy2(pathCopy,pathPaste,follow_symlinks=False)
##
print('==================== nakon kopiranja ========== ')
print('======= izvorna datoteka ')
showMetaData(pathCopy)
print('\n')
print('======= kopija datoteke ')
showMetaData(pathPaste)



