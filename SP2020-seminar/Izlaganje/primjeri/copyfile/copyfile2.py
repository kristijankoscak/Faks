import shutil
import os
import time
    
pathCopy = 'shortcut.docx'
pathPaste = 'shortcut-copy.docx'

dest = shutil.copyfile(pathCopy,pathPaste,follow_symlinks=False)


