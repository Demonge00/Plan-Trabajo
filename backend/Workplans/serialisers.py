from rest_framework import serializers
from Workplans.models import *


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'email']

    def get_name(self, obj):
        return obj.name
