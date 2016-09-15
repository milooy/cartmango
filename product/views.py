from django.core.paginator import EmptyPage
from django.db.models import Q
from django.http import Http404
from django.conf import settings
from django.shortcuts import get_object_or_404, render
from django.views.generic import ListView
import django_filters

from accounts.models import MyUser
from cart.mixins import FilterMixin

from .models import Product, PersonalProduct


class ProductFilter(django_filters.FilterSet):
    query = django_filters.MethodFilter()
    order = django_filters.MethodFilter()
    list = django_filters.MethodFilter()

    class Meta:
        model = Product
        fields = ['query', 'order', 'list']

    def filter_query(self, queryset, value):
        return queryset.filter(
            Q(product__name__icontains=value) |
            Q(tags__name__icontains=value)
        ).distinct()

    def filter_order(self, queryset, value):
        if(value=='price-high'):
            return queryset.order_by('-product__price')
        elif(value=='price-low'):
            return queryset.order_by('product__price')
        else:
            return queryset

    def filter_list(self, queryset, value):
        if(value=='favorite'):
            return queryset.filter(Q(is_favorite=True))
        elif(value=='archive'):
            return queryset.filter(Q(is_archived=True))
        else:
            return queryset


class ProductListView(ListView, FilterMixin):
    model = PersonalProduct
    template_name = '_product_list.html'
    paginate_by = 3
    filter_class = ProductFilter

    def get_queryset(self, *args, **kwargs):
        if self.kwargs.get('slug'):
            qs = super(ProductListView, self).get_queryset(*args, **kwargs)\
                .filter(user__email=self.kwargs['slug'])
        return self.get_filter_class()(self.request.GET, queryset=qs)

    def paginate_queryset(self, queryset, page_size):
        try:
            return super(ProductListView, self).paginate_queryset(queryset, page_size)
        except EmptyPage:
            raise Http404


def personal_product_list(request, slug):
    user = get_object_or_404(MyUser, email=slug)
    return render(request, 'list.html', {'user':user})
