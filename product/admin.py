from django.contrib import admin
from .models import Product, Mall, PersonalProduct

admin.site.register(Product)
admin.site.register(PersonalProduct)
admin.site.register(Mall)
