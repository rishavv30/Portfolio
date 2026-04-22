from django.urls import path
from . import views

app_name = 'contact'

urlpatterns = [
    path('submit/', views.contact_view, name='submit'),
    path('api/submit/', views.submit_contact_api, name='api_submit'),
    path('success/', views.contact_success, name='success'),
]
