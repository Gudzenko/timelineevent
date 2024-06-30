# main/serializers.py
from rest_framework import serializers
from .models import Event, Device, Robot, Car, Guardian


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['id', 'name']


class RobotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Robot
        fields = ['id', 'name']


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'name']


class GuardianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guardian
        fields = ['id', 'name']


class EventSerializer(serializers.ModelSerializer):
    devices = DeviceSerializer(many=True, read_only=True)
    robots = RobotSerializer(many=True, read_only=True)
    cars = CarSerializer(many=True, read_only=True)
    guardians = GuardianSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = [
            'id', 'name', 'start_datetime', 'end_datetime', 'city',
            'description', 'devices', 'robots', 'cars', 'guardians'
        ]
