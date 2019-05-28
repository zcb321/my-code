import requests, random, datetime
from lxml import etree
from lxml.html import tostring
import pymysql
import time
import re
import json
from requests.adapters import HTTPAdapter
from PIL import Image
from resizeimage import resizeimage

# 设置重连次数
requests.session().mount('http://', HTTPAdapter(max_retries=3))
requests.session().mount('https://', HTTPAdapter(max_retries=3))

# ---------------------连接数据库-----------------

conn = pymysql.connect('localhost', 'root', '199888', 'leshop', charset="utf8", use_unicode=True)
cursor = conn.cursor()


# 插入数据库----------------

def insertDB(dic, table_name):
    # -----创建字段名称列表----
    key = [k for k in dic.keys()]

    # --------创建数据列表----------
    values = []
    for v in dic.values():
        # ---如果是数字,改成字符串
        if isinstance(v, int) or isinstance(v, float):
            values.append(str(v))
        # ---如果是空,就改为null
        elif v == None:
            values.append('null')
        # ---其他全部添加一对双引号
        else:
            values.append('"' + str(v) + '"')

    # ---创建sql语句
    sql = '''insert into %s(%s) value(%s) ''' % (
        table_name, ','.join(key), ','.join(values))

    # ---执行并提交
    cursor.execute(sql)
    conn.commit()

    print('插入' + table_name + '成功')


# 查询父级类ID
def selectDB(code, super_type):
    table_name = 'goods_goodscategory'
    # ---创建sql语句
    sql = '''select id from {} where code = "{}" and category_type = {}'''.format(table_name, code, super_type)
    # ---执行
    type_id = cursor.execute(sql)
    # ---从查询到的数据里取出一条
    type_id = cursor.fetchone()

    return int(type_id[0])


# 查询商品id
def selectGoodsId(sn):
    table_name = 'goods_goods'
    # ---创建sql语句
    sql = '''select id from {} where goods_sn = "{}"'''.format(table_name, sn)
    # ---执行
    type_id = cursor.execute(sql)
    # ---从查询到的数据里取出一条
    type_id = cursor.fetchone()

    return int(type_id[0])


url = 'https://www.benlai.com/'
qwe = requests.get(url)
html = etree.HTML(qwe.text)

# 获取分类列表
type_list = html.xpath('//*[@id="headerView"]/div[4]/div/div[1]/div[2]//dl/dd/div/ul//li/div[2]//em/a/@href')
type_list2 = []

# ------准确获取url-------

for i in type_list:
    type_list2.append('http://' + i[2:])

try:
    response = requests.get(type_list[0])
except:
    type_list = type_list2

print(type_list)

# 定义分类列表,防止重复添加
types = []
x = 0

# ------因为礼品礼盒重复,单独插入礼品礼盒一级分类-----

sql = '''select * from goods_goodscategory'''

info = cursor.execute(sql)
isnone = cursor.fetchone()
if isnone == None:
    dic = {
        'name': '礼品礼盒',
        'code': '礼品礼盒',
        'goods_desc': '礼品礼盒',
        'parent_category_id': None,
        'category_type': 1,
        'is_tab': 0,
        'add_time': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    }
    insertDB(dic, 'goods_goodscategory')

# 遍历每个3级分类

