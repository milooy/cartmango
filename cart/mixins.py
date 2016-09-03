class FilterMixin(object):
    filter_class = None

    def get_filter_class(self):
        return self.filter_class

    def get_filter(self, *args, **kwargs):
        qs = super(FilterMixin, self).get_queryset(*args, **kwargs)
        return self.get_filter_class()(self.request.GET, queryset=qs)

    def get_queryset(self, *args, **kwargs):
        return self.get_filter(*args, **kwargs).qs

    def get_context_data(self, **kwargs):
        context = super(FilterMixin, self).get_context_data(**kwargs)
        context['filter'] = self.get_filter()
        return context
