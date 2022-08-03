from http import client
from django.apps import AppConfig
import requests
import json

class songqueueConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'songqueue'
    client_id = 'b5111ea315fa44f5b9082b3f17b30a6f'    
    def ready(self) -> None:
        print('ready')
        
        payload = {'response_type': 'code',
                   'client_id': self.client_id,
                   'scope': 'user-read-private user-read-email',
                   'redirect_uri': 'http://localhost:8000/acceptAuth'}
        url = 'https://accounts.spotify.com/authorize?'
        
        r = requests.get('https://accounts.spotify.com/authorize', params=payload)
        print(r.text)

