from django.urls import path
from . import views

urlpatterns = [
    path('auth/login', views.login, name="login"),
    path('auth/register', views.register, name="signUp"),
    path('auth/verify', views.verify_token, name="verify_token"),
]