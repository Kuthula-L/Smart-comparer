from itertools import product
from playwright.sync_api import sync_playwright
import json

class allStores:  
    def __init__(self):
        self.playwright = sync_playwright().start()
        self.browser = self.playwright.chromium.launch()
        self.context = self.browser.new_context(
            # extra_http_headers={
            #     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            #     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            #     'Accept-Language': 'en-US,en;q=0.5',
            #     'Accept-Encoding': 'gzip, deflate',
            #     'Referer': 'https://google.com/',
            #     'Custom-Header': 'YourValue'
            # }
        )
        
        # example with spaces https://www.checkers.co.za/search?Search=pineaclata%20with%20some%20aile
        self.page = self.context.new_page()
    
    def close(self):
        self.browser.close()
        self.playwright.stop()   
          
    

class Checkers:
    def __init__(self, search):
        self.search = search
        self.data = []
        
    def scrape(self):
        with sync_playwright() as p:
            browser = p.chromium.launch()
            context = browser.new_context(
                extra_http_headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate',
                    'Referer': 'https://google.com/',
                    # 'Custom-Header': 'YourValue'
                }
            )
            
            # example with spaces https://www.checkers.co.za/search?Search=pineaclata%20with%20some%20aile
            page = context.new_page()
            page.goto(f"https://www.checkers.co.za/search?Search={self.search}", wait_until="networkidle")
            
        
            page.wait_for_selector('[class="container"]', timeout=60000)
            main_container = page.query_selector(".container > :last-child")
            Rowcontainer = page.query_selector_all('div[class="row grow"]')[0]
            elements = Rowcontainer.query_selector_all(":scope >*")
            links = Rowcontainer.query_selector_all(":scope a")
            
        
                
            for i in range(len(elements)):
                product = elements[i].query_selector_all(":scope p")
                link = elements[i].query_selector(":scope img")
                price = elements[i].query_selector(":scope .price-display_price-text__r_Pay.product-card_product-price___sw_8")
            
                if price and product and link:
                    self.data.append([product[1].text_content(),float(str(price.text_content())[1:]), link.get_attribute("src")])
                
            
            page.screenshot(path="search_results.png")
            browser.close()




class PicknPay:
    def __init__(self, search):
        self.search = search
        self.data = []

    def scrape(self):
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context()

            page = context.new_page()
            # page.goto(f"https://www.pnp.co.za", wait_until="networkidle")
            page.goto(f"https://www.pnp.co.za/search/{self.search}", wait_until="domcontentloaded")
            # page.wait_for_selector('[class="cx-product-container--grid ml-0 mr-0 ng-star-inserted"]', timeout=10000)
            page.wait_for_timeout(10000)
            # page.wait_for_selector('div.main-wrapper', timeout=10000)
            productContainers = page.query_selector_all('ui-product-grid-item')
            
            try:
                for product in productContainers:
                    if product:
                        productName = product.query_selector(":scope div").get_attribute("data-cnstrc-item-name")
                        ProductPrice = product.query_selector(":scope div").get_attribute("data-cnstrc-item-price")
                        productImg = product.query_selector(":scope div").query_selector(":scope a").get_attribute("href")
                        
                        self.data.append([productName, float(str(ProductPrice)), productImg])
        
                    # productChild = page.query_selector(":scope > :last-child")
                page.screenshot(path="search_results.png")
                
            except Exception as e:
                print(f"Skipping product due to error: {e}")
                
            
            browser.close()
            
            
            
class Shoprite:
    def __init__(self, search):
        self.search = search
        self.data = []

    def scrape(self):
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(extra_http_headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate',
                    'Referer': 'https://google.com/',
                    # 'Custom-Header': 'YourValue'
                })

            page = context.new_page()
            # page.goto(f"https://www.pnp.co.za", wait_until="networkidle")
            # page.goto(f"https://www.pnp.co.za/search/{self.search}", wait_until="domcontentloaded")
            page.goto(f"https://www.shoprite.co.za/search/all?q={self.search}", wait_until="domcontentloaded")
            # page.wait_for_selector('[class="cx-product-container--grid ml-0 mr-0 ng-star-inserted"]', timeout=10000)
            page.wait_for_timeout(10000)
            # page.wait_for_selector('div.main-wrapper', timeout=10000)
            productContainers = page.query_selector_all('[class *= "product-frame product-ga"]')
            # print(productContainers[0].get_attribute("data-product-ga"))
            # print(productContainers[0].get_attribute("data-product-ga"))
            
            try:
                for product in productContainers:
                    
                    if product:
                        productData = json.loads(str(product.get_attribute("data-product-ga")))
                        
                        
                        productName = productData["name"]
                        ProductPrice = productData["price"]
                        productImg = productData["product_image_url"]
                        
                        self.data.append([productName, float(str(ProductPrice)), productImg])
                        # print([productName, ProductPrice, productImg])
                page.screenshot(path="search_results.png")
                
            except Exception as e:
                print(f"Skipping product due to error: {e}")
                
                
            page.screenshot(path="search_results.png")
            browser.close()

class WoolWorths:
    def __init__(self, search):
        self.search = search
        self.data = []

    def scrape(self):
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context()

            page = context.new_page()
            # page.goto(f"https://www.woolworths.co.za/cat?Ntt={self.search}", wait_until="networkidle")
            page.goto(f"https://www.woolworths.co.za/cat?Ntt={self.search}", wait_until="domcontentloaded")
            page.wait_for_timeout(15000)
            # page.wait_for_selector('[class*="product-list__item"]', timeout=60000)
            productContainers = page.query_selector_all('[class="product-list__item"]')
            # print(productContainers[0].get_attribute("data-cnstrc-item-name"))
            
            try:
                for product in productContainers:
                    
                    if product:
         
                        productName = product.get_attribute("data-cnstrc-item-name")
                        ProductPrice = product.get_attribute("data-cnstrc-item-price")
                        productImg = product.query_selector("a").get_attribute("href")
                        
                        self.data.append([productName, float(str(ProductPrice)), productImg])
                        # print([productName, ProductPrice, productImg])
                page.screenshot(path="search_results.png")
                
            except Exception as e:
                print(f"Skipping product due to error: {e}")
                
                
            page.screenshot(path="search_results.png")
            browser.close()

