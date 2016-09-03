from django.views.generic import TemplateView, ListView


class HomeView(TemplateView):
    template_name = 'home.html'

    # def get_context_data(self, **kwargs):
    #     context = super(ProfileView, self).get_context_data(**kwargs)
    #     context.update({
    #         'pa': PointAction(self.request.user),
    #         'has_point_history': PointLog.objects.filter(user=self.request.user).exists()
    #     })
    #     return context
