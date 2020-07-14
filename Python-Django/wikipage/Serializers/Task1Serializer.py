from rest_framework import serializers

class Task1Serializer(serializers.Serializer):
    year = serializers.IntegerField(read_only=True)
    count = serializers.IntegerField(read_only=True)
  
    def create(self, validated_data):
        return Task1(id=None, **validated_data)

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        return instance