from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from api.services import get_country_data, get_country_names
from django.views import View


# Create your views here.

def indexView(request):
    # world_data = get_country_data(None)

    # continents_list = ['Asia', 'Europe', 'Africa', 'North-America', 'South-America', 'Antarctica', 'Oceania',
    #                    'All']

    data = {
        'regions': get_country_names(),
        # 'world_data': world_data,
        # 'continents_list': continents_list,
    }

    return render(request, 'index.html', data)


def test_View(request):
    selected_region = 'India'

    if request.method == "POST":
        selected_region = request.POST.get("region")

    context = {
        'regions': ['usa', 'canada'],
        'selected_region': selected_region
    }

    return render(request, 'test.html', context)


def mohit_test_view(request):
    context = {
        'regions': get_country_names(include_world=False),
    }
    return render(request, 'mohit-test.html', context)

