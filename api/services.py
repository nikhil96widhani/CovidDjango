import requests
import json
from newsapi import NewsApiClient
import datetime
import pandas as pd
from collections import OrderedDict

# Load APIKEYS Json
with open('apikeys.json') as e:
    apikeys = json.load(e)

newsapi = NewsApiClient(api_key=apikeys['news_key'])

API_URL = "https://covid-193.p.rapidapi.com/statistics"
API_HEADERS = apikeys['rapidhostapi']

# newsapi = NewsApiClient(api_key='39970353050840afa44ca78302ff74c4')
#
# API_URL = "https://covid-193.p.rapidapi.com/statistics"
# API_HEADERS = {
#     'x-rapidapi-host': "covid-193.p.rapidapi.com",
#     'x-rapidapi-key': "fb8f421233msh953fc9948591258p1cda27jsn49967ddef37d"
# }

# Load Country Json
with open('country_codes.json') as f:
    country_codes = json.load(f)


def get_country_data(country):
    querystring = {"country": country}
    response = requests.request("GET", API_URL, headers=API_HEADERS, params=querystring)
    data = json.loads(response.text)['response']

    # data = {'data': data}
    # print(data)
    return data


def get_country_names(include_world=True):
    url = "https://covid-193.p.rapidapi.com/countries"

    response = requests.request("GET", url, headers=API_HEADERS)
    data = json.loads(response.text)['response']
    if include_world:
        data.insert(0, 'World')

    return data


def choropleth_data():
    world_data = get_country_data(None)
    continents_list = ['Asia', 'Europe', 'Africa', 'North-America', 'South-America', 'Antarctica', 'Oceania',
                       'All']

    country_fix = {"USA": "United States", "Saudi-Arabia": "Saudi Arabia", "UK": "United Kingdom",
                   "South-Africa": "South Africa", "DRC": "CD", "South-Sudan": "SS", "Papua-New-Guinea": "PG",
                   "New-Zealand": "New Zealand", "Sri-Lanka": "Sri Lanka"}

    data = [['Country', 'Cases']]

    for country in world_data:
        if country['country'] not in continents_list:
            if country['country'] in country_fix:
                data.append(['{}'.format(country_fix.get(country['country'])), country['cases']['total']])
            else:
                data.append(['{}'.format(country['country']), country['cases']['total']])

    return data


class GetNews:
    def __init__(self, country, no_of_articles):
        self.country = country.lower()
        self.no_of_articles = no_of_articles
        self.get_country_code()

    def get_country_code(self):
        try:
            for x in country_codes:
                try:
                    if x['name'].lower() == self.country:
                        self.country_code = x['alpha2code'].lower()
                except:
                    self.country_code = ''
        except:
            self.country_code = ''

    def get_articles(self):
        try:
            top_headlines = newsapi.get_top_headlines(q='Covid-19',
                                                      # language='en',
                                                      country=self.country_code
                                                      )
            news_headlines = top_headlines['articles'][:self.no_of_articles]

            if news_headlines:
                return news_headlines
            else:
                top_headlines = newsapi.get_everything(q='Covid-19 {}'.format(self.country),
                                                       # language='en',
                                                       # country=country_code
                                                       )
                return top_headlines['articles'][:self.no_of_articles]
        except:
            top_headlines = newsapi.get_everything(q='Covid-19 {}'.format(self.country),
                                                   # language='en',
                                                   # country=country_code
                                                   )
            return top_headlines['articles'][:self.no_of_articles]


def linechart_data():
    import requests

    url = "https://covid-193.p.rapidapi.com/history"

    querystring = {
        # "day": "2020-04-05",
        "country": "canada"
    }

    response = requests.request("GET", url, headers=API_HEADERS, params=querystring)
    data = json.loads(response.text)['response']

    # gen list
    a = []
    for entry in data:
        x = {
            'day': entry['day'],
            # 'time': entry['time'],
            'cases': entry['cases']['total'],
            'recovered': entry['cases']['recovered'],
            'deaths': entry['deaths']['total']
        }
        a.append(x)
    df = pd.DataFrame(a)

    # Removed Time Sort because data is in ascending format
    # df['time'] = pd.to_datetime(df['time'])
    # df = df.sort_values(by='time', ascending=True)

    df = df.drop_duplicates(subset='day', keep="first")
    df = df.sort_values(by='day', ascending=True)
    df = df.dropna()
    # del df['time']
    # df = df.iloc[-30:]
    df_list = df.values.tolist()

    return df_list
    # for entry in data:
    #     print(entry['day'])


