import requests, re
from lxml import etree
import pymysql
from bs4 import BeautifulSoup
import csv
import json
import time
import hashlib



password = input('输入登录密码:')


# 密码的加密需要用到页面里的一个verfyRand值,这里写个函数专门用来获取这个值
def get_verifyRand(url,headers=None):
    response = requests.get(url,headers=headers) # 发起get请求,获取到response页面


    html = etree.HTML(response.text)

    verifyRand = html.xpath('//*[@id="verifyRand"]/@value')[0] # 用xpath取出verfyRand值
    return verifyRand # 返回值

login_verifyRand = get_verifyRand('http://127.0.0.1:8080/zentao/user-login.html') # 利用上面的函数获取到登录界面的verifyRand值


# ------------密码加密方式------------

# 1. 将输入的密码通过md5加密
# 2. 加密后的密码加上verifyRand值生成新的密码
# 3. 最后把新的密码再通过md5加密,得到最后传入data中的值

def get_password(password,verifyRand): # 密码加密的函数
    password1 = hashlib.md5(password.encode('utf-8')).hexdigest() # 第一次md5加密原密码
    password2 = hashlib.md5((password1 + verifyRand).encode('utf-8')).hexdigest() # 加密后的原密码加上verifyRand值,并再进行一次md5加密
    # 利用python自带的hashlib进行md5加密
    # 加密后是一个md5的对象
    # 需要用  .hexdigest 来取出加密后的值
    return password2

password1 = get_password(password,login_verifyRand)


# post请求需要的data参数
login_data = {
    'account': 'admin',
    'password': password1, # 加密后的密码
    'keepLogin[]': 'on',
    'referer': "http://127.0.0.1:8080/zentao/user-create-0.html",
    'verifyRand': login_verifyRand, # 之前取出的verifyRand值
}




# 给正确的cookie值
add_header = {
    'Cookie': 'lang=zh-cn; device=desktop; theme=default; keepLogin=on; za=admin; zp=05ff2ac84c4619f6571c4487e05d6986133f3fff; windowWidth=1867; windowHeight=711; csrftoken=3Vho2oW2T1cueL8O3VRqdGusgNE8SDePxeGhI00XGXp5pdvwR41nuYHqiLpdLLXP; Hm_lvt_b01dd0c75470b9965b488ca37b717a35=1550139859; sessionid=dajqpgbklap8492eab5xhq7z9vezxdar; zentaosid=bih7i3edp5ino0p04at7npan96',
}

# 获取添加用户界面的verifyRand值
add_verifyRand = get_verifyRand('http://127.0.0.1:8080/zentao/user-create-0.html',headers=add_header)

# 加密密码
password2 = get_password(password,add_verifyRand)

# 生成data
add_data = {
    'dept': '0',
    'account': 'a',
    'password1': 'zxcvbnm..',
    'password2': 'zxcvbnm..',
    'realname': '男男女女',
    'join': '2019-04-24',
    'role': 'td',
    'group': '6',
    'email': 'zzz@qq.com',
    'commiter':'',
    'gender': 'f',
    'verifyPassword': password2
}

# 给正确的cookie
add_header2 = {
    'Cookie': 'lang=zh-cn; device=desktop; theme=default; keepLogin=on; za=admin; zp=05ff2ac84c4619f6571c4487e05d6986133f3fff; windowWidth=1867; windowHeight=711; csrftoken=3Vho2oW2T1cueL8O3VRqdGusgNE8SDePxeGhI00XGXp5pdvwR41nuYHqiLpdLLXP; Hm_lvt_b01dd0c75470b9965b488ca37b717a35=1550139859; sessionid=dajqpgbklap8492eab5xhq7z9vezxdar; zentaosid=bih7i3edp5ino0p04at7npan96',
}

# 发起post请求,添加用户
add_response = requests.post('http://127.0.0.1:8080/zentao/user-create-0.html',data=add_data,headers=add_header2)


print(add_response.status_code)



































































































