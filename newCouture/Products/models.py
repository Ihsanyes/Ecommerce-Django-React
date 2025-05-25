from django.db import models
from django.db.models import CharField, IntegerField, ForeignKey
from django.core.validators import MinValueValidator, MaxValueValidator


# Create your models here.
class CategoryGroup(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table ='.category_groups'

class Category(models.Model):
    categoryGroup = models.ForeignKey(CategoryGroup,on_delete=models.CASCADE, related_name='category_groups')
    name = models.CharField(max_length=100,unique=True)
    description = models.TextField(blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'category'

class ProductBrand(models.Model):
    name = models.CharField(max_length=100,unique=True,null=True,blank=True)

class Product(models.Model):
    # PRODUCT_BRAND = [
    #     ('Voroxy','Voroxy'),
    #     ('King Craft','King Craft'),
    #     ('Nike','Nike'),
    #     ('TagDO','TagDO'),
    #     ('Allen Solly','Allen Solly'),
    #     ('Adidas','Adidas'),
    #     ('Armani','Armani'),
    #     ('Zara','Zara'),
    #     ('Puma','Puma'),
    #     ('Louis Philippe','Louis Philippe'),
    #     ('Reebok','Reebok'),
    #     ('Patagonia','Patagonia'),
    #     ('Gucci','Gucci'),
    #     ('H&M','H&M'),
    #     ('Dior','Dior'),
    #     ('Burberry','Burberry'),
    #     ('Guess','Guess'),
    #     ('Calvin Klein','Calvin Klein'),
    #     ('Prada','Prada'),
    #     ('Hermes','Hermes'),
    #     ('Dolce & Gabbana','Dolce & Gabbana'),
    #     ('Chanel','Chanel'),
    #     ('Fendi','Fendi'),
    #     ('Prince','Prince'),
    #     ('Valentino','Valentino'),
    # ]
    category = models.ForeignKey(Category,on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=200)
    product_brand = models.ForeignKey(ProductBrand,on_delete=models.CASCADE, related_name='product_brand',null=True, blank=True)
    description = models.TextField(blank=True,null=True)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    discount_off = models.IntegerField(default=0,validators=[MinValueValidator(0), MaxValueValidator(100)],null=True, blank=True)
    image = models.ImageField(upload_to='product-image/',blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'products'

class Size(models.Model):
    SIZE_CHOICES = [
        # Standard Clothing Sizes
        ('Free','Free'),
        ('XS', 'Extra Small'),
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
        ('XXL', 'Double Extra Large'),
        ('XXXL', 'Triple Extra Large'),

        # Jeans & Pants (Waist Sizes) - Prefixed with 'W' to avoid clash
        ('W28', 'Waist 28'),
        ('W30', 'Waist 30'),
        ('W32', 'Waist 32'),
        ('W34', 'Waist 34'),
        ('W36', 'Waist 36'),
        ('W38', 'Waist 38'),
        ('W40', 'Waist 40'),
        ('W42', 'Waist 42'),

        # Women's Dresses - Prefixed with 'D' to avoid clash
        ('D2', 'Size 2'),
        ('D4', 'Size 4'),
        ('D6', 'Size 6'),
        ('D8', 'Size 8'),
        ('D10', 'Size 10'),
        ('D12', 'Size 12'),
        ('D14', 'Size 14'),
        ('D16', 'Size 16'),

        # Shoe Sizes (EU)
        ('EU36', 'EU 36'),
        ('EU37', 'EU 37'),
        ('EU38', 'EU 38'),
        ('EU39', 'EU 39'),
        ('EU40', 'EU 40'),

        # Shoe Sizes (US)
        ('US6', 'US 6'),
        ('US7', 'US 7'),
        ('US8', 'US 8'),
        ('US9', 'US 9'),

        # Shoe Sizes (UK)
        ('UK5', 'UK 5'),
        ('UK6', 'UK 6'),
        ('UK7', 'UK 7'),
        ('UK8', 'UK 8'),
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product_sizes")
    size = models.CharField(max_length=5, choices=SIZE_CHOICES)
    stock = models.PositiveIntegerField(default=0)  # Stock per size
    class Meta:
        db_table = 'size'

