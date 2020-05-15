import requests
import json
import threading
import time

API_URL = "https://covid-193.p.rapidapi.com/statistics"
API_HEADERS = {
    'x-rapidapi-host': "covid-193.p.rapidapi.com",
    'x-rapidapi-key': "e0d880658amsh5707d8639e35fc3p1e7243jsn0bc77771acc8"
}


class Data:
    def __init__(self, api_url, api_headers):
        self.api_url = api_url
        self.api_headers = api_headers

    def get_data(self):
        querystring = {}
        response = requests.request("GET", self.api_url, headers=self.api_headers, params=querystring)
        data = json.loads(response.text)
        return data

    def get_total_cases(self):
        querystring = {"country": "All"}
        response = requests.request("GET", self.api_url, headers=self.api_headers, params=querystring)
        data = json.loads(response.text)
        for content in data:
            if content['name'] == "cases":
                return str(content['name'])
        # return data
        # print(data)
        # for content in data:
        #     if content['name'] == "Coronavirus Cases:":
        #         return content['value']




    #
    # def get_total_deaths(self):
    #     data = self.data['total']
    #
    #     for content in data:
    #         if content['name'] == "Deaths:":
    #             return content['value']
    #
    #     return "0"
    #
    # def get_country_data(self, country):
    #     data = self.data["country"]
    #
    #     for content in data:
    #         if content['name'].lower() == country.lower():
    #             return content
    #
    #     return "0"
    #
    # def get_list_of_countries(self):
    #     countries = []
    #     for country in self.data['country']:
    #         countries.append(country['name'].lower())
    #
    #     return countries
    #
    # def update_data(self):
    #     response = requests.post(f'https://www.parsehub.com/api/v2/projects/{self.project_token}/run',
    #                              params=self.params)
    #
    #     def poll():
    #         time.sleep(0.1)
    #         old_data = self.data
    #         while True:
    #             new_data = self.get_data()
    #             if new_data != old_data:
    #                 self.data = new_data
    #                 print("Data updated")
    #                 break
    #             time.sleep(5)
    #
    #     t = threading.Thread(target=poll)
    #     t.start()

#%%
data1 = Data(API_URL, API_HEADERS)
print(data1.get_total_cases())

#%%

import requests
import json

url = "https://covid-193.p.rapidapi.com/countries"

headers = {
    'x-rapidapi-host': "covid-193.p.rapidapi.com",
    'x-rapidapi-key': "e0d880658amsh5707d8639e35fc3p1e7243jsn0bc77771acc8"
    }

response = requests.request("GET", url, headers=headers)
data = json.loads(response.text)['response']

print(response.text)