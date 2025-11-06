from ast import Dict
from itertools import product
from tabnanny import check
from uuid import UUID

from django.http import JsonResponse
from django.shortcuts import render
from pydantic import InstanceOf, Json
import json

from .utils import findProducts, get_compared_data, get_products_by_store
from .utils import getPage_Data
from .utils import supabase
from .utils import search_products_fuzzy
import re
from django.views.decorators.csrf import csrf_exempt



# -------------------------------
# Landing Page Endpoint
# -------------------------------
def startServer(request):
    """
    This endpoint is called to check if the server is running.
    It simply returns a JSON response confirming the server has started.
    """
    return JsonResponse({"message": "server started"})  # Note: 'massage' might be a typo, should probably be 'message'

# -------------------------------
# Search Endpoint
# -------------------------------
@csrf_exempt
def search(request):
    """
    Receives a POST request with a JSON body containing a 'product' key.
    Uses the 'findProducts' function to search for products in the 'Cheackers' database
    with the specified product name and returns up to 50 results.
    """
    res = json.loads(request.body)  # Parse the JSON body from the request
    
    # products = supabase.table("Products").select("*, products(*)").eq("user_id", "0c05fb3d-6b91-4120-b61a-26f671f8ff1f").execute().data
    # checkers = findProducts("Products", "Product_name", res['product'], 5)  # Search for products
    # Shoprite = findProducts("Shoprite", "Product_name", res['product'], 5)  # Search for products
    # WoolWorths = findProducts("WoolWorths", "Product_name", res['product'], 5)  # Search for products
    # PicknPay = findProducts("PicknPay", "Product_name", res['product'], 5)  # Search for products
    test = findProducts("products", "Product_name", res['product'], 15)  # Search for products
    comparedData = get_compared_data(res['product'], 10)
    checkers = get_products_by_store(res['product'], 30, "Checkers")
    Shoprite = get_products_by_store(res['product'], 30, "Shoprite")
    PicknPay = get_products_by_store(res['product'], 30, "PicknPay")
    WoolWorths = get_products_by_store(res['product'], 30, "WoolWorths")
    

    # if isinstance(comparedData, list):
    #     compared_products = {str(item["Product_name"]) for item in comparedData if isinstance(item, dict) and item.get("Product_name")}

    #     # checkers = [p for p in checkers if isinstance(p, dict) and p.get("Product_name") not in compared_products]
    #     Shoprite = [p for p in Shoprite if isinstance(p, dict) and p.get("Product_name") not in compared_products]
    #     WoolWorths = [p for p in WoolWorths if isinstance(p, dict) and p.get("Product_name") not in compared_products]
    #     PicknPay = [p for p in PicknPay if isinstance(p, dict) and p.get("Product_name") not in compared_products]
    data = {"compared_data": comparedData, 
            "uncomparable_data": {"Checkers": checkers, "Shoprite":  Shoprite, "WoolWorths": WoolWorths, "PicknPay":PicknPay},
            "test":test
            
            }
    
    
    return JsonResponse(data)  # Return the search results as JSON

# -------------------------------
# Compare Products Endpoint
# -------------------------------
def compare(request):
    """
    Receives a POST request with a JSON body containing a 'product' key.
    Uses the 'findProducts' function to fetch products for comparison (same as search).
    Returns up to 50 results from the 'Cheackers' database.
    """
    res = json.loads(request.body)  # Parse the JSON body
    data = findProducts("Cheackers", "Product_name", res['product'], 50)  # Find products for comparison
    return JsonResponse(data)  # Return comparison results as JSON

# Helper: check valid UUID
def _is_valid_uuid(val):
    if not val:
        return False
    try:
        UUID(str(val))
        return True
    except Exception:
        return False

# Helper: try insert, and if PostgREST reports missing column, remove it and retry
def _robust_insert(table_name, record, max_retries=3):
    """
    Try to insert `record` into `table_name`.
    If the PostgREST response complains a column does not exist (PGRST204),
    remove that column from the record and retry up to max_retries times.
    """
    attempt = 0
    rec = dict(record)  # copy
    while attempt < max_retries:
        attempt += 1
        try:
            res = supabase.table(table_name).insert(rec).execute()
            # On success res.data normally holds inserted row(s)
            return res
        except Exception as e:
            msg = str(e)
            # look for "Could not find the 'Image' column" pattern
            m = re.search(r"Could not find the '([^']+)' column", msg)
            if m:
                bad_col = m.group(1)
                # remove bad column and retry
                rec.pop(bad_col, None)
                continue
            # If it's some other error, re-raise
            raise

    # If we exit loop without success, raise a generic error
    raise Exception(f"Insert into {table_name} failed after {max_retries}")

