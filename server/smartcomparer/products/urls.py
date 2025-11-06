from django.urls import path
from . import views

urlpatterns = [
    path('start/', views.startServer, name="start"),
    path('search/', views.search, name="search"),
    path('basket/', views.getBasket, name="basket"),
    path('favourits/', views.getFavourites, name="favourits"),
    path('groceryList/', views.getGroceryList, name="groceryList"),
    path('addToBasket/', views.addToBasket, name="addToBasket"),
    path('removeFromBasket/', views.removeFromBasket, name="removeFromBasket"),
    path('addToFavourites/', views.addToFavourites, name="addToFavourites"),
    path('removeFromFavourites/', views.removeFromFavourites, name="removeFromFavourites"),

    
]