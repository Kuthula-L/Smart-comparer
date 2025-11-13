from multiprocessing import JoinableQueue
from urllib import response
from django.http import HttpRequest, JsonResponse
import jwt
import json
from django.shortcuts import render
import dns.resolver
import uuid
from decouple import config
from pydantic import Json
from realtime import Payload
from supabase import Client, create_client
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
from datetime import datetime, timedelta, timezone, UTC

import time
# payload = {"userId":32, "exp":"time"}

key = config('SECRET_KEY')
url = config("URL")
supabase: Client = create_client(str(url), str(key))
# Create your views here.

@csrf_exempt
def checkEmail(request):
    try:
        payload = json.loads(request.body)
        email = payload.get("email")
      
        
        if not email:
            return JsonResponse({"error": "email is required here"}, status=400)
        result = supabase.table("users").select("*").eq("email", email).execute()
       
        if result.data:
            return JsonResponse({"exists":True}, status=201)
        else:
            return JsonResponse({"exists":False}, status=201)
    
    except json.JSONDecodeError as e:
        return JsonResponse({"error": f"Invalid JSON: {str(e)}"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
        # return JsonResponse({"response":"added"})

@csrf_exempt
def login(request):
    # userId = 1
    
    # payload = {
    #     "userId":userId,
    #     "exp":"time"
    # }
    payload = json.loads(request.body)
    
    email = payload.get("email")
    password = payload.get("password")
    if not email or not password:
            return JsonResponse({"error": "Email and password required"}, status=400)
        
    # email = payload.get("email")
    
    user = supabase.table("users").select("*").eq("email", email).execute().data[0]
    
    if user:
        if not check_password(password, user["password"]):
            
            return JsonResponse({"valid":False})
        user_id = user["user_id"]
       
    token_payload = {
    "user_id": user_id,
    "email": email,
    "user_type": "user",
    "exp": datetime.now(UTC) + timedelta(hours=24)  # 24 hours
    }

    token = jwt.encode(token_payload,"random string", algorithm="HS256")
    
    # print(token)

    response = JsonResponse({"valid": True, "token": token})
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,  # Helps prevent JS tampering
        secure=False,
        samesite='None',
        path='/',
    )

    # Set cookie to expire in 24 hours (matching token expiration)


    return response
   
    
    
    # domain = email.split('@')[1]
    
         




@csrf_exempt
def register(request):
    # user_uuid = uuid.uuid4()
    payload = json.loads(request.body)
    email = payload.get("email")
    password = payload.get("password")
    # domain = email.split('@')[1]
    try:
 
        result = supabase.table("users").insert({
            "email": email,
            "password": make_password(password)
        }).execute().data
        
        token_payload = {
            "user_id":result["user_id"],
            "email": email,
            "exp": datetime.now(UTC) + timedelta(days=30) 
        }
        token = jwt.encode(token_payload, "random string", algorithm="HS256")
        
        return  JsonResponse({"token":token})
    except:
        return JsonResponse({"massage":False})
    
    
    
       
def verify_token(request):
    data = json.load(request.data)
    token = data["token"]
    status = jwt.decode(token, "random string", algorithm="HS256")
    
    
    
    return JsonResponse({"massage":False})

@csrf_exempt  
def addGuest(request):
    try:
        # payload = json.loads(request.body)
        # guest_uuid = payload.get("user_uuid")
        
        # token_payload = {
        #     "user_id":guest_uuid,

        #     "exp": datetime.now(UTC) + timedelta(days=30) 
        # }
        res = supabase.table("guest").insert({}).execute().data
        user_id = res[0]["user_id"]
        
        token_payload = {
        "user_id":user_id,
        "user_type": "guest",
        "exp": datetime.now(UTC) + timedelta(hours=24)  # 24 hours
        }

        token = jwt.encode(token_payload, "random string", algorithm="HS256")
        
        if not uuid:
            return JsonResponse({"error": "user_uuid is required"}, status=400)
        
        
        return JsonResponse({"status": "ok", "token":token, "valid":True}, status=201)
    
    except json.JSONDecodeError as e:
        return JsonResponse({"error": f"Invalid JSON: {str(e)}", "valid":False}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e), "valid":False}, status=500)
        # return JsonResponse({"response":"added"})


def oAuth():
    return JsonResponse({"Link":""})