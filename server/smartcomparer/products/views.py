from itertools import product
from tabnanny import check
from uuid import UUID

from django.http import JsonResponse
from django.shortcuts import render
from pydantic import Json
import json
from .utils import findProducts, get_compared_data
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
    checkers = findProducts("Checkers", "Product_name", res['product'], 5)  # Search for products
    Shoprite = findProducts("PicknPay", "Product_name", res['product'], 5)  # Search for products
    WoolWorths = findProducts("Shoprite", "Product_name", res['product'], 5)  # Search for products
    PicknPay = findProducts("WoolWorths", "Product_name", res['product'], 5)  # Search for products
    
    comparedData = get_compared_data(res['product'])

    if isinstance(comparedData, list):
        compared_products = {str(item["Product_name"]) for item in comparedData if isinstance(item, dict) and item.get("Product_name")}

        checkers = [p for p in checkers if isinstance(p, dict) and p.get("Product_name") not in compared_products]
        Shoprite = [p for p in Shoprite if isinstance(p, dict) and p.get("Product_name") not in compared_products]
        WoolWorths = [p for p in WoolWorths if isinstance(p, dict) and p.get("Product_name") not in compared_products]
        PicknPay = [p for p in PicknPay if isinstance(p, dict) and p.get("Product_name") not in compared_products]
    data = {"compared_data": comparedData, 
            "uncomparable_data": {"Checkers": checkers, "Shoprite":  Shoprite, "WoolWorths": WoolWorths, "PicknPay":PicknPay}
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
    data = getPage_Data("Basket", "")
    return JsonResponse(data, safe=False)
    # except Exception as e:
    #     return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def addToBasket(request):
    """
    Expects POST JSON: { "uuid": "<user-uuid>", "product": { ... product fields ... } }
    Inserts product into Supabase table 'Basket' and returns inserted row.
    """
    try:
        payload = json.loads(request.body or "{}")
        uuid = payload.get("uuid")
        product = payload.get("product")
        if not product:
            return JsonResponse({"error": "product required"}, status=400)

        # Build a record with only present fields (avoid None)
        product_record = {k: v for k, v in product.items() if v is not None}

        # If uuid is a valid UUID, include it. If not, don't include.
        if _is_valid_uuid(uuid):
            product_record["uuid"] = str(uuid)

        res = _robust_insert("Basket", product_record)
        return JsonResponse({"status": "ok", "data": res.data}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def removeFromBasket(request):
    """
    Expects POST JSON: { "uuid": "<user-uuid>", "product_id": "<id or unique field>" }
    Deletes matching record from 'Basket' table.
    """
    try:
        payload = json.loads(request.body or "{}")
        uuid = payload.get("uuid")
        product_id = payload.get("product_id")  # can be id (int) or name

        # Start delete query
        query = supabase.table("Basket").delete()

        # only filter by uuid if it looks like a real UUID
        if _is_valid_uuid(uuid):
            query = query.eq("uuid", str(uuid))

        # If product_id provided, decide how to match it
        if product_id is not None:
            # numeric id?
            try:
                pid = int(product_id)
                query = query.eq("id", pid)
            except Exception:
                # fallback to product name column (common)
                query = query.eq("Product_name", product_id)

        res = query.execute()
        return JsonResponse({"status": "ok", "data": res.data})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

# -------------------------------
# Get Grocery List Endpoint
# -------------------------------
def getGroceryList(request):
    """
    Receives a POST request with a JSON body containing a list of items.
    For each item, it searches the 'Cheackers' database and fetches up to 10 matching products.
    Returns a dictionary mapping each item to its corresponding products.
    """
    items = json.loads(request.body)  # Parse JSON body containing a list of items
    data = {}
    for item in items:
       products = findProducts("Cheackers",  "Product_name", item, 10)  # Fetch products for each item
       data[item] = products  # Store results in a dictionary
       
    return JsonResponse(data)  # Return the compiled grocery list as JSON

# -------------------------------
# Get Favourites Endpoint
# -------------------------------
@csrf_exempt
def getFavourites(request):
    """
    Receives a POST request with a JSON body containing a user's UUID.
    Uses 'getPage_Data' to fetch the user's favorite products.
    Returns the favorites as JSON.
    """
    # res = json.loads(request.body)  # Parse JSON body
    # data = getPage_Data("Favourites", res["uuid"])  # Fetch user's favorites
    # return JsonResponse(data)  # Return favorites as JSON
    try:
        payload = json.loads(request.body or "{}")
        uuid = payload.get("uuid")
        if _is_valid_uuid(uuid):
            data = getPage_Data("Favourites", str(uuid))
        else:
            data = getPage_Data("Favourites", None)
        return JsonResponse(data, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def addToFavourites(request):
    """
    Expects POST JSON: { "uuid": "<user-uuid>", "product": {...} }
    Inserts into 'Favourites' table.
    """
    try:
        payload = json.loads(request.body or "{}")
        uuid = payload.get("uuid")
        product = payload.get("product")
        if not product:
            return JsonResponse({"error": "product required"}, status=400)

        product_record = {k: v for k, v in product.items() if v is not None}
        if _is_valid_uuid(uuid):
            product_record["uuid"] = str(uuid)

        res = _robust_insert("Favourites", product_record)
        return JsonResponse({"status": "ok", "data": res.data}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def removeFromFavourites(request):
    """
    Expects POST JSON: { "uuid": "<user-uuid>", "product_id": "<id or unique field>" }
    """
    try:
        payload = json.loads(request.body or "{}")
        uuid = payload.get("uuid")
        product_id = payload.get("product_id")

        query = supabase.table("Favourites").delete()
        if _is_valid_uuid(uuid):
            query = query.eq("uuid", str(uuid))

        if product_id is not None:
            try:
                pid = int(product_id)
                query = query.eq("id", pid)
            except Exception:
                query = query.eq("Product_name", product_id)

        res = query.execute()
        return JsonResponse({"status": "ok", "data": res.data})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)