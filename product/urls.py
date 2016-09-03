from django.contrib.auth.decorators import login_required
from django.conf.urls import url
from .views import ProductListView

urlpatterns = [
    url(r'^list/$', ProductListView.as_view(), name='product_list'),
]

