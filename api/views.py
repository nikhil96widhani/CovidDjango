from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import View

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User

from .services import *


# Create your views here.

class api_testView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'api-test.html', {})


# def world_statsView(request, *args, **kwargs):
#     data = {'name': 'Vineet',
#             'college': 'MANIT'}
#     data = {'name': [
#         ['2020-03-21', 304900, 94793, 13001],
#         ['2020-03-22', 306677, 94798, 13017],
#         ['2020-03-23', 336068, 97636, 14613],
#         ['2020-03-24', 378492, 101608, 16495],
#         ['2020-03-25', 421187, 108328, 18804],
#         ['2020-03-26', 468299, 113812, 21180],
#         ['2020-03-27', 529614, 123380, 23976]
#         ]}
#     return JsonResponse(data)

class world_statsView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        region_name = request.GET.get("region")

        if region_name == 'World':
            region_name = 'All'

        print('World Stats Worked')
        data = get_country_data(region_name)

        return Response(data)


class tablesView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        data = get_country_data(None)
        print('Table ChartAPi Worked')

        return Response(data)



class newsView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):

        if request.GET.get("region"):
            region_name = request.GET.get("region")
        else:
            region_name = 'World'

        print('NewsAPi Worked')

        news = GetNews(region_name, 6)

        return Response(news.get_articles())


class lineChartView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):

        print('Line ChartAPi Worked')

        data_line_chart = linechart_data()

        return Response(data_line_chart)

class geochartView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):

        print('GEO ChartAPi Worked')

        return Response(choropleth_data())
