from django.urls import path, include
from . import views

urlpatterns = [
    path('hello/', views.say_hello),
    path('', views.welcome),
    path('search/', views.search),
]