import hashlib
import time



# md = hashlib.md5()#构造一个md5
# md.update('123'.encode())
# print(md.hexdigest())#加密后的字符串

a = time.time()

b = str(a)

c = b.split('.')

d = c[0] + c[1]

e = 1
for i in d:
    e = e * int(i)
    e += int(i)
print(e)







