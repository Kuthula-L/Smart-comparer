from unittest import result
from supabase import Client, create_client
from decouple import config

key = config('SECRET_KEY')
url = config("URL")
supabase: Client = create_client(str(url), str(key))



def findProducts(table_name, column, value, limit):
    response = supabase.table(table_name) \
    .select("*") \
    .ilike(column, f"%{value}%") \
    .limit(limit) \
    .execute()    
    return response.data

def getPage_Data(table_name, uuid):
    response = supabase.table(table_name) \
    .select("*") \
    .eq("uuid", uuid)\
    .limit(50) \
    .execute()
    return response.data

def search_products_fuzzy(search_text, table):
    response = supabase.rpc(
    "search_products_fuzzy",
    {"search_text": search_text, "table_name": table}
        ).execute()
    return response.data

def get_compared_data(search_text):
    response = supabase.rpc(
    "compare_across_stores",
    {
        "search_text": search_text,
        "base_store_name": "Checkers",
        "similarity_threshold": 0.2,
        "price_tolerance": 0.1
    }
    ).execute()
    return response.data



# print(search_products_fuzzy(product_to_search, "PicknPay")[0].get("Price"))

# checkers = findProducts("Checkers", "Product_name", product_to_search, 50)  # Search for products
# PicknPay = findProducts("PicknPay", "Product_name", product_to_search, 50)  # Search for products
# Shoprite= findProducts("Shoprite", "Product_name", product_to_search, 50)  # Search for products
# WoolWorths = findProducts("WoolWorths", "Product_name", product_to_search, 50)  # Search for products



    
    
# for Checkers_product in checkers:
#     to_compare = ""
#     if checkers and isinstance(checkers, list) and len(checkers) > 0 and isinstance(checkers[0], dict):
#         to_compare = Checkers_product.get("Product_name", "Product name not found")
#     else:
#         print("No product found")
        
        
#     for i in range(50):
#         # store = Shoprite[i]
#         search_products_fuzzy(to_compare, "PicknPay")

