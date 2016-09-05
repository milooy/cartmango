from django.conf.urls import url
from rest_framework.authtoken import views as token_views

from api import views

urlpatterns = [
    # rest framework
    url(r'^product/$', views.ProductViewSet.as_view({'get': 'list'})),
]
