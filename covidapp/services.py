import requests
import json

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

