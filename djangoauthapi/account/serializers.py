from rest_framework import serializers
from account.models import User

class UserReristrationSerializer(serializers.ModelSerializer):
    # We are writing this because we need confirm password field in our Registration Request 
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'password2', 'tc']
        extra_kwargs={
            'password':{'write_only':True}
        }