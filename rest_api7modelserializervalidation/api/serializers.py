from rest_framework import serializers
from . models import Student


class StudentSerializer(serializers.ModelSerializer):

    # name = serializers.CharField(read_only=True)
    class Meta:
        model = Student
        fields = ['name', 'roll', 'city']
        # for multiple read-only
        # read_only_fields = ['name', 'roll']

        # it can also be written
        extra_kwargs = {
            'name': {'read_only': True}
        }