for type_url in type_list:
    list_response = requests.get(type_url,timeout=10)
    list_html = etree.HTML(list_response.text)
    # 获取一级分类
    one_type = list_html.xpath('//*[@id="ListBox"]/div[1]/a[2]/text()')[0]
    # 获取二级分类
    two_types = list_html.xpath('//*[@id="ListBox"]/div[1]/a[3]/text()')[0]
    two_type = one_type + '_' + list_html.xpath('//*[@id="ListBox"]/div[1]/a[3]/text()')[0]
    # 获取三级分类
    type = list_html.xpath('//*[@id="ListBox"]/div[1]/a[4]/text()')[0]
    print(one_type, two_type, type)
    # 判断是否存在,如果不存在,就添加
    if one_type not in types:
        name = one_type
        code = one_type
        goods_desc = one_type
        category_type = 1
        parent_category_id = None
        is_tab = 0
        add_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        dic = {
            'name': name,
            'code': code,
            'goods_desc': goods_desc,
            'parent_category_id': parent_category_id,
            'category_type': category_type,
            'is_tab': is_tab,
            'add_time': add_time
        }
        insertDB(dic, 'goods_goodscategory')
        types.append(one_type)
    # 同一级分类
    if two_type not in types:
        name = two_types
        code = two_type
        goods_desc = two_type
        category_type = 2
        parent_category_id = selectDB(one_type, 1)
        is_tab = 0
        add_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        dic = {
            'name': name,
            'code': code,
            'goods_desc': goods_desc,
            'category_type': category_type,
            'parent_category_id': parent_category_id,
            'is_tab': is_tab,
            'add_time': add_time
        }
        insertDB(dic, 'goods_goodscategory')
        types.append(two_type)
    # 同上
    if type not in types:
        name = type
        code = type
        goods_desc = type
        category_type = 3
        parent_category_id = selectDB(two_type, 2)
        is_tab = 0
        add_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        dic = {
            'name': name,
            'code': code,
            'goods_desc': goods_desc,
            'category_type': category_type,
            'parent_category_id': parent_category_id,
            'is_tab': is_tab,
            'add_time': add_time
        }
        insertDB(dic, 'goods_goodscategory')
        types.append(type)
    else:
        continue
    # 获取页数
    end_page = int(list_html.xpath('//p[@data-type="PageSelectNum"]/text()')[0][1:])

    try:
        # 分页爬去商品详情
        if end_page == 0:
            print('此分类无商品')
        else:
            # https://www.benlai.com/list-43-2232-3396.html
            print(type_url)
            # 正则取出分类ID
            pattern = "list-(\d+)-(\d+)-(\d+)"
            c_num = re.search(pattern, type_url, flags=0)

            # 生成post请求参数
            data = {
                'c1': c_num.group(1),
                'c2': c_num.group(2),
                'c3': c_num.group(3),
                'sort': 0,
                'Page': 1,
                '__RequestVerificationToken': 'AgUAxh9vkXPkrwTS+rfHvjQGkqhDvrfcqCAb+lUltvG5RpQKelXo+ulVlu6TFarqVclap7fH2BI4OKohLME/IC4RTkMJIL28Ta8Qg/9u6ZI7d68dyUWftqIf0OFbRtTLIKIG1w=='
            }
            # 获取商品信息(返回json数据)
            response = requests.post('https://www.benlai.com/NewCategory/GetLuceneProduct?_=1552307547565', data=data,
                                     timeout=5)
            goods_info_dic = json.loads(response.text)
            # 找到商品信息列表
            goods_info_list = goods_info_dic["ProductList"]
            if len(goods_info_list) > 1:
                goods_info_list = goods_info_list[:2]
            # 遍历并生成信息
            for goods in goods_info_list:
                category_id = selectDB(type, 3)
                goods_sn = goods["ProductID"]
                name = goods["ProductName"]
                click_num = random.randint(10, 100)
                sold_num = random.randint(1, click_num)
                fav_num = random.randint(1, sold_num)
                goods_num = random.randint(100, 1000)
                market_price = goods["ProductOldPrice"]
                shop_price = goods["ProductNowPrice"]
                goods_brief = goods["ProductPromotionWord"]
                ship_free = random.randint(0, 1)
                is_new = random.randint(0, 1)
                is_hot = random.randint(0, 1)
                add_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
                goods_url = goods["ProductLink"]
                goods_info = requests.get(goods_url,timeout=10)
                goods_html = etree.HTML(goods_info.text)
                goods_desc_img = goods_html.xpath('//*[@id="_ProductDetails"]/div[8]/div[6]/div//img/@lazyload')
                # 商品信息图片单独获取
                print('正在下载商品信息图片')
                x = 0
                src_list = []
                # 下载图片
                for i in set(goods_desc_img):
                    x += 1
                    print(i)
                    try:
                        image_response = requests.get(i,timeout=10)
                    except:
                        i = 'https:' + i
                        image_response = requests.get(i,timeout=10)
                    goods_desc_img_name = 'goods/images/{}_desc{}.jpg'.format(name.replace('/', '每'), x)
                    src_list.append(goods_desc_img_name)
                    with open(goods_desc_img_name, 'wb') as img:
                        img.write(image_response.content)
                    # 将图片宽度修改为928
                    try:
                        with open(goods_desc_img_name, 'r+b') as f:
                            print('正在修改图片大小')
                            with Image.open(f) as image:
                                cover = resizeimage.resize_width(image, 928)
                                cover.save(goods_desc_img_name, image.format)
                    except:
                        print('图片太小,不修改--')
                print('详情图片下载完成')

                # 拼接goods_desc
                desc_text = ''
                for n in src_list:
                    desc_text = desc_text + "<p><img src='http://127.0.0.1:8000/media/" + n + "' title='' alt='2.jpg'/></p>"
                goods_desc = desc_text
                front_image_url = goods["ProductImageLink"]
                # -----删除多余请求,请求太多会报错
                requests.keep_alive = False
                # 爬取封面图片
                image = requests.get(front_image_url,timeout=10)
                goods_front_image = 'goods/images/{}.jpg'.format(name.replace('/', '每'))
                with open(goods_front_image, 'wb') as file:
                    print('正在下载封面')
                    file.write(image.content)
                print('封面下载完成')
                # 生成商品详情字典
                goods_dic = {
                    'category_id': category_id,
                    'goods_sn': goods_sn,
                    'name': name,
                    'click_num': click_num,
                    'sold_num': sold_num,
                    'fav_num': fav_num,
                    'goods_num': goods_num,
                    'market_price': market_price,
                    'shop_price': shop_price,
                    'goods_brief': goods_brief,
                    'ship_free': ship_free,
                    'is_new': is_new,
                    'is_hot': is_hot,
                    'add_time': add_time,
                    'goods_front_image': goods_front_image,
                    'goods_desc': goods_desc,
                }
                insertDB(goods_dic, 'goods_goods')
                image_url_list = goods_html.xpath('//*[@id="smallPic"]//div[@style="display:none"]/text()')
                # 爬取商品轮播图.                x = 0
                print('正在下载商品图片')
                for i in set(image_url_list):
                    x += 1
                    image_response = requests.get(i,timeout=10)
                    image_name = 'goods/images/{}{}.jpg'.format(name.replace('/', '每'), x)
                    with open(image_name, 'wb') as img:
                        img.write(image_response.content)
                    image_dict = {
                        'goods_id': selectGoodsId(goods_sn),
                        'image': image_name,
                        'add_time': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
                    }
                    insertDB(image_dict, 'goods_goodsimage')
                print('商品图片下载完成')


    except:
        print('请求失败-------------------------------------------')
