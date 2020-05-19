from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from .services import *
from django.views import View
import requests
import json


# Create your views here.

def indexView(request):
    selected_region = 'All'

    if request.method == "GET":
        # print(request.POST.get("region"))
        # Filter restaurants by selected region, but only on a POST
        selected_region = request.GET.get("region")
        if selected_region is None:
            selected_region = 'All'
        elif selected_region == '':
            selected_region = 'All'
        elif selected_region == 'World':
            selected_region = 'All'
        else:
            pass

    regional_data = get_country_data(selected_region)

    world_data = get_country_data(None)

    continents_list = ['Asia', 'Europe', 'Africa', 'North-America', 'South-America', 'Antarctica', 'Oceania',
                       'All', 'Australia']

    # news = GetNews(selected_region, 5)
    # news.get_articles()

    if selected_region == "All":
        selected_region = 'World'
    else:
        pass

    data = {
        'regions': get_country_names(),
        'selected_region': selected_region,
        'regional_data': regional_data,
        'world_data': world_data,
        'continents_list': continents_list,
        # 'news': news.get_articles()
    }

    return render(request, 'index.html', data)


# class indexView(View):
#     data_all = get_country_data('All')
#
#     selected_region = 'India'
#
#     template_name = 'index.html'
#
#     def get(self, request, *args, **kwargs):
#         regional_data = get_country_data(self.selected_region)
#
#         data = {
#             'regions': ['India', 'Canada', 'USA', 'Germany'],
#             'selected_region': self.selected_region,
#             'data_all': self.data_all,
#             'regional_data': regional_data,
#         }
#         return render(request, self.template_name, data)
#
#     def post(self, request, *args, **kwargs):
#         selected_region = request.POST.get("region")
#         regional_data = get_country_data(selected_region)
#         if regional_data:
#             regional_data = get_country_data(selected_region)
#
#             data = {
#                 'regions': ['India', 'Canada', 'USA', 'Germany'],
#                 'selected_region': selected_region,
#                 'data_all': self.data_all,
#                 'regional_data': regional_data,
#             }
#
#         return render(request, self.template_name, data)


def test_View(request):
    selected_region = 'India'

    if request.method == "POST":
        # Filter restaurants by selected region, but only on a POST
        selected_region = request.POST.get("region")
    #     restaurants = restaurants.filter(region=selected_region)
    #
    #     # Get a list of all unique regions (group by region)
    # regions = Restaurant.objects.order_by('region').values_list('region', flat=True)

    context = {
        'regions': ['usa', 'canada'],
        'selected_region': selected_region
    }

    return render(request, 'test.html', context)
