import requests, re
from lxml import etree
import pymysql
from bs4 import BeautifulSoup
import csv
import json
import time


class MoGuJie(object):
    def __init__(self):

        self.conn = pymysql.connect('localhost', 'root', '199888', 'mogujie', charset="utf8", use_unicode=True)
        self.cursor = self.conn.cursor()
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
        }
        self.type_list = []
        self.goods_list = []

    def insertDB(self, dic: dict, table_name: str):
        key = [k for k in dic.keys()]
        values = []
        for v in dic.values():
            if isinstance(v, int):
                values.append(str(v))
            elif v == None:
                values.append('null')
            else:
                values.append('"' + str(v) + '"')
        sql = '''insert into %s(%s) value(%s) ''' % (
            table_name, ','.join(key), ','.join(values))
        try:
            self.cursor.execute(sql)
            self.conn.commit()
            print('插入成功')
        except:
            self.conn.rollback()
            print('插入失败')
    def start(self):
        self.get_type()
        for type in self.type_list:
            self.get_goods_list(cid=type['cid'],action=type['action'],type_acm=type['acm'])


    def get_type(self):
        type_url = 'https://mce.mogucdn.com/jsonp/multiget/3?callback=jQuery21108712951155792239_1554983604522&pids=109499%2C109520%2C109731%2C109753%2C110549%2C109779%2C110548%2C110547%2C109757%2C109793%2C109795%2C110563%2C110546%2C110544&appPlat=p&_=1554983604524'

        type_response = requests.get(type_url,)

        pattern = re.compile('\((.*?)\)')

        result = re.findall(pattern, type_response.text)

        type_lists = json.loads(result[0])['data']

        for i in type_lists.values():
            for j in i['list']:
                type = {
                    'title':j['title'],
                    'url':'https:' + j['link'],
                    'acm':j['acm'],
                }
                pattern = re.compile('https://.*?\.mogujie\.com/book/(.*?)/(\d+)\?.*')
                action_result = re.findall(pattern, type['url'])
                type['action'] = action_result[0][0]
                type['cid'] = action_result[0][1]
                self.type_list.append(type)
                type2 = {
                    'title': j['title'],
                    'url': 'https:' + j['link'],
                    'acm': j['acm'],
                }
                self.insertDB(type2,'type')




    def get_goods_list(self,cid,action,type_acm):
        for i in range(1,2):
            url = 'https://list.mogujie.com/search?callback=jQuery21102574084297779988_1555051492670&_version=8193&ratio=3%3A4&cKey=15&page={}&sort=pop&ad=0&fcid={}&action={}&acm={}-mf_15261_1114664-idx_0-mfs_88-dm1_5000&ptp=31._mf1_1239_15261.0.0.RYe659Hm&_=1555051492671'.format(i,cid,action,type_acm)
            goodsList_response = requests.get(url,headers=self.headers)
            pattern = re.compile('\((\{.*\})\)')
            result = re.findall(pattern, goodsList_response.text)
            print(goodsList_response.text)
            goodsList = json.loads(result[0])['result']['wall']['docs']
            for goods in goodsList:
                self.get_goods_info(goods)
    def get_goods_info(self,goods):
        title = goods.get('title',None)
        img_url = goods.get('img',None)
        oldPrice = goods.get('orgPrice',None)
        nowPrice = goods.get('price',None)
        sales = goods.get('sale',None)
        goods_info = {
            'title':title,
            'img_url':img_url,
            'oldPrice':oldPrice,
            'nowPrice':nowPrice,
            'sales':sales
        }
        print(title)
        self.insertDB(goods_info,'goods')

if __name__ == '__main__':
    mogu = MoGuJie()
    mogu.start()
