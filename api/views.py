from .serializers import ProductSerializer
from product.models import Product
from rest_framework import (serializers, permissions, status, viewsets)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # permission_classes = (permissions.IsAdminUser,)
