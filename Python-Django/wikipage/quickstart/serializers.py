from rest_framework import serializers
from wikipage.tasks import Task1,Task2

class Task1Serializer(serializers.Serializer):
    year = serializers.IntegerField(read_only=True)
    count = serializers.IntegerField(read_only=True)
  
    def create(self, validated_data):
        return Task1(id=None, **validated_data)

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        return instance

class Task2Serializer(serializers.Serializer):
    name = serializers.CharField(max_length=256) 
    total = serializers.IntegerField(read_only=True)
    totalPerSection = serializers.IntegerField(read_only=True)
  
    def create(self, validated_data):
        return Task2(id=None, **validated_data)

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        return instance        