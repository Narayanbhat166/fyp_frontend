import requests
from pymongo import MongoClient
import json
import time
import os

already_scrapped = os.listdir('cities_api_data')

FILE = 'cities.json'
not_found = []

cities = json.loads(open(FILE).read()).get('cities')
for city in cities:
    if city + '.json' in already_scrapped:
        print('already_scraped')
        continue
    time.sleep(1)
    print(city)

    client = MongoClient(
        "mongodb+srv://thenightking:gameofthrones@leetcode.j8j3j.mongodb.net/submission?retryWrites=true&w=majority")
    url = "https://api.ambeedata.com/latest/by-city"
    querystring = {"city": city}
    headers = {
        'x-api-key': "afa84d1360977578a99f1410239e54262c687328b3c4776bbebf45ebaf5902f9",
        'Content-type': "application/json"
    }
    response = requests.request(
        "GET", url, headers=headers, params=querystring)

    if response.status_code == 200:
        print(response.text)

        filename = f"cities_api_data/{city}.json"
        with open(filename, 'w') as file:
            file.write(response.text)
    else:
        not_found.append(city)
        print("NOT FOUND ", city)


with open('cities_api_data/not_found.txt', 'w') as file:
    for city in not_found:
        file.write(city + "\n")
