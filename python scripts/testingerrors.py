# %%
from selenium import webdriver
# %%
driver = webdriver.Chrome('chromedriver.exe')
# %%
from selenium import webdriver
from http_request_randomizer.requests.proxy.requestProxy import RequestProxy

req_proxy = RequestProxy()
proxies = req_proxy.get_proxy_list()    

brasa = [proxy for proxy in proxies if proxy.country == 'Brazil']

random = np.random.randint(0, 30)
PROXY = brasa[random].get_address()
    
webdriver.DesiredCapabilities.CHROME['proxy']={
    "httpProxy":PROXY,
    "ftpProxy":PROXY,
    "sslProxy":PROXY,
    "proxyType":"MANUAL",
    }

# %%
driver = webdriver.Chrome()
driver.get('https://www.indeed.com/jobs?q=fdjask%3Bfj&l=Idaho')
# %%
import numpy as np
# %%
