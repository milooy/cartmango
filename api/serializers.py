from django.conf import settings
from product.models import Product

from rest_framework import (serializers)


class StringListField(serializers.ListField):
    child = serializers.CharField()

    def to_representation(self, data):
        return ','.join(data.values_list('name', flat=True))


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('nickname', 'email')


class ProductSerializer(serializers.ModelSerializer):
    tags = StringListField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'mall', 'tags', 'thumbnail_url', 'created']



