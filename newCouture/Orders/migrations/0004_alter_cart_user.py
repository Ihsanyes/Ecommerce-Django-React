# Generated by Django 5.2 on 2025-05-22 03:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Orders', '0003_alter_cart_user'),
        ('Userapp', '0006_remove_customeruser_address_deliveryaddress'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='carts', to='Userapp.customeruser'),
        ),
    ]
