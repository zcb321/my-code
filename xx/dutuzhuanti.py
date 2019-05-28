import requests, re
from lxml import etree
from bs4 import BeautifulSoup
import pymongo

mongoConn = pymongo.MongoClient('mongodb://zcb:123@localhost:27017/')
db = mongoConn.guangming
col = db.news


headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
}
url1 = 'http://photo.gmw.cn/'
url2 = 'http://topics.gmw.cn/'

response1 = requests.get(url1)
response2 = requests.get(url2)


pattern = re.compile('(\d{4}-\d{2}/\d{2}/content_\d+\.htm)', re.S)
result1 = re.findall(pattern, response1.content.decode())
# http://topics.gmw.cn/node_121622.htm
zt_pattern = re.compile('(node_\d+\.htm)')
zt_result = re.findall(zt_pattern,response2.content.decode())
result2 = []
for i in zt_result:
    zt_response = requests.get('http://topics.gmw.cn/' + i,headers=headers)
    result2 = result2 + re.findall(pattern, zt_response.content.decode())




http_list = [
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

news_list = []




for i in result1:
    if i not in news_list:
        news_list.append(i)
        flag = 1
        for http in http_list:
            worldResponse = requests.get(http + i,headers=headers)
            if worldResponse.status_code == 200:
                print(i)
                flag = 0
                html = etree.HTML(worldResponse.content.decode())
                title = html.xpath('//h1[@class="u-title"]/text() | //*[@id="articleTitle"]/text() | //h1[@id="conTitle"]/text()')[0].replace(' ', '').replace('\n', '')
                content = ''.join(html.xpath('//div[@class="con-text"]//p/text() | //div[@id="contentMain"]//p/text() | //div[@class="article_detail"]//p/text()')).replace(' ', '').replace('\n','').replace('\r', '')
                images = html.xpath('//div[@class="con-text"]//img/@src | //div[@id="contentMain"]//img/@src')
                print(title)
                print( content)
                print(images)
                dic = {
                    'title': title,
                    'content': content,
                    'images': images
                }
                a = col.insert(dic)
                print(a)
                break
        if flag == 1:
            print('失败-----------', i)

for j in result2:
    if j not in news_list:
        news_list.append(j)
        flag = 1
        for http in http_list:
            difangResponse = requests.get(http + j,headers=headers)
            if difangResponse.status_code == 200:
                flag = 0
                soup = BeautifulSoup(difangResponse.content.decode(),'lxml')
                titles = soup.find('h1',class_ ='u-title')
                if titles:
                    title = titles.string.replace(' ', '').replace('\n','').replace('\r', '')
                else:
                    continue
                contents = soup.find_all('div',id="article_inbox" or "contentMain")
                if contents:
                    images = contents[0].find_all('img')
                    contents = contents[0].find_all('p')
                    contents = [str(i.string) for i in contents]
                    content = ''.join(contents).replace(' ', '').replace('\n','').replace('\r', '').replace('None','')
                    images = [i['src'] for i in images]
                else:
                    continue

                print(title)
                print(content)
                print(images)
                dic = {
                    'title':title,
                    'content':content,
                    'images':images
                }
                col.insert(dic)
                break
        if flag == 1:
            print('失败------------', j)



print(len(news_list))

