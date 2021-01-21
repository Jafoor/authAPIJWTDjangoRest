from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer
from rest_framework import status
from rest_framework.views import APIView
# @api_view(['GET'])
# def hello_world(request):
#     return Response({'msg': 'Hello World'})
class StudentAPI(APIView):
    def get(self, request, format=None, pk=None):
        id = pk
        if id is not None:
            stu = Student.objects.get(id=id)
            serializer = StudentSerializer(stu)
            return Response(serializer.data)
        else:
            stu = Student.objects.all()
            serializer = StudentSerializer(stu, many=True)
            return Response(serializer.data)
    def post(self, request, fomate=None):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Data Created'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, formate=None, pk=None):
        id = pk
        try:
            stu = Student.objects.get(pk=id)
            serializer = StudentSerializer(stu, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'msg': 'Complete data updated'})
            return Response(serializer.errors)
        except:
            return Response({'msg': 'check your id'})
    
    def patch(self, request, formate=None, pk=None):
        id = pk
        try:
            stu = Student.objects.get(pk=id)
            serializer = StudentSerializer(stu, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'msg': 'Partial data updated'})
            return Response(serializer.errors)
        except:
            return Response({'msg': 'check your id'})
    
    def delete(self, request, formate=None, pk=None):
        id = pk
        stu = Student.objects.get(pk=id)
        stu.delete()
        return Response({'msg': 'id deleted'})

        



        
    