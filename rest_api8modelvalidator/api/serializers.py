from rest_framework import serializers
from . models import Student

# Validator
# def start_with_r(value):
#     if value[0].lower() != 's':
#         raise serializers.ValidationError('Name should be start with r')

class StudentSerializer(serializers.ModelSerializer):

    # id = serializers.IntegerField()
    # name = serializers.CharField(max_length=100, validators=[start_with_r])
    # roll = serializers.IntegerField()
    # city = serializers.CharField(max_length=100) 

    class Meta:
        model = Student
        fields = ['name', 'roll', 'city']    

    # def create(self, validate_data):
    #     return Student.objects.create(**validate_data)
    
    # def update(self,instance, validate_data):

    #     instance.name = validate_data.get('name', instance.name)
    #     instance.roll = validate_data.get('roll', instance.roll)
    #     instance.city = validate_data.get('city', instance.city)

    #     instance.save()
    #     return instance
    # # Field level validator
    def validate_roll(self, value):
        if value >= 170150:
            raise serializers.ValidationError('CSE Fill-up')
        return value

    # Object Level Validation
    # def validate(self, data):
    #     nm = data.get('name')
    #     ct = data.get('city')
    #     if nm.lower() == 'munnam' and ct.lower() != 'dhaka':
    #         raise serializers.ValidationError('City must be Dhaka')
    #     return data
