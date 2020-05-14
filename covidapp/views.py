from django.shortcuts import render, redirect
from .services import *


# Create your views here.

def indexView(request):
    data_all = get_country_data('All')

    selected_region = 'India'

    if request.method == "POST":
        # Filter restaurants by selected region, but only on a POST
        selected_region = request.POST.get("region")

    regional_data = get_country_data(selected_region)

    data = {
        'regions': ['India', 'Canada', 'USA'],
        'selected_region': selected_region,
        'data_all': data_all,
        'regional_data': regional_data,
    }

    return render(request, 'index.html', data)


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
