from bs4 import BeautifulSoup
import requests
import pandas as pd
import sched, time


s = sched.scheduler(time.time, time.sleep)

url = "https://www.worldometers.info/coronavirus/"


def scrape_worldometer():
    req_data = requests.get(url)
    soup = BeautifulSoup(req_data.text, 'html.parser')
    table = soup.find('table', attrs={'id': 'main_table_countries_today'})

    header = [col_name.text.rstrip('\n').strip() for col_name in table.select('thead th')]

    body = []
    for row in table.select('tbody tr'):
        tds = [td.get_text().rstrip('\n').strip() for td in row.select('td')]
        body.append(tds)

    df = pd.DataFrame(body, columns=header)

    df_country = df[7:223]

    df_continent = df[0:5]

    df_country.to_json(r'data_scrape.json', orient='records', indent=2)
    print("Saving JSON")


s.enter(60, 1, scrape_worldometer, (s,))
s.run()

#%%
# import covid_daily
#
# overview = covid_daily.overview()
#
# data = covid_daily.data(country='India', chart='total-currently-infected-linear', as_json=False)
#
# print(data.head())



