from django.urls import path
from Workplans import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('register/', views.registerUser, name='register_user'),
    path('verify/<verification_secret>', views.verifyUser, name='verify-user'),
    path('token/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', views.userInfo, name='token_refresh'),
    path('profile/update/', views.updateInfo, name='token_refresh'),
    path('password/', views.handleEmail, name='verify-user'),
    path('password/<password_secret>', views.updatePassword, name='verify-user'),
    path('create/', views.createWorkplan, name="create-workplan"),
    path('list/', views.listPlans, name="list-plans")
]
