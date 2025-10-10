 # checkers = findProducts("Cheackers", "Product_name", res['product'], 50)  # Search for products
    # Shoprite = findProducts("Cheackers", "Product_name", res['product'], 50)  # Search for products
    # WoolWorths = findProducts("Cheackers", "Product_name", res['product'], 50)  # Search for products
    # PicknPay = findProducts("Cheackers", "Product_name", res['product'], 50)  # Search for products
    
    # for Checkers_product in checkers:
    #     Checkers_product["product_name"]
    #     for i in range(50):
    #         Shoprite[i]
    
    # Check results
    # if response.data:
    #     for product in response.data:
    #         print(f"{product['Product_name']} - Price: {product['Price']} - Similarity: {product['similarity_score']:.2f}")
    # else:
    #     print("No matching products found.")
    
        # if isinstance(comparedData, list):
        # for item in comparedData:
        #     if isinstance(item, dict) and item.get("Product_name"):
        #         product = item.get("Product_name")
        #         for i in range(20):
        #             if isinstance(checkers[i], dict) and product == checkers[i].get("Product_name"):
        #                 checkers.remove(checkers[i])
        #             if isinstance(Shoprite[i], dict) and product == checkers[i].get("Product_name"):
        #                 checkers.remove(checkers[i])
        #             if isinstance(WoolWorths[i], dict) and product == checkers[i].get("Product_name"):
        #                 checkers.remove(checkers[i])
        #             if isinstance(PicknPay[i], dict) and product == checkers[i].get("Product_name"):
        #                 checkers.remove(checkers[i])
        


# class Compare():
#     def __init__(self, product_to_search):
#         self.compared_data = {}
#         self.product_to_seach = product_to_search
        
#         self.checkers = findProducts("Checkers", "Product_name", product_to_search, 50)  # Search for products
#         self.PicknPay = findProducts("PicknPay", "Product_name", product_to_search, 50)  # Search for products
#         self.Shoprite= findProducts("Shoprite", "Product_name", product_to_search, 50)  # Search for products
#         self.WoolWorths = findProducts("WoolWorths", "Product_name", product_to_search, 50)  # Search for products
        
#         self.search_stores("Checkers")
#         print(self.compared_data)
                
    
#     def search_stores(self, store):
#         store_data = []
#         stores = ["WoolWorths","Shoprite","PicknPay","Checkers"]
#         stores.remove(store)
        
        
#         match store:
#             case "Checkers":
#                 store_data = self.checkers
#             case "Shoprite":
#                 store_data = self.Shoprite
#             case "PicknPay":
#                 store_data = self.PicknPay
#             case "WoolWorths":
#                 store_data = self.WoolWorths
                
#         if not store_data or not isinstance(store_data, list) or not isinstance(store_data[0], dict):
#             print("No valid product data found.")
#             return
                
#         for item in store_data:
#             to_compare = ""
#             to_compare_price = 0
#             to_compare = item.get("Product_name", "Product name not found")
#             to_compare_price = item.get("Price", "Product name not found")
            
            
#             # if store_data and isinstance(store_data, list) and len(store_data) > 0 and isinstance(store_data[0], dict):
#             # else:
#                 # print("No product found")
            
            
#             # for item in store_data:
#             #     print(f"{to_compare} is starting 😤")
#             #     # store = Shoprite[i]
#             #     # PicknPay = search_products_fuzzy(to_compare, "PicknPay")
#             #     # WoolWorths = search_products_fuzzy(to_compare, "WoolWorths")
#             #     # Shoprite = search_products_fuzzy(to_compare, "Shoprite")
                
#             #     # result = [search_products_fuzzy(to_compare, stores[0]),search_products_fuzzy(to_compare, stores[1]),search_products_fuzzy(to_compare, stores[2])]
#             #     result = [
#             #             (stores[0], search_products_fuzzy(to_compare, stores[0])),
#             #             (stores[1], search_products_fuzzy(to_compare, stores[1])),
#             #             (stores[2], search_products_fuzzy(to_compare, stores[2]))
#             #             ]
                
#             #     # if isinstance(result, list) and result and isinstance(result[0], dict):
#             #     #     return
#             #     if not to_compare or not isinstance(to_compare_price, (int, float)):
#             #         continue
                    
#             #     tolerance = to_compare_price * 0.1 if isinstance(to_compare_price, (int, float)) else 0
#             #     max = to_compare_price + tolerance if isinstance(to_compare_price, (int, float)) else 0
#             #     min  = to_compare_price - tolerance if isinstance(to_compare_price, (int, float)) else 0
                
#             #     store1 = result[0].get("Price", "store1 price not found")
#             #     store2 = result[1].get("Price", "store2 price not found")
#             #     store3 = result[2].get("Price", "store3 price not found")
                
#             #     self.compared_data[to_compare] = []
                
#             #     try:
#             #         store1 = float(store1)
#             #         store2 = float(store2)
#             #         store3 = float(store3)
#             #     except (ValueError, TypeError):
#             #         store1 = None
#             #         store2 = None
#             #         store3 = None
                    
#             #     if store1 is not None and store1 >= min and store1 <= max:
#             #         self.compared_data[to_compare].append(result[0])
                    
#             #     if store2 is not None and store2 >= min and store2 <= max:
#             #         self.compared_data[to_compare].append(result[1])
                    
#             #     if store3 is not None and store3 >= min and store3 <= max:
#             #         self.compared_data[to_compare].append(result[2])
#             #     # else:
#             #     #     PicknPay_Price = None
            
#             try:
#                 price_value = float(to_compare_price)
#             except (ValueError, TypeError):
#                 continue
#             tolerance = price_value * 0.1
#             price_min = price_value - tolerance
#             price_max = price_value + tolerance

#             self.compared_data[to_compare] = []
#             for compare_store in stores:
#                 result = search_products_fuzzy(to_compare, compare_store)
#                 if not result:
#                     continue

#                 best_match = result[0]  # take most similar one
#                 try:
#                     price = float(best_match.get("Price", 0))
#                     if price_min <= price <= price_max:
#                         self.compared_data[to_compare].append({
#                             "store": compare_store,
#                             "data": best_match
#                         })
#                 except (ValueError, TypeError):
#                     continue
#             # print(f"{to_compare} is done 😮‍💨")

# product_to_search = "bread"

# Compare(product_to_search)