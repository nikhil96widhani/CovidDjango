import requests
import json
from newsapi import NewsApiClient
import datetime
import pandas as pd

newsapi = NewsApiClient(api_key='39970353050840afa44ca78302ff74c4')

API_URL = "https://covid-193.p.rapidapi.com/statistics"
API_HEADERS = {
    'x-rapidapi-host': "covid-193.p.rapidapi.com",
    'x-rapidapi-key': "e0d880658amsh5707d8639e35fc3p1e7243jsn0bc77771acc8"
}

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


def get_country_names():
    url = "https://covid-193.p.rapidapi.com/countries"

    headers = {
        'x-rapidapi-host': "covid-193.p.rapidapi.com",
        'x-rapidapi-key': "e0d880658amsh5707d8639e35fc3p1e7243jsn0bc77771acc8"
    }

    response = requests.request("GET", url, headers=headers)
    data = json.loads(response.text)['response']
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
        "country": "All"
    }

    headers = {
        'x-rapidapi-host': "covid-193.p.rapidapi.com",
        'x-rapidapi-key': "e0d880658amsh5707d8639e35fc3p1e7243jsn0bc77771acc8"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)
    data = json.loads(response.text)['response']

    # gen list
    a=[]
    for entry in data:
        x = {
            'day': entry['day'],
            'time': entry['time'],
            'cases': entry['cases']['total'],
            'recovered': entry['cases']['recovered'],
            'deaths': entry['deaths']['total']
        }
        a.append(x)
    df = pd.DataFrame(a)
    df['time'] = pd.to_datetime(df['time'])
    df = df.sort_values(by='time', ascending=True)
    df = df.drop_duplicates(subset='day', keep="first")
    df = df.dropna()
    del df['time']
    df = df.iloc[-30:]
    df_list = df.values.tolist()

    return df_list
    # for entry in data:
    #     print(entry['day'])

