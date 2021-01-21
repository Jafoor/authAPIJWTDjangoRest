from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer
from rest_framework import status
# @api_view(['GET'])
# def hello_world(request):
#     return Response({'msg': 'Hello World'})

@api_view(['GET','POST', 'PUT', 'PATCH', 'DELETE'])
def hello_world(request, pk=None):

    if request.method == 'GET':
        id = pk
        if id is not None:
            stu = Student.objects.get(id=id)
            serializer = StudentSerializer(stu)
            return Response(serializer.data)
        else:
            stu = Student.objects.all()
            serializer = StudentSerializer(stu, many=True)
            return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Data Created'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'PUT':
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
    

    if request.method == 'PATCH':
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
    
    if request.method == 'DELETE':
        id = pk
        stu = Student.objects.get(pk=id)
        stu.delete()
        return Response({'msg': 'id deleted'})
        



        
    