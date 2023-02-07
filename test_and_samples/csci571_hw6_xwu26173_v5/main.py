from flask import Flask, request, jsonify
from flask import send_from_directory
import requests
import json
import re

app = Flask(__name__)

#Consts
YELP_API_KEY = "ocm_pRQMx_w4SZEx6pQDd29qqG2KTTEsjWQc63O-iaRDR0J3wxZWJ9q2IkK9PTBJeYrCKjBxPuhcHwB_-YoSptsMHhx9knO9s5GTLSNe3SlzHL-qDt3lsqu79SU4Y3Yx"
HTTP = "https://"
API_HOST = 'api.yelp.com'
SEARCH_PATH = '/v3/businesses/search'
BUSINESS_PATH = '/v3/businesses/'
MILE_TO_METER = 1609.344
HTML_PATH = "index.html"

@app.route('/')
@app.route('/index')
def index():
    return send_from_directory('static', HTML_PATH) 

@app.route('/getData')
def getData():
	if request.method == 'GET':
		latitude = request.args['lat']
		longitude = request.args['lng']
		keyword = request.args['keyword']
		distance = request.args['distance']
		category = request.args['category']

		lat = float(latitude)
		lng = float(longitude)
		if distance!="NaN":
			distance = int(float(distance) * MILE_TO_METER)

		result = searchBusiness(lat, lng, keyword, distance, category)

		jsonResult = jsonify(result)
	return jsonResult #jsonify({"lat":lat, "lng":lng, "keyword":keyword, "distance":distance, "category":category})

#Arguments https://www.yelp.com/developers/graphql/query/search
def searchBusiness(lat, lng, keyword, distance, category, limit = 20):
	url = HTTP + API_HOST + SEARCH_PATH
	headers = {'Authorization': 'Bearer %s' % YELP_API_KEY,}
	url_params = {	'term': keyword,
					'latitude': lat,
					'longitude': lng,
					'limit': limit,
					'categories': category #'categories/alias'
					}
	if distance!="NaN":
		url_params['radius'] = distance
	response = requests.get(url, headers=headers, params=url_params)
	response_json = response.json()
	response_dump = json.dumps(response_json)
	response_load = json.loads(response_dump)
	response_businesses = response_load['businesses']

	return response_businesses

@app.route('/getDetail')
def getDetail():
	if request.method == 'GET':
		business_id = request.args['id']
		
		url = HTTP + API_HOST + BUSINESS_PATH + business_id
		headers = {'Authorization': 'Bearer %s' % YELP_API_KEY,}
		response = requests.get(url, headers=headers)
		response_json = response.json()
		response_dump = json.dumps(response_json)
		response_load = json.loads(response_dump)

	return jsonify(response_load)

'''
def getGeo(location):
	address = re.sub(" ","%20",s)
	address = re.sub(",","%2C",address)
	print(address)
	headers={"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Mobile Safari/537.36"}
	KEY = "AIzaSyB3pIFY1A-U6CcqhKtc_v6strEQAkpIckc"
	url = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=" + KEY

	response = requests.get(url, headers=headers)
	html_str =response.content.decode()
	#print(html_str)
	result=json.loads(html_str)

	lat = result['results'][0]['geometry']['location']['lat']
	lng = result['results'][0]['geometry']['location']['lng']

	return lat, lng

def getIPinfo(ip):
	ip = "8.8.8.8"
	KEY = "5f6e164d2cbdaf"
	url = "https://ipinfo.io/" + ip + "?token=" + KEY
	headers={"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Mobile Safari/537.36"}
	response = requests.get(url, headers=headers)
	html_str =response.content.decode()
	#print(html_str)
	result=json.loads(html_str)

	loc = result["loc"]
	loc = loc.split(",")
	lat = loc[0]
	lng = loc[1]

	return lat, lng
'''


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)