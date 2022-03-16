from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from account.serializers import UserReristrationSerializer

class UserReristrationView(APIView):

    def post(self, request, format=None):
        serializer = UserReristrationSerializer()
        return Response({'msg':'Registration Succesful!'})
