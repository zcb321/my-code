import re

a = '1-100人'

b = re.search('.*?-.*?人',a)
print(b.string)