from django.contrib.auth.decorators import login_required
from django.conf.urls import url
from .views import ProductListView, personal_product_list, pre_product_list

urlpatterns = [
    # TODO: S로 해도 되나? @ 넣으려면 어케 해야지
    url(r'^(?P<slug>[-\S]+)/list/$', personal_product_list, name='product_list'),
    url(r'^(?P<slug>[-\S]+)/list/items/$', login_required(ProductListView.as_view()), name='product_list2'),
    url(r'^list/$', login_required(pre_product_list), name='pre_product_list'),
]

