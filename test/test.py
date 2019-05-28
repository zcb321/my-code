import requests, re
from lxml import etree
import pymysql
from bs4 import BeautifulSoup
import csv
import json
import time

# while True:
headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
    'Referer': 'https://shop.mogujie.com/detail/1m6mwdw?acm=3.ms.1_4_1m6mwdw.15.1343-68998.d3WLnrnpiAOHP.sd_117-swt_15-imt_6-c_1_3_421957112_0_0_3-t_d3WLnrnpiAOHP-lc_3-fcid_50206-pid_180-pit_1-dit_23-idx_0-dm1_5002&cparam=MTU1NTA1MTI1NV8xMWtfZGJiZmZmYzJiNWMwNjY0ZTE1ODcxNmM4OTJlMDgzOWZfM18wXzQyMTk1NzExMl80Zl8wXzBfMF85ODdfMV8zX2xvYy0w&ptp=31.XieXf.0.0.U8GD1Pgq'
}

mwt = str(time.time()).replace('.','')[:13]
params = {
    'data': '{"iid":"1m6mwdw","activityId":"","fastbuyId":"","template":"1-1-detail_normal-1.0.0"}',
    'mw-appkey': '100028',
    'mw-ttid': 'NMMain@mgj_pc_1.0',
    'mw-t': mwt,
    'mw-uuid': '5b16a32a-16c6-4a0d-b0c1-83cdab09190f',
    'mw-h5-os': 'unknown',
    'mw-sign': '1a808695a914353bf84ce2bcbf64c401',
    'callback': 'mwpCb1',
    '_': str(int(mwt)+3)
}



a = requests.get('https://apimwcs.mogujie.com/h5/http.detail.api/1/',params=params,headers=headers)

# with open('1.txt','w') as file:
#     file.write(a.text)

print(a.text)

print(time.time())