from multiprocessing import JoinableQueue
from urllib import response
from django.http import HttpRequest, JsonResponse
import jwt
import json
from django.shortcuts import render
import dns.resolver
import uuid
from decouple import config
from supabase import Client, create_client
from django.views.decorators.csrf import csrf_exempt

# payload = {"userId":32, "exp":"time"}

key = config('SECRET_KEY')
url = config("URL")
supabase: Client = create_client(str(url), str(key))
# Create your views here.
def login(request):
    userId = 1
    
    payload = {
        "userId":userId,
        "exp":"time"
    }
    data = json.load(request.body)
    email = data["email"]
    passkey = data["password"]
    domain = email.split('@')[1]
    token = jwt.encode(payload, "random string", algorithm="HS256")
         
    return  JsonResponse({"token":token})
def register(request):
    user_uuid = uuid.uuid4()
    payload = {"userid":user_uuid, "exp": "time"}
    data = json.load(request.data)
    email = data["email"]
    passkey = data["password"]
    token = jwt.encode(payload, "random string", algorithm="HS256")
    domain = email.split('@')[1]
    
    try:
        dns.resolver.resolve(domain, 'MX')
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
        payload = json.loads(request.body)
        uuid = payload.get("user_uuid")
        
        if not uuid:
            return JsonResponse({"error": "user_uuid is required"}, status=400)
        
        res = supabase.table("guest").insert({"user_id": uuid}).execute()
        
        return JsonResponse({"status": "ok"}, status=201)
    
    except json.JSONDecodeError as e:
        return JsonResponse({"error": f"Invalid JSON: {str(e)}"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
        # return JsonResponse({"response":"added"})


def oAuth():
    return JsonResponse({"Link":""})