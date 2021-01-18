from django.shortcuts import render
from .models import Student
#rest_api2
import io
from rest_framework.parsers import JSONParser
from .serializers import StudentSerializer
from rest_framework.renderers import JSONRenderer
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse

# # Create your views here.
# def student_detail(request,pk):
#     stu = Student.objects.get(id=pk)
#     print(stu)
#     serializer = StudentSerializer(stu)
#     print(serializer)
#     print(serializer.data)
#     json_data = JSONRenderer().render(serializer.data)
#     print(json_data)

#     return HttpResponse(json_data, content_type='application/json')


# # All student list
# def all_students(request):
#     stu = Student.objects.all()
#     print(stu)
#     serializer = StudentSerializer(stu, many=True)
#     # print(serializer)
#     # print(serializer.data)
#     # json_data = JSONRenderer().render(serializer.data)
#     # print(json_data)

#     # return HttpResponse(json_data, content_type='application/json')
#     return JsonResponse(serializer.data, safe=False)

def student_info(request):
    if request.method == 'GET':
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        id = pythondata.get('id', None)

        if id is not None:
            stu = Student.objects.get(id=id)
            print(stu)
            serializer = StudentSerializer(stu)
            json_data = JSONRenderer().render(serializer.data)
            return HttpResponse(json_data, content_type='application/json')
        else:
            stu = Student.objects.all()
            serializer = StudentSerializer(stu, many=True)
            json_data = JSONRenderer().render(serializer.data)
            return HttpResponse(json_data, content_type='application/json')