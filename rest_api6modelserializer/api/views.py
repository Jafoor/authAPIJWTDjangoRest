from django.shortcuts import render
from .models import Student
#rest_api2
import io
from rest_framework.parsers import JSONParser
from .serializers import StudentSerializer
from rest_framework.renderers import JSONRenderer
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views import View


@method_decorator(csrf_exempt, name='dispatch')
class StudentAPI(View):
    def get(self, request, *args, **kwargs):
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
    

    def post(self, request, *args, **kwargs):
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
    
    def put(self, request, *args, **kwargs):
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
    

    def delete(self, request, *args, **kwargs):
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
    