def getBarChartData():
    url = "https://disease.sh/v2/historical?lastdays=7"

    response = requests.request("GET", url)
    data = json.loads(response.text)

    lista = []

    for x in data:
        a = {
            "country": x['country'],
            "last": list(x['timeline']['cases'].values())[-1],
            "first": list(x['timeline']['cases'].values())[0]
        }
        lista.append(a)

    df = pd.DataFrame(lista)
    df = df.groupby(['country'], as_index=False).sum()
    df['difference'] = df['last'] - df['first']
    df = df.sort_values('difference', ascending=False)
    df = df[:10]

    return [df.country.tolist(), df.difference.tolist()]


def getCountryDataNormal(country_name):
    url = f"https://disease.sh/v2/historical/{country_name}?lastdays=60"

    response = requests.request("GET", url)
    data = json.loads(response.text)

    try:
        ordered_cases = OrderedDict(data['cases'])
    except KeyError:
        data = data['timeline']
        ordered_cases = OrderedDict(data['cases'])

    dates = list(ordered_cases.keys())
    total = list(ordered_cases.values())

    recovered = list(OrderedDict(data['recovered']).values())
    deaths = list(OrderedDict(data['deaths']).values())

    active = [t - (r + d) for (t, r, d) in zip(total, recovered, deaths)]

    last_date = datetime.datetime.strptime(dates[-1], "%m/%d/%y")
    new_date = last_date + datetime.timedelta(days=1)
    new_date_string = datetime.datetime.strftime(new_date, "%m/%d/%y")

    # Appended a new date due to a issue with the Apex Line Chart
    del dates[0]
    dates.append(new_date_string)

    country_total_data = {'dates': dates, 'total': total, 'active': active, 'recovered': recovered, 'deaths': deaths}

    print('Country Data Normal API worked')
    return country_total_data


def getHistoricalCountryDataNormal(country_name):
    url = f"https://disease.sh/v2/historical/{country_name}?lastdays=60"

    response = requests.request("GET", url)
    data = json.loads(response.text)

    try:
        ordered_cases = OrderedDict(data['cases'])
    except KeyError:
        data = data['timeline']
        ordered_cases = OrderedDict(data['cases'])

    dates = list(ordered_cases.keys())
    total = list(ordered_cases.values())

    recovered = list(OrderedDict(data['recovered']).values())
    deaths = list(OrderedDict(data['deaths']).values())

    active = [t - (r + d) for (t, r, d) in zip(total, recovered, deaths)]

    last_date = datetime.datetime.strptime(dates[-1], "%m/%d/%y")
    new_date = last_date + datetime.timedelta(days=1)
    new_date_string = datetime.datetime.strftime(new_date, "%m/%d/%y")

    # Appended a new date due to a issue with the Apex Line Chart
    del dates[0]
    dates.append(new_date_string)

    total_days = int(len(dates))
    days_for_bar_chart = 14
    daily_cases, daily_recovered, daily_deaths = [], [], []
    for x in range(total_days - days_for_bar_chart, total_days):
        daily_cases.append(total[x] - total[x - 1])
        daily_recovered.append(recovered[x] - recovered[x - 1])
        daily_deaths.append(deaths[x] - deaths[x - 1])

    total_cases_change = daily_cases[-1]
    recovered_cases_change = daily_recovered[-1]
    deaths_change = daily_deaths[-1]
    active_cases_change = total_cases_change - (recovered_cases_change + deaths_change)

    current_total = total[-1]
    current_active = active[-1]
    current_recovered = recovered[-1]
    current_deaths = deaths[-1]

    recovered_percentage = round((current_recovered / current_total) * 100)
    deaths_percentage = round((current_deaths / current_total) * 100)
    active_percentage = 100 - (recovered_percentage + deaths_percentage)

    recovery_chances = round((current_recovered * 100) / (current_recovered + current_deaths))
    recovery_death_chances = [recovery_chances, (100 - recovery_chances)]

    card_data = {'current_total': current_total, 'current_active': current_active,
                 'current_recovered': current_recovered, 'current_deaths': current_deaths,
                 'total_cases_change': total_cases_change, 'active_cases_change': active_cases_change,
                 'recovered_cases_change': recovered_cases_change, 'deaths_change': deaths_change,
                 'progress_active_percentage': active_percentage, 'progress_recovered_percentage': recovered_percentage,
                 'progress_deaths_percentage': deaths_percentage, 'recovery_death_chances': recovery_death_chances}
    line_chart_data = {'dates': dates, 'total': total, 'active': active, 'recovered': recovered, 'deaths': deaths}
    bar_chart_data = {'dates': dates[-days_for_bar_chart:], 'daily_cases': daily_cases,
                      'daily_recovered': daily_recovered, 'daily_deaths': daily_deaths}

    charts_data = {'card_data': card_data, 'line_chart_data': line_chart_data, 'bar_chart_data': bar_chart_data}
    print('Historical Data Normal API worked')
    return charts_data