# -------------------------------
# Get Basket Endpoint
# -------------------------------
@csrf_exempt
def getBasket(request):
    """
    Receives a POST request with a JSON body containing a user's UUID.
    Uses the 'getPage_Data' function to fetch basket data for that user.
    Returns the basket contents as JSON.
    """
    # res = json.loads(request.body)  # Parse JSON body
    # data = getPage_Data("Basket", res["uuid"])  # Fetch basket data for user
    # return JsonResponse(data)  # Return basket data as JSON
    # try:
        # payload = json.loads(request.body or "{}")
        # uuid = payload.get("uuid")
        # if _is_valid_uuid(uuid):
        #     data = getPage_Data("Basket", str(uuid))
        # else:
            # if no valid uuid provided, return all basket rows (or you can filter differently)
    # id = getPage_Data("Basket", "")
    
    payload = json.loads(request.body or "{}")
    
    uuid = payload.get("uuid")
    user_type = payload.get("user_type")
    
    if user_type == "user":
        table = "Basket"
    else:
        table = "guest_basket"
        # basket = supabase.table("Basket").select("*, products(*)").eq("user_id", "0c05fb3d-6b91-4120-b61a-26f671f8ff1f").execute().data
    basket = supabase.table(table).select("*, products(*)").eq("user_id", uuid).execute().data
        
    
    
    # quantiy = 0
    total = 0.0
    stores = set()
    store_totals = {
        "Checkers": 0.0,
        "PicknPay": 0.0,
        "Shoprite": 0.0,
        "WoolWorths": 0.0
    }
    
    # for product in basket:
    #     try
    #     price = product["products"]["price"]
    #     store = product["products"]["store_name"]
    #     total += float(price)
    #     stores.add(store)
       
    #     if store=="Checkers": 
    #        check += float(price)
    #     if store=="PicknPay": 
    #        pnp += float(price)
    #     if store=="Shoprite": 
    #        shop += float(price)
    #     if store=="WoolWorths": 
    #        wool += float(price)
    
    for product in basket:
        try:
            prod_data = product.get("products") if isinstance(product, dict) else None
            if isinstance(prod_data, dict) and prod_data.get("Price") is not None:
                price = round(float(prod_data.get("Price", 0)), 2)
                store = prod_data.get("store_name", "Unknown")
                
                total += price
                stores.add(store)
                
                if store in store_totals:
                    store_totals[store] += price
                else:
                    store_totals[store] = price
                    
        except (KeyError, ValueError, TypeError) as e:
            print(f"Error processing product: {e}")
            continue


    return JsonResponse({"basket":basket, "basketTotal": round(total, 2),"stores": list(stores), "storeTotals":store_totals}, safe=False)
    # except Exception as e:
    #     return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def addToBasket(request):
    """
    Expects POST JSON: { "uuid": "<user-uuid>", "product": { ... product fields ... } }
    Inserts product into Supabase table 'Basket' and returns inserted row.
    """
    # try:
    payload = json.loads(request.body or "{}")
    product_uuid = payload.get("product_uuid")
    user_uuid = payload.get("user_uuid")
    user_type = payload.get("user_type")
    
    # print(product_uuid, user_uuid)
    # product = payload.get("product")
    if not product:
        return JsonResponse({"error": "product required"}, status=400)
    
    if user_type == "user":
        table = "guest_basket"
    else:
        table = "Basket"
    
    res = supabase.table(table).insert({
        # "user_id": "0c05fb3d-6b91-4120-b61a-26f671f8ff1f",
        # "product_id": "0064176b-4681-4934-a24b-764d9142b096",
        
        "user_id":user_uuid,
        "product_id":product_uuid
        
        # "quantity": 0,
    }).execute()
    # print(res.status_code)
    # print(res.data)
    # print(res.error_message)
    # Build a record with only present fields (avoid None)
    # product_record = {k: v for k, v in product.items() if v is not None}

    # # If uuid is a valid UUID, include it. If not, don't include.
    # if _is_valid_uuid(uuid):
    #     product_record["uuid"] = str(uuid)

    # res = _robust_insert("Basket", product_record)
    return JsonResponse({"status": "ok", "data":"added"}, status=201)
    # except Exception as e:
    #     return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def removeFromBasket(request):
    """
    Expects POST JSON: { "uuid": "<user-uuid>", "product_id": "<id or unique field>" }
    Deletes matching record from 'Basket' table.
    """
    try:
        payload = json.loads(request.body or "{}")
        user_id = payload.get("user_uuid")
        user_type = payload.get("user_type")
        product_id = payload.get("product_uuid")
        
        if user_type == "user":
            table = "Basket"
        else:
            table = "guest_basket"
            
        supabase.table(table).delete().eq("user_id", user_id).eq("product_id", product_id).execute()

       
        return JsonResponse({"status": "ok", "data": "removed"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
    
# -------------------------------
# Get Grocery List Endpoint
# -------------------------------
@csrf_exempt
def getGroceryList(request):
    """
    Receives a POST request with a JSON body containing a list of items.
    For each item, it searches the 'Cheackers' database and fetches up to 10 matching products.
    Returns a dictionary mapping each item to its corresponding products.
    """
    # res = json.loads(request.body)
    # results = {}
    # try:  
    #     # print(res["items"])
    #     if 'items' not in res:
    #         return JsonResponse({"error": "No items provided"}, status=400)
        
    #     for item in res["items"]:
    #         print(item)
    #         # comparedData = get_compared_data(item, 10)
    #         # results[item] = comparedData
            
    #     return JsonResponse(results)
    # except json.JSONDecodeError:
    #     return JsonResponse({"error": "Invalid JSON"}, status=400)
    # except Exception as e:
    #     return JsonResponse({"error": str(e)}, status=500)
    try:
        data = json.loads(request.body)
        results = {}
        
        # If processing many items, consider batching
        items = data.get("items", [])
        
        if len(items) > 100:
            return JsonResponse({"error": "Too many items. Max 100 allowed."}, status=400)
        
        for item in items:
            try:
                comparedData = get_compared_data(item, 10)
                results[item] = comparedData
            except Exception as e:
                results[item] = {"error": str(e)}
        
        return JsonResponse(results)
        
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
# ---------------------------
# Get Favourites Endpoint
# -------------------------------
@csrf_exempt
def getFavourites(request):
    """
    Receives a POST request with a JSON body containing a user's UUID.
    Uses 'getPage_Data' to fetch the user's favorite products.
    Returns the favorites as JSON.
    """
    payload = json.loads(request.body)  # Parse JSON body
    user_uuid = payload.get("user_uuid")
    user_type = payload.get("user_type")
    
    # data = getPage_Data("Favourites", res["uuid"])  # Fetch user's favorites
    # return JsonResponse(data)  # Return favorites as JSON
    
    try:
        data = (
            supabase.table("favourites")
            .select("*, products(*)")
            .eq(f"{user_type}_id", user_uuid)
            .execute()
            .data
        )
    
        return JsonResponse({"data": data}, safe=False)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
@csrf_exempt
def addToFavourites(request):
    """
    Expects POST JSON: { "uuid": "<user-uuid>", "product": {...} }
    Inserts into 'Favourites' table.
    """
    # payload = json.loads(request.body)
    # user_uuid = payload.get("user_uuid")
    # product_uuid = payload.get("product_uuid")
    
    
    # res = supabase.table("favourites").upsert({
    #     "user_id":user_uuid,
    #     "product_id":product_uuid
    # }).execute()
    
    payload = json.loads(request.body)
    user_uuid = payload.get("user_uuid")
    product_uuid = payload.get("product_uuid")
    user_type = payload.get("user_type")
    
    print("user: ",user_uuid)
    print("product: ",product_uuid)
    


    # Add validation
    if not user_uuid or not product_uuid:
        return JsonResponse({"error": "Missing required fields"}, status=400)

    # Specify the conflict resolution
    res = supabase.table("favourites").insert({
        f"{user_type}_id": user_uuid,
        "product_id": product_uuid
    }).execute()  # Add this parameter

    return JsonResponse({"status": "ok", "data": "added"}, status=200)
    
    
    
    # return JsonResponse({"status": "ok", "data":"added"}, status=201)

@csrf_exempt
def removeFromFavourites(request):
    """
    Expects POST JSON: { "uuid": "<user-uuid>", "product_id": "<id or unique field>" }
    """
    try:
        payload = json.loads(request.body)
        user_uuid = payload.get("user_uuid")
        product_uuid = payload.get("product_uuid")
        user_type = payload.get("user_type")
        
        print("user: ",user_uuid)
        print("product: ",product_uuid)
        # product_uuid = payload.get("product_uuid")
        supabase.table("favourites").delete().eq(f"{user_type}_id", user_uuid).eq("product_id", product_uuid).execute()

       
        return JsonResponse({"status": "ok", "data": "removed"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
    
# def getLIstItems(request):
#     res = json.loads(request.body)
#     results = {}
#     try:  
#         for item in res["items"]:
#             comparedData = get_compared_data(item)
#             results[item] = comparedData
            
#     except json.JSONDecodeError:
#         return JsonResponse({"error": "Invalid JSON"}, status=400)
#     except Exception as e:
#         return JsonResponse({"error": str(e)}, status=500)
        
#     return JsonResponse(results)
        
