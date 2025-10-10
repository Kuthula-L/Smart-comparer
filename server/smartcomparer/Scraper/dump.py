# parent = main_containter.query_selector(":scope > :last-child").query_selector(":scope > :first-child")
    # elements = parent.query_selector_all("*")
    # if main_container:
        # last_of_last = main_container.query_selector(":scope > :last-child")
        # print(main_container.get_attribute("class"))
        # print(last_of_last.get_attribute("class"))
        # if last_of_last:
            # parent = last_of_last.query_selector(":scope > *")
            # print(parent)
        #     if parent:
        #         elements = parent.query_selector_all(":scope > *")  # direct children
        #         # for el in elements:
        #         #    data.append(1)
        
    
    # page.keyboard("Enter")
    # page.fill("input[placeholder*='Search']", "bread")
    # page.wait_for_selector("form#search-form", timeout=30000)   # replace with the real form selector

    # Fill the input inside that form and press Enter in that input
    # page.fill("form#search-form input[placeholder*='Search']", "bread")
    # page.press("form#search-form input[placeholder*='Search']", "Enter")

    # page.wait_for_load_state("networkidle")
    
    # print(page.title())
    # page.fill("input[placeholder='Search products and brands']", "bread")
    # page.press("input[placeholder='Search products and brands']", "Enter")
    # page.click('[aria-label="Open Product List"]')
    # aria-label="Open Product List"
    # page.keyboard.press("Enter")
    
    # # elements = page.query_selector_all('[class="container"]')
    
    # price-display_price-text__r_Pay  product-card_product-price___sw_8
    # print(Rowcontainer.query_selector(":scope > :first-child").get_attribute("class"))
    # elements = Rowcontainer.query_selector_all(":scope >*")
    # links = Rowcontainer.query_selector_all(":scope a")
    
    # for i in range(0,len(elements)):
    #     p_elements = elements[i].query_selector_all(":scope p")
    #     print(p_elements[0])
        
    # for i in range(len(elements)):
    #     item = elements[i].query_selector_all(":scope p")
    #     price = elements[i].query_selector(":scope .price-display_price-text__r_Pay.product-card_product-price___sw_8")
     
        
    #     if price and item:
         
    #         items2.append([price.text_content(), item[1].text_content()])
        
        # if itemParent:  # make sure there is at least one <p>
        
    # p_elements.insert(0,links[0])
    
    # for el in links:
    #     print(el.get_attribute("href"))
    #     arr.append(el.get_attribute("href"))
    # page.screenshot(path="search_results.png")
    
    # p_elements[5].text_content()
    
    # n = 0
    # for i in range(0, len(p_elements), 3):  # step 3 each time
    #     group = p_elements[i:i+2]  # take 2 items
    #     if len(group) == 2:        # make sure we actually have 2
    #         items2.append([el.text_content() for el in group])
    

    # for i in range(0, len(p_elements)):
    
        
        # items2.append([p_elements[i-2].text_content(),p_elements[i-1].text_content(),i])
        
        # el = p_elements[i].text_content()
        # if n == 2:
        #     n=0
        # else:
        #     print(str(p_elements[i].text_content())+"\n")
            # n+=1
            # items2.append([p_elements[i-2].text_content(),p_elements[i-1].text_content(),i])
            # items2.append(p_elements[i])
    
    
        # if i == len(p_elements)-2:
        #     break
        # if i%2!=0:
        #     items2.append([p_elements[i-1].text_content(),p_elements[i].text_content(),i])
            
        # n+=1
            
        
    
            # items += " "
        # else:
        #     items += str(el.text_content())
# 8-9 AM
    # ls = items.split("")


  # for i in range(0,len(elements)):
    #     p_elements = elements[i].query_selector_all(":scope p")
    #     print(p_elements[0])
    # price-display_price-text__r_Pay  product-card_product-price___sw_8
    # print(Rowcontainer.query_selector(":scope > :first-child").get_attribute("class"))
    
    
# code that could be usefull
    # arr = []
