from rest_framework import serializers

from ProductOwners.models import OwnerUser


class OwnerSerializer(serializers.ModelSerializer):
    model = OwnerUser
    fields = "__all__"