#size 1024*1024 = 1MB
size = 1024*1024
with open("file1MB.txt","wb") as file:
    file.truncate(size)
