import requests, re
from lxml import etree
from bs4 import BeautifulSoup
import pymysql
import pymongo


class News(object):

    def __init__(self, url):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        }
        self.mongoConn = pymongo.MongoClient('mongodb://zcb:123@localhost:27017/')
        self.mongodb = self.mongoConn.guangming
        self.mongocol = self.mongodb.news
        self.response = requests.get(url, headers=self.headers)
        self.pattern = re.compile('(\d{4}-\d{2}/\d{2}/content_\d+\.htm)', re.S)
        self.result = re.findall(self.pattern, self.response.content.decode())
        if url == 'http://topics.gmw.cn/':
            zt_pattern = re.compile('(node_\d+\.htm)')
            zt_result = re.findall(zt_pattern, self.response.content.decode())
            self.result = []
            for i in zt_result:
                zt_response = requests.get('http://topics.gmw.cn/' + i, headers=self.headers)
                self.result = self.result + re.findall(self.pattern, zt_response.content.decode())
        self.news_list = []
        self.news_content_list = []
        self.http_list = [
            'http://guancha.gmw.cn/',
            'http://news.gmw.cn/',
            'http://politics.gmw.cn/',
            'http://edu.gmw.cn/',
            'http://sports.gmw.cn/',
            'http://tech.gmw.cn/',
            'http://culture.gmw.cn/',
            'http://legal.gmw.cn/',
            'http://e.gmw.cn/',
            'http://world.gmw.cn/',
            'http://photo.gmw.cn/',
            'http://mil.gmw.cn/',
            'http://health.gmw.cn/',
            'http://difang.gmw.cn/',
            'http://difang.gmw.cn/cq/',
            'http://difang.gmw.cn/hn/',
            'http://pic.gmw.cn/',
        ]

    def get(self, method):

        for i in self.result:
            if i not in self.news_list:
                self.news_list.append(i)
                flag = 1
                for http in self.http_list:
                    Response = requests.get(http + i, headers=self.headers)
                    if Response.status_code == 200:
                        print(i)
                        flag = 0
                        if method == 'xpath':
                            title, content, images = self.xpath_get(Response)
                        if method == 'bs4':
                            title, content, images = self.bs4_get(Response)
                        if title == None:
                            continue
                        dic = {
                            'title': title,
                            'content': content,
                            'images': images,
                        }
                        print(dic)
                        self.news_content_list.append(dic)
                        break

                if flag == 1:
                    print('失败-----------', i)
        return self.news_content_list

    def xpath_get(self, Response):
        html = etree.HTML(Response.content.decode())
        try:
            title = html.xpath(
                '//h1[@class="u-title"]/text() | //*[@id="articleTitle"]/text() | //h1[@id="conTitle"]/text()')[
                0].replace(' ', '').replace('\n', '').replace('\t','')
            content = ''.join(html.xpath(
                '//div[@class="con-text"]//p/text() | //div[@id="contentMain"]//p/text() | //div[@class="article_detail"]//p/text()')).replace(
                ' ', '').replace('\n', '').replace('\r', '').replace('\t','')
            images = html.xpath('//div[@class="con-text"]//img/@src | //div[@id="contentMain"]//img/@src')
            return title, content, images
        except:
            print('获取失败')
            return None, None, None

    def bs4_get(self, Response):

        soup = BeautifulSoup(Response.content.decode(), 'lxml')
        try:
            titles = soup.find('h1', class_='u-title')

            title = titles.string.replace(' ', '').replace('\n', '').replace('\r', '').replace('\t','')

            contents = soup.find_all('div', id="article_inbox" or "contentMain")
            images = contents[0].find_all('img')
            contents = contents[0].find_all('p')
            contents = [str(i.string) for i in contents]
            content = ''.join(contents).replace(' ', '').replace('\n', '').replace('\r', '').replace(
                'None', '').replace('\t','')
            images = [i['src'] for i in images]

            return title, content, images

        except:
            print('获取失败')
            return None, None, None

    def insert_mongoDB(self,dic=None):
        if dic:
            self.mongocol.insert(dic)
        else:
            for news in self.news_content_list:
                self.mongocol.insert(news)



dutu = News('http://sports.gmw.cn/')# 创建对象,传入url参数,url是频道的url
dutu.get('xpath')# 爬取数据,可选xpath或者bs4
dutu.insert_mongoDB() # 插入mongo

# zhuanti = News('http://topics.gmw.cn/')
# zhuanti.get('bs4')
# zhuanti.insert_mongoDB()
