from django.urls import path
# from . import views
from .views import *
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    # path('', indexView.as_view(), name='home'),
    path('', api_testView.as_view(), name='api'),
    path('worldstats/', world_statsView.as_view(), name='worldstats'),
    path('tabledata/', tablesView.as_view(), name='tabledata'),
    path('news/', newsView.as_view(), name='news'),
    path('geochart/', geochartView.as_view(), name='geochart'),
    path('barchart/', barchartView.as_view(), name='barchart'),
    path('historical/', HistoricalDataView.as_view(), name='historical'),
    path('comparison/', ComparisonChartView.as_view(), name='comparison'),
]
