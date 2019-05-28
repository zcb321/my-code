import random



try:
    big_li = []
    while True:
        li = []
        flag = 0
        for i in range(7):
            while True:
                if i == 6:
                    num = random.randint(1,16)
                else:
                    num = random.randint(1,33)
                if num not in li:
                    li.append(num)
                    break
        for list in big_li:
            if li[:6] == list[:6]:
                flag = 1
                raise Exception('前六位有重复')
            else:
                big_li.append(li)
        print(li)
        if len(set(li)) != len(li):
            flag = 1
            raise Exception('数字重复')
        elif li[6] > 16:
            flag = 1
            raise Exception('第七位大于16')
        for j in li:
            if j < 1 or j > 33:
                flag = 1
                raise Exception('数字不在范围内')
            elif isinstance(j,int) == False:
                flag = 1
                raise Exception('数字不是整数')

        if flag == 1:
            break
except Exception as erro:
    print(erro)



















