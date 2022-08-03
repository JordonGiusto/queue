from time import time
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import time
import requests

client_id = 'b5111ea315fa44f5b9082b3f17b30a6f'
client_secret = '6df234839f3b40ef9304e0c7724f8b39'

# Create your views here.
def say_hello(request):
    return HttpResponse("Hello, world. You're at the say_hello page.")

def welcome(request):
    return render(request, 'home.html')

def host(request):
    return render(request, 'host.html')

def user(request):
    return render(request, 'host.html')

def search(request):
    query = request.GET.get('query')
    print(query)
    data = {
        'songs': [
            {'title': 'Song 1', 'artist': 'Artist 1'},
            {'title': 'Song 2', 'artist': 'Artist 2'},
            {'title': 'Song 3', 'artist': 'Artist 3'},
            {'title': 'Song 4', 'artist': 'Artist 4'},
            {'title': 'Song 5', 'artist': 'Artist 5'},
            {'title': 'Song 6', 'artist': 'Artist 6'},
            {'title': 'Nick sucks at smash', 'artist': 'Artist 7'},
        ]
    }
    return JsonResponse(data)


def acceptAuth(request):
    pass

