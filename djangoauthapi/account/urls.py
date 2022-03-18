
from django.urls import path, include
from account.views import UserReristrationView, UserLoginView, UserProfileView, UserChangePasswordView

urlpatterns = [
    path('register/', UserReristrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/',UserProfileView.as_view(), name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
]