def getCountryDataSpecial(country_name):
    url = "https://covid-193.p.rapidapi.com/history"

    querystring = {
        "country": country_name
    }

    response = requests.request("GET", url, headers=API_HEADERS, params=querystring)
    data = json.loads(response.text)['response']
    data.reverse()

    total, recovered, active, deaths, dates = [], [], [], [], []
    day = data[0]['day']
    for x in data:
        if day != x['day']:
            total.append(x['cases']['total'])
            active.append(x['cases']['active'])
            recovered.append(x['cases']['recovered'])
            deaths.append(x['deaths']['total'])
            dates.append(day)
            day = x['day']

    total.append(data[-1]['cases']['total'])
    active.append(data[-1]['cases']['active'])
    recovered.append(data[-1]['cases']['recovered'])
    deaths.append(data[-1]['deaths']['total'])
    dates.append(data[-1]['day'])

    country_total_data = {'dates': dates, 'total': total, 'active': active, 'recovered': recovered, 'deaths': deaths}

    print('Country Data Special API worked')
    return country_total_data


def getHistoricalCountryDataSpecial(region_name):
    url = "https://covid-193.p.rapidapi.com/history"

    querystring = {
        "country": region_name
    }

    response = requests.request("GET", url, headers=API_HEADERS, params=querystring)
    data = json.loads(response.text)['response']
    data.reverse()

    total, recovered, active, deaths, dates = [], [], [], [], []
    day = data[0]['day']
    for x in data:
        if day != x['day']:
            total.append(x['cases']['total'])
            active.append(x['cases']['active'])
            recovered.append(x['cases']['recovered'])
            deaths.append(x['deaths']['total'])
            dates.append(day)
            day = x['day']

    current_total = data[-1]['cases']['total']
    current_active = data[-1]['cases']['active']
    current_recovered = data[-1]['cases']['recovered']
    current_deaths = data[-1]['deaths']['total']

    total.append(current_total)
    active.append(current_active)
    recovered.append(current_recovered)
    deaths.append(current_deaths)
    dates.append(data[-1]['day'])

    total_days = int(len(dates))
    days_for_bar_chart = 14
    daily_cases, daily_recovered, daily_deaths = [], [], []
    for x in range(total_days - days_for_bar_chart, total_days):
        daily_cases.append(total[x] - total[x - 1])
        daily_recovered.append(recovered[x] - recovered[x - 1])
        daily_deaths.append(deaths[x] - deaths[x - 1])

    total_cases_change = daily_cases[-1]
    recovered_cases_change = daily_recovered[-1]
    deaths_change = daily_deaths[-1]
    active_cases_change = total_cases_change - (recovered_cases_change + deaths_change)

    recovered_percentage = round((current_recovered / current_total) * 100)
    deaths_percentage = round((current_deaths / current_total) * 100)
    active_percentage = 100 - (recovered_percentage + deaths_percentage)

    recovery_chances = round((current_recovered * 100) / (current_recovered + current_deaths))
    recovery_death_chances = [recovery_chances, (100 - recovery_chances)]

    card_data = {'current_total': current_total, 'current_active': current_active,
                 'current_recovered': current_recovered, 'current_deaths': current_deaths,
                 'total_cases_change': total_cases_change, 'active_cases_change': active_cases_change,
                 'recovered_cases_change': recovered_cases_change, 'deaths_change': deaths_change,
                 'progress_active_percentage': active_percentage, 'progress_recovered_percentage': recovered_percentage,
                 'progress_deaths_percentage': deaths_percentage, 'recovery_death_chances': recovery_death_chances}
    line_chart_data = {'dates': dates, 'total': total, 'active': active, 'recovered': recovered, 'deaths': deaths}
    bar_chart_data = {'dates': dates[-days_for_bar_chart:], 'daily_cases': daily_cases,
                      'daily_recovered': daily_recovered, 'daily_deaths': daily_deaths}

    charts_data = {'card_data': card_data, 'line_chart_data': line_chart_data, 'bar_chart_data': bar_chart_data}
    print('Historical Data Special API worked')
    return charts_data

