from flask import Flask
import os
import argparse
import json
import pprint
import requests
import sys
import urllib
import urllib.parse
import http.client

app = Flask(__name__)

try:
    # For Python 3.0 and later
    from urllib.error import HTTPError
    from urllib.parse import quote
    from urllib.parse import urlencode
except ImportError:
    # Fall back to Python 2's urllib2 and urllib
    from urllib2 import HTTPError
    from urllib import quote
    from urllib import urlencode

# API constants, you shouldn't have to change these.
api_key = "ocm_pRQMx_w4SZEx6pQDd29qqG2KTTEsjWQc63O-iaRDR0J3wxZWJ9q2IkK9PTBJeYrCKjBxPuhcHwB_-YoSptsMHhx9knO9s5GTLSNe3SlzHL-qDt3lsqu79SU4Y3Yx"
API_HOST = 'api.yelp.com'
SEARCH_PATH = '/v3/businesses/search'
BUSINESS_PATH1 = '/v3/businesses/'  # Business ID will come after slash.
CATEGORY_PATH = '/v3/categories'

 # Defaults for our simple example.
json_key = "data"

headers = {
'Authorization': 'Bearer %s' % api_key,
}

@app.route('/get_search')
def get_search():

	url = 'https://' + API_HOST + SEARCH_PATH
	headers = {'Authorization': 'Bearer %s' % api_key,}

#need the following parameters (type dict) 
	url_params = {	'alias': 'hawaiian',	
					'address1': '5000 Burnet Rd',				
					'coordinates': {'latitude': 30.321166, 'longitude': -97.739538 },
					'radius': 1609, 'limit': 10
					}

	response = requests.get(url, headers=headers, params=url_params)
	response_json = response.json()

	response_dump = json.dumps(response_json)
	response_load = json.loads(response_dump)
	print(response_load)
	'''
	response_businesses = response_load['businesses']

	listvals = []

	for i in range(10):
		listvals.append(('id : ' + response_businesses[i]['id'], 
			'name : ' + response_businesses[i]['alias'], 
			'coordinates :' , response_businesses[i]['coordinates']
			)
		)

	response_format = json.dumps([json_key + ' : ', 
		listvals], 
		indent=4, separators=(' ',' ')
		)
	'''
	return response_load 
	
@app.route('/get_businessDetails')
def get_businessDetails():
	business_id = 'wP5mU6WLU5y6NVLm1NpPBA'
	business_path = BUSINESS_PATH1 + business_id
	url = 'https://' + API_HOST + business_path	
	headers = {'Authorization': 'Bearer %s' % api_key,}

	response = requests.get(url, headers=headers)
	response_load = response.json()
	response_dump = json.dumps([json_key,	
		response_load],
		sort_keys=False, indent=4, separators=(': ', ': ')	
		)

	return response_dump

@app.route('/get_categories')
def get_categories():	
	url = 'https://' + API_HOST + CATEGORY_PATH
	headers = {'Authorization': 'Bearer %s' % api_key,}
	url_params = {
	"data": [],
    	"country": "US",     
    }
	data = []
	response = requests.get(url, headers=headers, params=url_params)
	response_json = response.json()

	response_dump = json.dumps(response_json)
	response_load = json.loads(response_dump)

	for p in response_load['categories']: data.append(p['alias'])

	alias_str = ', '.join(data)
	response_format = json.dumps ( [json_key, 
		{'':alias_str}],
		indent=4, separators=(': ', ', '))

	return response_format

@app.route('/')
def index():	
 	return get_search()
	
if __name__ == "__main__":
 	app.run(host='127.0.0.1', port="5000", debug=True)