from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name="login"),
    path('register/', views.register, name="signUp"),
    path('verify/', views.verify_token, name="verify_token"),
    path('add_guest/', views.addGuest, name="add_guest"),
]