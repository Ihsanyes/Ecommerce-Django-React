# Generated by Django 5.2 on 2025-04-27 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0003_product_product_brand'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='product_brand',
            field=models.ManyToManyField(blank=True, related_name='product_brand', to='Products.productbrand'),
        ),
    ]
