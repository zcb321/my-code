import requests, re
from lxml import etree
from bs4 import BeautifulSoup


# 国际频道url
world_url = 'http://world.gmw.cn/'
# 地方频道url
difang_url = 'http://difang.gmw.cn/'

# 对两个频道发起请求
world_response = requests.get(world_url)
difang_response = requests.get(difang_url)


# 用正则匹配出每个新闻的url
pattern = re.compile('(\d{4}-\d{2}/\d{2}/content_\d+\.htm)', re.S)
world_result = re.findall(pattern, world_response.content.decode())
difang_result = re.findall(pattern, difang_response.content.decode())


# --------------这些是可能出现的url格式-----------------
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


# 把不同的格式存进列表,没有写全,写全运行太慢了,看到效果就行
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

# 定义新闻列表,防止重复获取
news_list = []


# 开始遍历国际url
for i in world_result:
    # 如果不在新闻列表就开始获取
    if i not in news_list:
        news_list.append(i)# 把已经获取过的url存进新闻列表
        flag = 1 # 定义flag,后面判断是否请求成功
        for http in http_list: # 遍历url格式列表
            worldResponse = requests.get(http + i) # 依次拼接url
            if worldResponse.status_code == 200: # 直到请求成功,开始获取内容
                flag = 0 # 请求成功后flag变为0
                html = etree.HTML(worldResponse.content.decode()) # 创建xpath对象
                # 获取 title  (任意class为u-title 或者 id为articleTitle的h1标签,把多余的空格,符号换为空字符)
                title = html.xpath('//h1[@class="u-title"]/text() | //h1[@id="articleTitle"]/text()')[0].replace(' ', '').replace('\n', '')
                # 获取 content (class="con-text"或者id="contentMain"的div标签下的所有p标签的文字内容,再用空字符串拼接,把多余的空格,符号换为空字符)
                content = ''.join(html.xpath('//div[@class="con-text"]//p/text() | //div[@id="contentMain"]//p/text()')).replace(' ', '').replace('\n','').replace('\r', '')
                # 图片在content里,所以直接把p标签改成img标签,获取它的src属性
                images = html.xpath('//div[@class="con-text"]//img/@src | //div[@id="contentMain"]//img/@src')

                # 打印这三条数据
                print(title)
                print( content)
                print(images)
                break
        if flag == 1: # 如果flag最后等于1,说明所有格式都不正确或者网页status_code为404
            print('失败-----------', i)

for j in difang_result:# 开始遍历地方url
    if j not in news_list: # 如果不在新闻列表就开始获取
        news_list.append(j) # 把已经获取过的url存进新闻列表
        flag = 1 # 定义flag,后面判断是否请求成功
        for http in http_list: # 遍历url格式列表
            difangResponse = requests.get(http + j) # 依次拼接url
            if difangResponse.status_code == 200: # 直到请求成功,开始获取内容
                flag = 0  # 请求成功后flag变为0
                soup = BeautifulSoup(difangResponse.content.decode(),'lxml') # 创建bs4的对象
                titles = soup.find('h1',class_ ='u-title') # titles为class="u-title"的h1标签
                if titles: # 如果获取到,就提取h1标签的文字内容,把多余的空格,符号换为空字符
                    title = titles.string.replace(' ', '').replace('\n','').replace('\r', '')
                else:# 如果没获取到就跳过,地方频道有时候会有请求成功但网页显示404的情况出现
                    continue
                contents = soup.find_all('div',id="article_inbox" or "contentMain") # 内容是class="con-text"或者id="contentMain"的div标签
                if contents: #如果有,就开始获取
                    images = contents[0].find_all('img') # 先获取图片的img标签
                    contents = contents[0].find_all('p') # 获取内容的p标签
                    contents = [str(i.string) for i in contents] # 获取所有p标签里的文字内容
                    content = ''.join(contents).replace(' ', '').replace('\n','').replace('\r', '').replace('None','') # 用空字符串拼接,把多余的空格,符号换为空字符
                    images = [i['src'] for i in images] # 将所有img标签的src放入列表
                else:
                    continue

                # 打印三条数据
                print(title)
                print(content)
                print(images)
                break
        if flag == 1:
            print('失败------------', j)

# 最后打印国际内容的长度和地方内容的长度
print(len(world_result), len(difang_result))
