import time
import requests
from playwright.sync_api import sync_playwright
from store_data import Checkers, Shoprite, WoolWorths
from store_data import PicknPay
from decouple import config
from supabase import Client, create_client
import time
import random
import boto3
import os
from io import BytesIO



key = config('SECRET_KEY')
url = config("URL")
supabase: Client = create_client(str(url), str(key))
s3 = boto3.client("s3")


# print(s3.list_buckets())
categories = [
    # Staples & Pantry Essentials
    "Maize Meal",
    "Rice",
    "Flour",
    "Sugar",
    "Salt",
    "Cooking Oil",
    "Baking Powder & Yeast",
    "Canned Goods",
    "Stock Cubes Sauces",
    "Instant Noodles Pasta",
    "Cereals Oats",
    "Tea Coffee",
    "Sugar Substitutes",

    # Proteins
    "Chicken",
    "Beef",
    "Pork",
    "Lamb",
    "Fish",
    "Eggs",

    # Vegetables & Fruits
    "Potatoes",
    "Onions",
    "Tomatoes",
    "Carrots Cabbage Spinach",
    "Pumpkin  Butternut",
    "Avocados",
    "Apples Bananas Oranges",
    "Grapes Pineapples Mangoes",
    "Lemons  Limes",

    # Dairy & Alternatives
    "Milk",
    "Cheese",
    "Yogurt",
    "Butter & Margarine",
    "Cream & Cream Cheese",

    # Bakery & Snacks
    "Bread",
    "Rusks",
    "Biscuits & Cookies",
    "Chips & Crisps",
    "Popcorn & Nuts",
    "Chocolate & Sweets",

    # Condiments & Spreads
    "Mrs. Ball’s Chutney",
    "All Gold Tomato Sauce",
    "Mayonnaise  Mustard",
    "Peanut Butter  Jam",
    "Pickles Relishes",
    "Olives  Antipasti",

    # Beverages
    "Fruit Juices",
    "Soft Drinks",
    "Bottled Water",
    "Sports Health Drinks",
    "Alcoholic Beverages",

    # Household & Personal Care
    "Cleaning Products",
    "Toiletries",
    "Laundry Supplies",
    "Disposable Items",

    # Frozen Foods
    "Frozen Vegetables",
    "Frozen Fruits",
    "Frozen Meals",
    "Ice Cream & Desserts"
]


def check_row_exists(table_name, column, value):
    response = supabase.table(table_name) \
        .select("*") \
        .eq(column, value) \
        .limit(1) \
        .execute()
    
    return len(response.data) > 0


def insert_products(store):
    for category in categories:
        catagoryItems = ""
        products = []
        
        match store:
            case "Checkers":
                catagoryItems = Checkers(category)
                catagoryItems.scrape()
                products = catagoryItems.data
            case "PicknPay":
                catagoryItems = PicknPay(category)
                catagoryItems.scrape()
                products = catagoryItems.data
            case "Shoprite":
                catagoryItems = Shoprite(category)
                catagoryItems.scrape()
                products = catagoryItems.data
            case "WoolWorths":
                catagoryItems = WoolWorths(category)
                catagoryItems.scrape()
                products = catagoryItems.data

        
        timeTowait = random.randint(7, 15)
        
        if not products:
            print(f"No products found for category: {category}")
            time.sleep(timeTowait)
            continue
        
        for product in products: 
            
            if not isinstance(product, list) or len(product) < 3:
                print(f"Skipping malformed product data: {product}")
                continue
            
            if check_row_exists(store, "Product_name", product[0]):
                continue
            
            try:
                supabase.table(store).insert({
                    "Product_name": product[0], 
                    "Price": product[1], 
                    "Img_unprocessed": product[2],
                    "Category": category,
                }).execute()
                print(f"Successfully inserted: {product[0]}")
            except Exception as e:
                print(f"Error inserting {product[0]}: {e}")
        print(f"going to sleep for {timeTowait}s don't wait ups 🙃\n")    
        time.sleep(timeTowait)

def fetch_img_links(table, start, end):
    response = supabase.table(table) \
    .select("*") \
    .execute()
    # .range(start, end) \
    return response.data

def insert_img_link(table, column, uuid, imgUrl):
    response = supabase.table(table) \
        .update({"Img_processed": imgUrl}) \
        .eq("uuid", uuid) \
        .execute()
    

def img_scraper(url, product):
    extra_http_headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate',
                    'Referer': 'https://google.com/',
                    'Custom-Header': 'YourValue'
                }
    
        
    img = requests.get(url, headers=extra_http_headers)
    
    # filename = f"{product}.webp"
    
    Key = f"{product.replace(' ', '-')}.webp"

    try:
        if img.status_code == 200:
            # with open(filename, 'wb') as f:
            #     f.write(img.content)
            #     pass  # Creates completely empty file
            s3.upload_fileobj(
            Fileobj=BytesIO(img.content),  # Image data in memory
            Bucket="smart-comparer",
            Key=Key,
            ExtraArgs={'ContentType': 'image/webp',
                       'ACL': 'public-read'}
        )
        s3_url = f"https://smart-comparer.s3.amazonaws.com/{Key}"
        
        # print(f"Created empty WebP file: {filename}")
        return s3_url
    except Exception as e:
        print(f"Error creating file: {e}")
        return False

# , [1000, 1999], [2000, 2999], [3000, 3500],[3501], [4000, 4999], [5000, 5888]

def add_imgs(store):
 
    ranges = [[0,999],[1000, 1999], [2000, 2575]]
    for table in ranges:
        
      data = fetch_img_links(store, table[0], table[1])
      for row in data:
        timeTowait = random.randint(6, 10)
        if isinstance(row, dict) and "Img_unprocessed" in row:
            imgLink = row.get("Img_unprocessed")
            imgLink_processed = row.get("Img_processed")
            
            product = row.get("Product_name")
            if imgLink_processed is not None or product is None:
                continue
            uuid = row.get("uuid")
            # processedImg = ""
            if store == "WoolWorths":
                processedImg = img_scraper(f"https://www.woolworths.co.za/{imgLink}", product)
            elif store == "PicknPay":
                processedImg = img_scraper(f"https://www.pnp.co.za{imgLink}", product)
            else:
                processedImg = img_scraper(imgLink, product)
            insert_img_link(store, "Img_processed", uuid, processedImg)
            print(f"added {product}")
            # print(imgLink, product)
        else:
            print(f"Skipping invalid row: {row}")
        print(f"bravo 6 going dark for {timeTowait}s 🌑\n")
        time.sleep(timeTowait)


# insert_products("checkers")
# insert_products("PicknPay")
# insert_products("WoolWorths")
# insert_products("Shoprite")
# pnp = WoolWorths("Maize Meal")
# pnp.scrape()

# stores = ["WoolWorths","Shoprite" ]
# for i in stores:
#     add_imgs(i)
add_imgs("PicknPay")

# print(pnp.data)




    
    


