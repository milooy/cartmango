from django.contrib.auth.decorators import login_required
from django.conf.urls import url
from .views import ProductListView

urlpatterns = [
    url(r'^list/$', login_required(ProductListView.as_view()), name='product_list'),
]

