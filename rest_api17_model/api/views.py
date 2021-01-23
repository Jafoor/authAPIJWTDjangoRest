from .models import Student
from .serializers import StudentSerializer
from rest_framework import viewsets

class StudentModelViewSet(viewsets.ModelViewSet):

    queryset = Student.objects.all()
    serializer_class = StudentSerializer


# For read only model

class StudentReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Student.objects.all()
    serializer_class = StudentSerializer