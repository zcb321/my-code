import requests, re
from lxml import etree
from bs4 import BeautifulSoup


mil_url = 'http://mil.gmw.cn/'
legal_url = 'http://legal.gmw.cn/'

mil_response = requests.get(mil_url)
legal_response = requests.get(legal_url)


pattern = re.compile('(\d{4}-\d{2}/\d{2}/content_\d+\.htm)', re.S)
mil_result = re.findall(pattern, mil_response.content.decode())
legal_result = re.findall(pattern, legal_response.content.decode())


# http://culture.gmw.cn/2019-03/26/content_32680259.htm
# http://tech.gmw.cn/2019-03/26/content_32679575.htm
# http://sports.gmw.cn/2019-03/26/content_32679350.htm
# http://edu.gmw.cn/2019-03/26/content_32678430.htm
# http://politics.gmw.cn/2019-03/26/content_32678251.htm
# http://guancha.gmw.cn/2019-03/26/content_32680862.htm
# http://news.gmw.cn/2019-03/26/content_32679556.htm
# http://legal.gmw.cn/2019-03/26/content_32678932.htm
# http://e.gmw.cn/2019-03/26/content_32680493.htm
# http://world.gmw.cn/2019-03/26/content_32678586.htm
# http://photo.gmw.cn/2019-03/26/content_32678887.htm
# http://mil.gmw.cn/2019-03/26/content_32678471.htm
# http://mil.gmw.cn/2019-03/26/content_32678420.htm
# http://health.gmw.cn/2019-03/26/content_32676213.htm
# http://difang.gmw.cn/2019-03/14/content_32640151.htm
# http://difang.gmw.cn/cq/2019-02/26/content_32565098.htm
# http://difang.gmw.cn/hn/2019-03/21/content_32661481.htm


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
]

news_list = []


for i in mil_result:
    if i not in news_list:
        news_list.append(i)
        flag = 1
        for http in http_list:
            milResponse = requests.get(http + i)
            if milResponse.status_code == 200:
                flag = 0
                html = etree.HTML(milResponse.content.decode())
                title = html.xpath('//h1[@class="u-title"]/text() | //h1[@id="articleTitle"]/text()')[0].replace(' ', '').replace('\n', '')
                content = ''.join(html.xpath('//div[@class="con-text"]//p/text() | //div[@id="contentMain"]//p/text()')).replace(' ', '').replace('\n','').replace('\r', '')
                images = html.xpath('//div[@class="con-text"]//img/@src | //div[@id="contentMain"]//img/@src')

                print(title)
                print( content)
                print(images)
                break
        if flag == 1:
            print('失败-----------', i)

for j in legal_result:
    if j not in news_list:
        news_list.append(j)
        flag = 1
        for http in http_list:
            legalResponse = requests.get(http + j)
            if legalResponse.status_code == 200:
                flag = 0
                soup = BeautifulSoup(legalResponse.content.decode(),'lxml')
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
                break
        if flag == 1:
            print('失败------------', j)

print(len(mil_result), len(legal_result))

