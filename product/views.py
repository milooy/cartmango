from django.core.paginator import EmptyPage
from django.db.models import Q
from django.http import Http404
from django.views.generic import ListView
import django_filters
from cart.mixins import FilterMixin

from .models import Product, PersonalProduct


class ProductFilter(django_filters.FilterSet):
    query = django_filters.MethodFilter()
    order = django_filters.MethodFilter()

    class Meta:
        model = Product
        fields = ['query', 'order']

    def filter_query(self, queryset, value):
        print("쿼리")
        return queryset.filter(
            Q(product__name__icontains=value) |
            Q(tags__name__icontains=value)
        ).distinct()

    def filter_order(self, queryset, value):
        print("프라이스")
        if(value=='price-high'):
            return queryset.order_by('-product__price')
        elif(value=='price-low'):
            return queryset.order_by('product__price')
        else:
            return queryset


class ProductListView(ListView, FilterMixin):
    model = PersonalProduct
    template_name = 'list.html'
    paginate_by = 10
    filter_class = ProductFilter

    def get_queryset(self, *args, **kwargs):
        qs = super(ProductListView, self).get_queryset(*args, **kwargs)
        return self.get_filter_class()(self.request.GET, queryset=qs)

    def paginate_queryset(self, queryset, page_size):
        try:
            return super(ProductListView, self).paginate_queryset(queryset, page_size)
        except EmptyPage:
            raise Http404