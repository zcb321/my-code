import requests,re
from multiprocessing import Pool
from lxml import etree
import pymysql
count = []

new_urls = []
def addNewUrl(url,p):
    response = requests.get(url)
    pattern = re.compile('<a href="//(.*?\.zjol\.com\.cn/.*?\d*?\.shtml)"', re.S)
    result = re.findall(pattern, response.text)
    for j in result:
        if j not in new_urls:
            print('发起请求')
            j_response = requests.get('http://' + j)
            if j_response.status_code == 200:
                print('请求成功')

                try:
                    p.apply_async(func=runtest, args=(j_response,))
                    new_urls.append(j)
                except:
                    print('错误')
            else:
                print('请求失败')
    if result == []:
        return None
    return 1





def insertDB(dic, table_name):
    conn = pymysql.connect('localhost', 'root', '199888', 'NEW', charset="utf8", use_unicode=True)
    cursor = conn.cursor()
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
    cursor.execute(sql)
    conn.commit()
    cursor.close()
    conn.close()
    print('插入{}成功'.format(table_name))


def runtest(text):
    print('开始----------')
    html = etree.HTML(text.content)
    print('获取title')
    title = html.xpath('//title/text()')
    if title:
        title = title[0].replace('\n','').replace('\u3000','').replace(' ','').replace('"',"'")
    else:
        print('title出错')
        print(title, text.url)
    print('获取title成功')
    print('获取content')
    content_list = ['%'.join(html.xpath('//div[@class="contTxt"]//text()')),
                    '%'.join(html.xpath('//*[@class="artCon"]//text()')),
                    '%'.join(html.xpath('//div[@class="artical_real"]//text()')),
                    '%'.join(html.xpath('//div[@class="content cf"]//text()')),
                    '%'.join(html.xpath('//div[@class="content"]//text()')),
                    '%'.join(html.xpath('//div[@class="artCon mb55"]//text()')),
                    '%'.join(html.xpath('//div[@class="atricle_inner"]//text()')),
                    '%'.join(html.xpath('//div[@class="art-con mt-20"]//text()')),
                    ]
    for xpath in content_list:
        if xpath:
            content = xpath.replace('\n','').replace('\u3000','').replace(' ','').replace('"',"'")
            break
        else:
            pattern = re.compile('replace\("(.*?)"\)', re.S)
            result = re.findall(pattern, text.text)
            if result:
                print('进入二次获取')
                content_response = requests.get(result[0])
                content_html = etree.HTML(content_response.content)
                content = '%'.join(content_html.xpath('//*[@id="main"]/div/div[7]//text()'))
                print('二次获取成功')
                break
            else:
                print('进入深层url')
                content = addNewUrl(text.url,p)
                if content == 1:
                    print('深层获取成功')


    if content == None:
        print('conten错误')
        print(title,text.url)
    else:
        print('获取content成功')

        count.append('.')
        dict = {
            'title': title,
            'content': content
        }
        insertDB(dict, 'news')




url = 'http://www.zjol.com.cn/'

response = requests.get(url)

html = etree.HTML(response.text)

type_urls = html.xpath('/html/body/div[2]/div[2]/div/div/ul/li/a/@href')
# <a href="//py.zjol.com.cn/pyxw/201903/t20190319_9696487.shtml" target="_blank">
#                     水果能不能饭后吃？吃水果的8个真相
#                 </a>

p = Pool(200)



for type_url in type_urls:
    addNewUrl(type_url,p)


print(len(new_urls),'结束---------------------')
print(len(count))
p.close()
p.join()






















