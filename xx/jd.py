# pip3 install lxml (Besutifulsoup4)
# pip3 install requests
import requests
import re,json
from requests.exceptions import HTTPError,Timeout,RequestException,ProxyError,ConnectTimeout
from concurrent.futures import ThreadPoolExecutor
import csv,pymysql,threading

class JdSpider(object):

    def __init__(self,start_url):
        #设置商品url地址
        self.start_url = start_url
        #创建csv文件（csv忘记的查看课件1-6）
        self.csv_file = open('jd.csv','a+')
        fileNames = ['nickname','content']
        #创建csv文件句柄
        self.writer = csv.DictWriter(self.csv_file,fieldnames=fileNames)
        #写入csv文件头部
        self.writer.writeheader()
        #创建数据库链接
        self.mysql_client = pymysql.Connect(
            host='127.0.0.1', user='root', password="ljh1314",
            database='class1808', port=3306,charset='utf8'
        )
        #创建游标
        self.cursor = self.mysql_client.cursor()

        # # 实例化一个lock（互斥锁）
        self.myLock = threading.Lock()

        self.satrt_request(self.start_url)

    def satrt_request(self,start_url):
        # https://sclub.jd.com/comment/productPageComments.action?
        # callback=&productId=5089253
        # &score=0&sortType=5&page=0&pageSize=10&isShadowSku=0
        # &fold=1

        #获取商品的id
        prodect_id = re.search('\d+',start_url).group()
        firstComUrl = "https://sclub.jd.com/comment/productPageComments.action?callback=&productId=%s&score=0&sortType=5&page=0&pageSize=10&isShadowSku=0&fold=1" % prodect_id
        response_text = self.send_request(firstComUrl)
        if response_text:
            # print('获取到了数据',response_text)
            json_data = json.loads(response_text)
            #获取能请求评论的最大页码数量
            maxPage = int(json_data['maxPage'])
            print('能够获取的最大页码数量',maxPage)
            #将任务添加线程池中
            pool = ThreadPoolExecutor(10)
            for page in range(maxPage):
                comUrl = "https://sclub.jd.com/comment/productPageComments.action?callback=&productId=%s&score=0&sortType=5&page=%s&pageSize=10&isShadowSku=0&fold=1" % (prodect_id,str(page))
                result = pool.submit(self.send_request,comUrl)
                result.add_done_callback(self.parse_comments)
            pool.shutdown()
    

    def send_request(self,url,headers={'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'}):
        try:
            response = requests.get(url,headers=headers,timeout=10)
            
            if response.status_code == 200:
                print('请求成功',response.status_code)
                return response.text
        except (HTTPError,Timeout,RequestException,ProxyError,ConnectTimeout) as err:
            print(err)
            return None

    def parse_comments(self,future):
        response_text = future.result()
        if response_text:
            #解析数据
            comments = json.loads(response_text)['comments']
            
            for comment in comments:
                commentInfo = {}
                #姓名
                commentInfo['nickname'] = comment['nickname']
                #内容
                commentInfo['content'] = comment['content']
                #其他数据依次获取

                #存储数据
                self.save_db_to_csv(commentInfo)
                self.save_db_to_db(commentInfo)
            
    
    def save_db_to_db(self,commentInfo):
        #将数据写入数据库
        
        sql = """
        INSERT INTO jingdong (%s)
        VALUES (%s)
        """ % (','.join(commentInfo.keys()),','.join(['%s']*len(commentInfo)))
        print(sql,list(commentInfo.values()))
        #python中线程安全，
        # 加锁
        print(self.myLock)
        self.myLock.acquire()
        try:
            self.cursor.execute(sql,list(commentInfo.values()))
            self.mysql_client.commit()
            print('插入数据成功')
        except Exception as err:
            self.mysql_client.rollback()
            print(err)
        # 解锁
        self.myLock.release()


    def save_db_to_csv(self,commentInfo):
        #将数据写入csv文件
        self.writer.writerow(commentInfo)
                


if __name__ == "__main__":
    start_url = 'https://item.jd.com/5089253.html'
    jdSpider = JdSpider(start_url)

    
    