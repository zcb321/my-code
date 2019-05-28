import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

url = 'http://127.0.0.1:8080/zentao/user-login.html'
driver = webdriver.Chrome(executable_path='/home/zcb/Downloads/chromedriver')
driver.get(url)

time.sleep(1)
driver.find_element_by_xpath('//*[@id="account"]').send_keys("admin")
driver.find_element_by_xpath('//*[@id="loginPanel"]/div/div[2]/form/table/tbody/tr[2]/td/input').send_keys("zcb981118..")
time.sleep(1)
driver.find_element_by_class_name("btn-primary").click()
time.sleep(1)
driver.find_element_by_xpath('//*[@id="navbar"]/ul/li[9]/a').click()
time.sleep(1)
driver.find_element_by_xpath('//*[@id="mainMenu"]/div[3]/a[2]').click()
driver.find_element_by_xpath('//*[@id="account"]').send_keys('ahh')
driver.find_element_by_xpath('//*[@id="password1"]').send_keys('qwaszx123')
time.sleep(1)
driver.find_element_by_xpath('//*[@id="password2"]').send_keys('qwaszx123')
driver.find_element_by_xpath('//*[@id="realname"]').send_keys('如花')
time.sleep(1)
driver.find_element_by_xpath('//*[@id="role"]').click()
driver.find_element_by_xpath('//*[@id="role"]/option[4]').click()
time.sleep(1)
driver.find_element_by_xpath('//*[@id="email"]').send_keys('302738630@qq.com')
driver.find_element_by_xpath('//*[@id="genderf"]').click()
driver.find_element_by_xpath('//*[@id="verifyPassword"]').send_keys('zcb981118..')
time.sleep(1)
driver.find_element_by_xpath('//*[@id="submit"]').click()