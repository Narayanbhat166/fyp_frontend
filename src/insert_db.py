import json
import os
from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://thenightking:gameofthrones@leetcode.j8j3j.mongodb.net/submission?retryWrites=true&w=majority")

db = client.fyp
collection = db.data

cities = os.listdir('cities_api_data')
mapping = json.loads(open('cities_mapped.json').read())

for city in cities:
    print(city)
    if not 'json' in city:
        continue
    city_stripped = city[:-5]
    if collection.find_one({'city':  city_stripped}):
        print('done')
        continue

    with open('cities_api_data/'+city) as f:
        data = json.loads(f.read())
        print(data)
        data = data.get('stations')[0]
        db_ob = {
            'city': city_stripped,
            'data': data,
            'object_id': mapping.get(city_stripped)
        }

        print(collection.insert_one(db_ob))
