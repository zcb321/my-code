import pymysql
class pmysql(object):

    def __init__(self,dbname:str,password:str):


        self.conn = pymysql.connect('localhost', 'root', password, dbname, charset="utf8", use_unicode=True)
        self.scursor = self.conn.cursor()

    def insertDB(self,dic:dict,table_name:str):
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
        try:
            self.scursor.execute(sql)
            self.conn.commit()
            print('插入成功')
        except:
            self.conn.rollback()
            print('插入失败')


    def selectDB(self,tableName:str,looks:list = '*',items :dict = None,one = False):
        if items == None:
            where = ''
        elif len(items) == 1:
            where = 'where {}="{}"'.format(list(items.keys())[0],list(items.values())[0])
        else:
            where = 'where '
            for k,v in items.items():
                where = where +  '{}="{}" and '
            where = where[:-4]
        if looks == '*':
            look = looks
        else:
            look = ','.join(looks)

        sql = '''select {} from {}'''.format(look,tableName) + where
        item = self.cursor.execute(sql)
        item = self.cursor.fetchall()
        if one:
            return item[-1]
        return item


if __name__ == '__main__':
    print('aaa')