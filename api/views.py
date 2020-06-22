from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import View

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User

from .services import *

# Create your views here.
special_countries = ['Canada', 'UK']


class api_testView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'api-test.html', {})


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


class geochartView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        print('GEO ChartAPi Worked')

        return Response(choropleth_data())


class barchartView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        print('BarChartAPi Worked')

        return Response(getBarChartData())


class HistoricalDataView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        region_name = request.GET.get("region_name")
        if region_name == 'World' or region_name == '':
            region_name = 'all'

        if region_name in special_countries:
            return Response(getHistoricalCountryDataSpecial(region_name))

        return Response(getHistoricalCountryDataNormal(region_name))


class ComparisonChartView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        country1 = request.GET.get("country1")
        country2 = request.GET.get("country2")

        if country1 in special_countries or country2 in special_countries:
            country_1_data = getCountryDataSpecial(country1)
            country_2_data = getCountryDataSpecial(country2)

            data_length_1 = len(country_1_data['dates'])
            data_length_2 = len(country_2_data['dates'])
            if data_length_1 > data_length_2:
                for key, value in country_1_data.items():
                    country_1_data[key] = value[-data_length_2:]

            elif data_length_1 < data_length_2:
                for key, value in country_2_data.items():
                    country_2_data[key] = value[-data_length_1:]

        else:
            country_1_data = getCountryDataNormal(country1)
            country_2_data = getCountryDataNormal(country2)

        return Response({'country_1_data': country_1_data, 'country_2_data': country_2_data})