# items = ''
# items2 = []

# with sync_playwright() as p:
#     browser = p.chromium.launch()
#     context = browser.new_context(
#         extra_http_headers={
#             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
#             'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
#             'Accept-Language': 'en-US,en;q=0.5',
#             'Accept-Encoding': 'gzip, deflate',
#             'Referer': 'https://google.com/',
#             'Custom-Header': 'YourValue'
#         }
#     )
    
#     # example with spaces https://www.checkers.co.za/search?Search=pineaclata%20with%20some%20aile
#     page = context.new_page()
#     page.goto("https://www.checkers.co.za/search?Search=bread")
    
#     data = []
#     page.wait_for_selector('[class="container"]')
#     main_container = page.query_selector(".container > :last-child")
#     Rowcontainer = page.query_selector_all('div[class="row grow"]')[0]
#     elements = Rowcontainer.query_selector_all(":scope >*")
#     links = Rowcontainer.query_selector_all(":scope a")
    
  
        
#     for i in range(len(elements)):
#         item = elements[i].query_selector_all(":scope p")
#         link = elements[i].query_selector(":scope a")
#         price = elements[i].query_selector(":scope .price-display_price-text__r_Pay.product-card_product-price___sw_8")
     
#         if price and item and link:
#             items2.append([price.text_content(), item[1].text_content(), link.get_attribute("href")])
        
     
#     page.screenshot(path="search_results.png")
    
   
#     print(items2)
#     browser.close()


# response = supabase.table("test").select("*").eq("name", "me").execute()
# exists = check_row_exists("test", "name", "Test2")
# print(f"Row exists: {exists}")
# print(check_row_exists("test", "name", "me"))


# breadItems = Checkers("beans")
# breadItems.scrape()


# supabase.table("Cheackers").insert({"Product_name": products[0], "Price": products[1], "Img_unprocessed": products[2]}).execute()
# for i in range(5):  
#     value = random.randint(10, 20)
#     print(f'{value}s is the current time to wait')
#     time.sleep(value)


# for products in breadItems.data:
    
    
# print(breadItems.data)
# response = supabase.table("test").select("*").execute()
# print(response.data)
# 

    # file_path = os.path.join(os.path.dirname(__file__), filename)
        # with open("webp", "wb") as f:
        #     f.write(img.content)
        
# img = requests.get(url, headers=extra_http_headers)
    
    # filename = f"{product}.webp"
    # file_path = os.path.join(os.path.dirname(__file__), filename)
    # if img.status_code == 200:
        # with open("webp", "wb") as f:
        #     f.write("")


# data = fetchImgLinks("Cheackers", 0, 0)
# # if isinstance(data, dict) and "Img_unprocessed" in data:
# # if data:
#     # imgLink = data["Img_unprocessed"]
# product = data[0]["Product_name"]
# uuid = data[0]["uuid"]
# # uuid = data[0]["Img_unprocessed"]
# insertImgLink("Cheackers", "Img_processed", uuid,"")
# # print(data[0])





# print(fetchImgLinks("Cheackers", 0, 5))
# print(scraper("https://catalog.sixty60.co.za/v2/files/658166ea35077a1783fed44c?width=320&height=320", "bread"))

# addImgs()

# data = fetchImgLinks("Cheackers", 0, 0)
# # if isinstance(data, dict) and "Img_unprocessed" in data:
# # if data:
#     # imgLink = data["Img_unprocessed"]
# product = data[0]["Product_name"]
# uuid = data[0]["uuid"]
# # uuid = data[0]["Img_unprocessed"]
# insertImgLink("Cheackers", "Img_processed", uuid,"")
# # print(data[0])
# print(fetchImgLinks("Cheackers", 0, 5))
# print(scraper("https://catalog.sixty60.co.za/v2/files/658166ea35077a1783fed44c?width=320&height=320", "bread"))
# pnp = PicknPay("bread").scrape()
# pnp = Shoprite("bread").scrape()
# pnp = WoolWorths("bread").scrape()
