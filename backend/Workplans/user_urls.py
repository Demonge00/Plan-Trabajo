from django.urls import path
from Workplans import views
urlpatterns = [
    path('register/', views.registerUser, name='register_user')
]
