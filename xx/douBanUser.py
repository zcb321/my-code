import requests,re
from lxml import etree
import pymysql



url_list = []
def get_info(url):
    url_list.append(url)
    response = requests.get(url)
    html = etree.HTML(response.text)
    try:
        nickname = html.xpath('//*[@id="db-usr-profile"]/div[2]/h1/text()')[0].replace(' ','').replace('\n','')
        ID = html.xpath('//*[@id="profile"]/div/div[2]/div[1]/div/div/text()')[0].replace(' ','').replace('\n','')
        join_date = html.xpath('//*[@id="profile"]/div/div[2]/div[1]/div/div/text()')[1].replace(' ','').replace('\n','')[:-2]
        follow_number = html.xpath('//*[@id="friend"]/h2/span/a/text()')[0].replace(' ','').replace('\n','')[2:]
        fans_number = html.xpath('//*[@id="content"]/div/div[2]/p[1]/a/text()')[0]
        pattern = re.compile('\d+', re.S)
        fans_number = re.findall(pattern, fans_number)[0]
        follow_url = html.xpath('//*[@id="friend"]//dl/dt/a/@href')
        print(nickname,ID,join_date,follow_number,fans_number,response.url)
        for i in follow_url:
            if i in url_list:
                return None
            else:
                get_info(i)

    except:
        pass

url = 'https://www.douban.com/people/zhangjiawei/'
get_info(url)













