import requests, re
from lxml import etree
import pymysql
from bs4 import BeautifulSoup
import csv
import json
import time
from w3lib.html import remove_tags
from xml.sax.saxutils import unescape
import math
import hashlib


# def get_verifyRand():

headers = {
    'Cookie':'lang=zh-cn; device=desktop; theme=default; keepLogin=on; za=admin; zp=48549ae4ea8a3c03b1b95f572c8199881589f69e; windowWidth=1867; windowHeight=365; csrftoken=3Vho2oW2T1cueL8O3VRqdGusgNE8SDePxeGhI00XGXp5pdvwR41nuYHqiLpdLLXP; Hm_lvt_b01dd0c75470b9965b488ca37b717a35=1550139859; sessionid=dajqpgbklap8492eab5xhq7z9vezxdar; zentaosid=bih7i3edp5ino0p04at7npan96',
}


response = requests.get('http://127.0.0.1:8080/zentao/user-create-0.html',headers=headers)


html = etree.HTML(response.text)

verifyRand = html.xpath('//*[@id="verifyRand"]/@value')[0]
print(verifyRand)



# data = {
#     'dept': '0',
#     'account': 'zxxx',
#     'password1': 'zxx981121..',
#     'password2': 'zxx981121..',
#     'realname': 'zxx',
#     'join': '2019-04-24',
#     'role': 'qa',
#     'group': '3',
#     'email': 'zxx@qq.com',
#     'commiter':'',
#     'gender': 'f',
#     'verifyPassword': 'fdca52bd2cdb91bd62b588f0160a2674',
# }





