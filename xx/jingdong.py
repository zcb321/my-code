import requests
import csv
from lxml import etree
import pymysql
import re
import json



class Jingdong(object):
    def __init__(self,url):
        self.url = url
        self.headers = {
            'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
        }
        self.info_list = []
        # self.conn = pymysql.connect('localhost', 'root', '199888', 'jingdong', charset="utf8", use_unicode=True)
        # self.cursor = self.conn.cursor()


    def get_info(self):
        id_pattern = re.compile('https://item.jd.com/(\d+).html')
        goods_id = re.findall(id_pattern,self.url)[0]
        comment_url = 'https://sclub.jd.com/comment/productPageComments.action'
        for i in range(100):
            data = {
                'callback': 'fetchJSON_comment98vv124526',
                'productId': goods_id,
                'score': 0,
                'sortType': 5,
                'page': i,
                'pageSize': 10,
                'isShadowSku': 0,
                'rid': 0,
                'fold': 1,
            }
            response = requests.get(comment_url,params=data,headers=self.headers)
            comment_list = json.loads(response.text.replace('fetchJSON_comment98vv124526(','')[:-2])['comments']
            for comment in comment_list:
                info = {
                    'content':comment['content'],
                    'nickname':comment['nickname'],
                    'userImage':comment['userImage'],

                }






    def save_csv(self):
        pass



    def save_mysql(self):
        pass












if __name__ == '__main__':
    jingDong = Jingdong('https://item.jd.com/6477942.html')
    jingDong.get_info()
































































































