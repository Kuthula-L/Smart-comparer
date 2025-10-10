from django.urls import path
from . import views

urlpatterns = [
    path('search', views.search, name="search"),
    path('basket', views.getBasket, name="Basket"),
    path('Favourits', views.getFavourites, name="Favourits"),
    path('groceryList', views.getGroceryList, name="Grocery List"),
]