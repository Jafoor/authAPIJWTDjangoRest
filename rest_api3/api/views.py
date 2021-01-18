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

@csrf_exempt
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
    
    if request.method == 'POST':
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        serializer = StudentSerializer(data=pythondata)
        if serializer.is_valid():
            serializer.save()
            res = {
                'msg': 'Data Created'
            }
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data, content_type='application/json')
        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data, content_type='application/json')
    
    if request.method == 'PUT':
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        id = pythondata.get('id')
        stu = Student.objects.get(id=id)
        serializer = StudentSerializer(stu, data=pythondata, partial=True)
        # for all data update
        # serializer = StudentSerializer(stu, data=pythondata)
        if serializer.is_valid():
            serializer.save()

            res = {
                'msg': "Updated Susessfully"
            }
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data, content_type='application/json')
        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data, content_type='application/json')
    
    if request.method == 'DELETE':
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        try:
            id = pythondata.get('id')
            stu = Student.objects.get(id=id)
            stu.delete()
            res = {'msg': 'id deleted susessfully'}
        except:
            res = {'msg': 'id already deleted!!'}
        # json_data = JSONRenderer().render(res)
        # return HttpResponse(json_data, content_type='application/json')
        # It can also be written
        return JsonResponse(res, safe=False)
