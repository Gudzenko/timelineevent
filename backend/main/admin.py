from django.contrib import admin

from .models import Device, Robot, Car, Guardian, Event

admin.site.register(Device)
admin.site.register(Robot)
admin.site.register(Car)
admin.site.register(Guardian)
admin.site.register(Event)
