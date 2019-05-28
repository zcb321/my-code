import time
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

stu_code = 193321059
pwd = 'zcb981118..'

web = webdriver.Chrome()

web.get(
    'https://biptjx.xuetangx.com/?redirect=%2Flms%23%2Fvideo%2F9896%2F15053%2Fab590f2a-a271-477b-bfe5-a09afecbb5cf%2F5670%2F0%2FvideoDiscussion#/home')

web.find_element_by_xpath('/html/body/div[1]/div[1]/div[1]/div/div/div[3]/ul/li/a')
time.sleep(5)
web.find_element_by_xpath('//*[@id="stu-code"]').send_keys(stu_code)
web.find_element_by_xpath('//*[@placeholder="请输入密码/初始密码"]').send_keys(pwd)
login = web.find_element_by_xpath('/html/body/div[1]/div[4]/div[2]/div[2]/button')

login.click()
time.sleep(3)
web.switch_to_window(web.window_handles[-1])
WebDriverWait(web, 30, 0.5).until(lambda web: web.find_element_by_xpath(
    "/html/body/div[1]/div[2]/div/div/div[2]/div/div/div/div/div/div[2]/div[2]/div/div[2]/ul/li[1]/a"))
web.find_element_by_xpath(
    '/html/body/div[1]/div[2]/div/div/div[2]/div/div/div/div/div/div[2]/div[2]/div/div[2]/ul/li[1]/a').click()
time.sleep(3)
web.switch_to_window(web.window_handles[-1])
WebDriverWait(web, 30, 0.5).until(lambda web: web.find_element_by_xpath(
    "/html/body/div[2]/div/div[2]/div/div[2]/div/div[1]/section[1]/ul/li[7]/div/span/span/span"))
web.find_element_by_xpath(
    '/html/body/div[2]/div/div[2]/div/div[2]/div/div[1]/section[1]/ul/li[7]/div/span/span/span').click()

while 1:
    time.sleep(3)
    web.switch_to_window(web.window_handles[-1])
    WebDriverWait(web, 30, 0.5).until(lambda web: web.find_element_by_xpath('//*[@id="continueStudy"]/section/a'))
    items = web.find_element_by_xpath('//*[@id="continueStudy"]/section/a').click()
    time.sleep(3)
    web.switch_to_window(web.window_handles[-1])
    WebDriverWait(web, 30, 0.5).until(
        lambda web: web.find_element_by_xpath('//*[@id="video-box"]/div/div/div[1]/div[3]/div[1]'))
    web.find_element_by_xpath('//*[@id="video-box"]/div/div/div[1]/div[3]/div[1]').click()
    ele = web.find_element_by_xpath('//*[@id="video-box"]/div/div/div[1]/div[7]/div')

    ActionChains(web).move_to_element(ele).perform()

    web.find_element_by_xpath('//*[@id="video-box"]/div/div/div[1]/div[7]/ul/li[2]').click()

    time.sleep(1)

    ele2 = web.find_element_by_xpath('//*[@id="video-box"]/div/div/div[1]/div[5]/div')

    ActionChains(web).move_to_element(ele2).perform()

    web.find_element_by_xpath('//*[@id="video-box"]/div/div/div[1]/div[5]/ul/li[1]').click()
    while 1:
        time.sleep(5)
        ele3 = web.find_element_by_xpath('//*[@id="video-wrap"]/div[2]')
        ActionChains(web).move_to_element(ele2).perform()
        time.sleep(1)
        times = web.find_element_by_xpath('//*[@id="video-box"]/div/div/div[1]/div[2]/span[2]')
        times2 = web.find_element_by_xpath('//*[@id="video-box"]/div/div/div[1]/div[2]/span[1]')

        timess = times.text.split(':')
        timess2 = times2.text.split(':')
        print(timess)
        print(timess2)
        print(int(timess[0]) * 60 + int(timess[1]))
        print(int(timess2[0]) * 60 + int(timess2[1]))
        if int(timess[0]) * 60 + int(timess[1]):
            break
    while 1:
        ele3 = web.find_element_by_xpath('//*[@id="video-wrap"]/div[2]')
        ActionChains(web).move_to_element(ele2).perform()
        times = web.find_element_by_xpath('//*[@id="video-box"]/div/div/div[1]/div[2]/span[2]')
        times2 = web.find_element_by_xpath('//*[@id="video-box"]/div/div/div[1]/div[2]/span[1]')

        timess = times.text.split(':')
        timess2 = times2.text.split(':')
        print('\r' + times2.text + '/' + times.text,end='')
        if timess2 == timess:

            print('播放完毕')

            web.find_element_by_xpath('/html/body/div[2]/div/div[2]/div[1]/header/section').click()
            break
