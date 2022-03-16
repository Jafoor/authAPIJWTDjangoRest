
from django.urls import path, include
from account.views import UserReristrationView

urlpatterns = [
    path('register/', UserReristrationView.as_view(), name='register'),
]