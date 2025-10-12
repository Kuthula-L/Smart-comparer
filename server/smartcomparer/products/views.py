from itertools import product
from tabnanny import check
from django.http import JsonResponse
from django.shortcuts import render
from pydantic import Json
import json
from .utils import findProducts, get_compared_data
from .utils import getPage_Data
from .utils import supabase
from .utils import search_products_fuzzy
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
    checkers = findProducts("Checkers", "Product_name", res['product'], 20)  # Search for products
    Shoprite = findProducts("PicknPay", "Product_name", res['product'], 20)  # Search for products
    WoolWorths = findProducts("Shoprite", "Product_name", res['product'], 20)  # Search for products
    PicknPay = findProducts("WoolWorths", "Product_name", res['product'], 20)  # Search for products
    
    comparedData = get_compared_data(res['product'])

    if isinstance(comparedData, list):
        compared_products = {str(item["Product_name"]) for item in comparedData if isinstance(item, dict) and item.get("Product_name")}

        checkers = [p for p in checkers if isinstance(p, dict) and p.get("Product_name") not in compared_products]
        Shoprite = [p for p in Shoprite if isinstance(p, dict) and p.get("Product_name") not in compared_products]
        WoolWorths = [p for p in WoolWorths if isinstance(p, dict) and p.get("Product_name") not in compared_products]
        PicknPay = [p for p in PicknPay if isinstance(p, dict) and p.get("Product_name") not in compared_products]
    data = {"compared_data": comparedData, 
            "uncomparable_data": {"checkers": checkers, "Shoprite":  Shoprite, "WoolWorths": WoolWorths, "PicknPay":PicknPay}
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

# -------------------------------
# Get Basket Endpoint
# -------------------------------
def getBasket(request):
    """
    Receives a POST request with a JSON body containing a user's UUID.
    Uses the 'getPage_Data' function to fetch basket data for that user.
    Returns the basket contents as JSON.
    """
    res = json.loads(request.body)  # Parse JSON body
    data = getPage_Data("Basket", res["uuid"])  # Fetch basket data for user
    return JsonResponse(data)  # Return basket data as JSON

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
def getFavourites(request):
    """
    Receives a POST request with a JSON body containing a user's UUID.
    Uses 'getPage_Data' to fetch the user's favorite products.
    Returns the favorites as JSON.
    """
    res = json.loads(request.body)  # Parse JSON body
    data = getPage_Data("Favourites", res["uuid"])  # Fetch user's favorites
    return JsonResponse(data)  # Return favorites as JSON
