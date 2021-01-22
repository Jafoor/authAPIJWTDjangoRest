from django.shortcuts import render
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer
from rest_framework import status
from rest_framework import viewsets

class StudentViewSet(viewsets.ViewSet):
    def list(self, request):
        print("***List***")
        print("Basename:", self.basename)
        print("Action:", self.action)
        print("Detail:", self.detail)
        print("Suffix:", self.suffix)
        print("Description:", self.description)

        stu = Student.objects.all()
        serializer = StudentSerializer(stu, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        print("***retrieve***")
        print("Basename:", self.basename)
        print("Action:", self.action)
        print("Detail:", self.detail)
        print("Suffix:", self.suffix)
        print("Description:", self.description)
        id = pk
        if id is not None:
            stu = Student.objects.get(id=id)
            serializer = StudentSerializer(stu)
            return Response(serializer.data)

    def create(self, request):
        print("***create***")
        print("Basename:", self.basename)
        print("Action:", self.action)
        print("Detail:", self.detail)
        print("Suffix:", self.suffix)
        print("Description:", self.description)
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Data Created'}, status=status.HTTP_201_CREATED)
        return Response({'msg': 'Data Created'}, status=status.HTTP_400_BAD_REQUEST)


    def update(self, request, pk):
        print("***update***")
        print("Basename:", self.basename)
        print("Action:", self.action)
        print("Detail:", self.detail)
        print("Suffix:", self.suffix)
        print("Description:", self.description)
        id = pk
        stu = Student.objects.get(id=pk)
        serializer = StudentSerializer(stu)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Data Updated'}, status=status.HTTP_201_CREATED)
        return Response({'msg': 'Data Created'}, status=status.HTTP_400_BAD_REQUEST)


    def partial_update(self, request, pk):
        print("***partialupdate***")
        print("Basename:", self.basename)
        print("Action:", self.action)
        print("Detail:", self.detail)
        print("Suffix:", self.suffix)
        print("Description:", self.description)
        id = pk
        stu = Student.objects.get(id=pk)
        serializer = StudentSerializer(stu, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'partial Data Updated'}, status=status.HTTP_201_CREATED)
        return Response({'msg': 'Data Created'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        print("***destroy***")
        print("Basename:", self.basename)
        print("Action:", self.action)
        print("Detail:", self.detail)
        print("Suffix:", self.suffix)
        print("Description:", self.description)
        id = pk
        stu = Student.objects.get(id=id)
        stu.delete()
        return Response({'msg': 'Data Deleted'})
