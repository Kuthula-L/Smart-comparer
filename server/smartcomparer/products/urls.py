from django.urls import path
from . import views

urlpatterns = [
    path('start/', views.startServer, name="start"),
    path('search/', views.search, name="search"),
    path('basket/', views.getBasket, name="basket"),
    path('Favourits/', views.getFavourites, name="favourits"),
    path('groceryList/', views.getGroceryList, name="groceryList"),
]