from django.urls import path
# from . import views
from .views import *
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    # path('', indexView.as_view(), name='home'),
    path('', indexView, name='home'),
    path('test/', test_View, name='test'),
    path('m-test/', mohit_test_view, name='mohit-test'),
]
