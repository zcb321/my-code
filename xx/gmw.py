import requests
import re
from lxml import etree



newsResponse = requests.get('http://e.gmw.cn/2019-03/26/content_32680493.htm')

html = etree.HTML(newsResponse.content.decode())
title = html.xpath('//h1[@class="u-title"]/text()')[0].replace(' ','').replace('\n','')
content = ''.join(html.xpath('//div[@class="con-text"]//text()')).replace(' ','').replace('\n','').replace('\r','')
print(title)
print(content)