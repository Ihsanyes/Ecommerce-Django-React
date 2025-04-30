from django.contrib import admin

from Products.models import CategoryGroup, Category, ProductBrand, Product,Size

# Register your models here.

admin.site.register(CategoryGroup)
admin.site.register(Category)
admin.site.register(ProductBrand)
admin.site.register(Product)
admin.site.register(Size)



