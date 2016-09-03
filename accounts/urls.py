from django.conf.urls import url
from .views import signup
from django.views.generic.base import TemplateView
from django.contrib.auth import views as auth_views

urlpatterns = [
    url(r'^signup/$', signup, name='signup'),
    url(r'^signup_ok/$', TemplateView.as_view(template_name='signup_ok.html'), name='signup_ok'),
    url(r'^login/$', auth_views.login, {'template_name': 'login.html'}, name='login'),
    # url(r'^login/$', 'django.contrib.auth.views.login', name='login_url'),
    url(r'^logout/$', auth_views.logout, {'next_page': '/login/'}, name='logout'),
]