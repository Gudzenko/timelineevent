from django.db import models


class Device(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Robot(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Car(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Guardian(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Event(models.Model):
    name = models.CharField(max_length=255)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    city = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    robots = models.ManyToManyField(Robot, blank=True)
    devices = models.ManyToManyField(Device, blank=True)
    cars = models.ManyToManyField(Car, blank=True)
    guardians = models.ManyToManyField(Guardian, blank=True)

    def __str__(self):
        return f"{self.name}/{self.city}/{self.start_datetime}"
