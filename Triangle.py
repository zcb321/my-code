import turtle
import math

def painting(line1,line2,line3):
    lines = [line1,line2,line3]
    horns = []
    horn1 = (line2**2+line3**2-line1**2)/(2*line2*line3)
    horn1 = math.acos(horn1)*180/math.pi
    horn2 = (line1**2+line3**2-line2**2)/(2*line1*line3)
    horn2 = math.acos(horn2)*180/math.pi
    horn3 = (line2**2+line1**2-line3**2)/(2*line2*line1)
    horn3 = math.acos(horn3)*180/math.pi
    horns.append(horn3)
    horns.append(horn1)
    horns.append(horn2)
    # turtle.begin_fill()
    for i in range(3):
        turtle.forward(lines[i]*50)
        turtle.right(180-horns[i])
    # turtle.end_fill()
    turtle.done()
    print(lines)
    print(horns)





line1 = input('输入第一边:')
line2 = input('输入第二边:')
line3 = input('输入第三边:')

try:
    line1 = float(line1)
    line2 = float(line2)
    line3 = float(line3)
    if line1 >= 0 and line2 >= 0 and line3 >= 0 and line1 + line2 > line3 and line1 + line3 > line2 and line3 + line2 > line1:
        painting(line1,line2,line3)
    else:
        print('无效边长')
except:
    print('无效边长')





