from django.core.paginator import EmptyPage
from django.db.models import Q
from django.http import Http404, HttpResponseRedirect
from django.conf import settings
from django.shortcuts import get_object_or_404, render, redirect
from django.views.generic import ListView
import django_filters

from accounts.models import MyUser
from cart.mixins import FilterMixin
from .forms import NewListForm

from .models import Product, PersonalProduct


class ProductFilter(django_filters.FilterSet):
    query = django_filters.MethodFilter()
    order = django_filters.MethodFilter()
    list = django_filters.MethodFilter()
    mall = django_filters.MethodFilter()

    class Meta:
        model = Product
        fields = ['query', 'order', 'list', 'mall']

    def filter_query(self, queryset, value):
        return queryset.filter(
            Q(product__name__icontains=value) |
            Q(product__mall__name__icontains=value) |
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
    paginate_by = 20
    # paginate_by = 3
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


def pre_product_list(request):
    return redirect('product_list', slug=request.user.email)


def get_name(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = NewListForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            return HttpResponseRedirect('/thanks/')

    # if a GET (or any other method) we'll create a blank form
    else:
        form = NewListForm()

    return render(request, 'name.html', {'form': form})