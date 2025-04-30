from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class OwnerUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    custom_name = models.CharField(max_length=100,null=True,blank=True)
    class Meta:
        db_table ="owner_user"
