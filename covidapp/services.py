import requests
import json
from newsapi import NewsApiClient

newsapi = NewsApiClient(api_key='39970353050840afa44ca78302ff74c4')

API_URL = "https://covid-193.p.rapidapi.com/statistics"
API_HEADERS = {
    'x-rapidapi-host': "covid-193.p.rapidapi.com",
    'x-rapidapi-key': "e0d880658amsh5707d8639e35fc3p1e7243jsn0bc77771acc8"
}


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


# class GetNews:
#     def __init__(self, country, no_of_articles):
#         self.country = country.lower()
#         self.no_of_articles = no_of_articles
#         self.get_country_code()
#
#     def get_country_code(self):
#         url = "https://covid-19-data.p.rapidapi.com/help/countries"
#
#         querystring = {"format": "json"}
#
#         headers = {
#             'x-rapidapi-host': "covid-19-data.p.rapidapi.com",
#             'x-rapidapi-key': "e0d880658amsh5707d8639e35fc3p1e7243jsn0bc77771acc8"
#         }
#
#         response = requests.request("GET", url, headers=headers, params=querystring)
#
#         for x in response.json():
#             try:
#                 if x['name'].lower() == self.country:
#                     self.country_code = x['alpha2code'].lower()
#             except:
#                 self.country_code = ''
#
#     def get_articles(self):
#         try:
#             top_headlines = newsapi.get_top_headlines(q='Covid-19',
#                                                       # language='en',
#                                                       country=self.country_code
#                                                       )
#             news_headlines = top_headlines['articles'][:self.no_of_articles]
#
#             if news_headlines:
#                 return news_headlines
#             else:
#                 top_headlines = newsapi.get_everything(q='Covid-19 {}'.format(self.country),
#                                                        # language='en',
#                                                        # country=country_code
#                                                        )
#                 return top_headlines['articles'][:self.no_of_articles]
#         except:
#             top_headlines = newsapi.get_everything(q='Covid-19 {}'.format(self.country),
#                                                    # language='en',
#                                                    # country=country_code
#                                                    )
#             return top_headlines['articles'][:self.no_of_articles]










# news = GetNews('China', 10)
# # print(news.get_articles())
# for n in news.get_articles():
#     print(n['title'])

#
# top_headlines = newsapi.get_everything(q='Covid-19 China',
#                                                       # language='en',
#                                                       # country='cn'
#                                                       )
# print(top_headlines['articles'])
