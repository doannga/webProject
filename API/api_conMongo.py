from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
import json
from dict_careers import Career_dict
from flask_pymongo import pymongo

app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb://127.0.0.1:27017")
recruitment_news = client.recruitment_news.News
@app.route('/')
@app.route('/recruitments',methods = ['GET'])
def get_recruitment_news():
	offset = int(request.args['offset'])
	limit = int(request.args['limit'])
	starting_id = recruitment_news.find().sort('_id', pymongo.ASCENDING)
	last_id = starting_id[offset]['_id']
	recruiments_data = recruitment_news.find({'_id':{'$gte': last_id}}).sort('_id', pymongo.ASCENDING).limit(limit)
	totalSize = recruitment_news.count()
	output = []
	for x in recruiments_data:
		output.append({'id' : str(x['_id']), 'title': x['title'], 'company': x['company'], 'salary': x['salary'], 'address': x['address'], 'expired': x['expired'].strip(), 'url': x['url']})
	next_url = '/recruitments?limit=' +str(limit) +'&offset=' +str(offset+limit)
	prev_url = '/recruitments?limit=' +str(limit) +'&offset=' +str(offset-limit)
	return jsonify({'result': output, 'prev_url':prev_url, 'next_url':next_url, 'total_size': totalSize})

@app.route('/tinh_tpho', methods = ['GET'])
def get_location():
	output = []
	with open('./tinh_tpho.json') as json_file:
		data = json.load(json_file)
		for x in data['tinh_tpho']:
			output.append(x["name_with_type"])
		return jsonify({'result': output})
@app.route('/career', methods = ['GET'])
def get_career():
	output = []
	output.append(Career_dict.get_careers())
	return jsonify({'result': output})
@app.route('/career_groups', methods = ['GET'])
def get_career_groups():
	output = []
	with open('./career_groups.json') as json_file:
		data = json.load(json_file)
		for x in data['group']:
			output.append({'name':x['name'], "careers":x['careers']})
		return jsonify({'result': output})
@app.route('/search_recruitments',methods = ['GET'])
def get_search_recruitment_news():
	page = int(request.args['page'])
	limit = int(request.args['limit'])
	careerGroup = request.args['career_group']
	career = request.args['career']
	address = request.args['address']
	salary = request.args['salary']
	exp = request.args['exp']
	query = request.args['query']

	recruiments_data = []

# db.News.createIndex({'$**': 'text'},{name: 'TextIndex'})
	params = {}
	if (careerGroup != '' and career == ''):
		careers = []
		with open('./career_groups.json') as json_file:
			data = json.load(json_file)
			for x in data['group']:
				if x['name'] == careerGroup:
					careers = x['careers']
					break
		careerGroupParams = []
		for x in careers:
			careerGroupParams.append({'career': {'$regex': str(x)}})
		params['$or'] = careerGroupParams



	if career != '':
		params['career'] = {'$regex': str(career)}

	if address != '':
		params['address'] = {'$regex': str(address)}

	if salary != '':
		salaries = salary.split('-')
		params['salary'] = {'$elemMatch': {'$gte': int(salaries[0]),'$lt': int(salaries[1])}}

	if exp != '':
		if exp == 'Không yêu cầu':
			params['experience'] = {'$regex': str(exp)}
		else:
			experiences = []
			if exp == 'Dưới 1 năm':
				experiences.append({'experience': {'$regex': '0 '}})
			elif exp == 'Trên 5 năm':
				for i in range(5,100):
					experiences.append({'experience': {'$regex': str(i) + ' '}})
			else:
				index = int(int(exp) + 1)
				for i in range(index):
					experiences.append({'experience': {'$regex': str(i) + ' '}})
			params['$or'] = experiences


	if query != '':
		params['$text'] = {'$search': query}


	print('params ========> ', params)
	data = list(recruitment_news.find(params))

	totalSize = len(data)
	if totalSize > 0:
		lastId = data[limit*page]['_id']
		params['_id'] = {'$gte': lastId}
		recruiments_data = recruitment_news.find(params).limit(limit)

	output = []
	for x in recruiments_data:
		output.append({
			'id' : str(x['_id']),
			'url': x['url'],
			'career': x['career'],
			'title': x['title'],
			'company': x['company'],
			'address': x['address'],
			'salary': x['salary'],
			'experience': x['experience'],
			'description': x['description'],
			'diploma': x['diploma'],
			'amount': x['amount'],
			# 'position': str(x['position']),
			'category': x['category'],
			'trial_time': x['trial_time'],
			'sex': x['sex'],
			'age': x['age'],
			'benefits': x['benefits'],
			'require_skill': x['require_skill'],
			'contact': x['contact'],
			'expired': x['expired'].strip()
		})

	return jsonify({'result': output, 'page': page, 'total_size': totalSize})
@app.route('/analysist_career_groups', methods = ['GET'])
def analysist_career_groups():
	careerGroups = request.args['career_groups']
	length = request.args['length']
	output = []
	dataList = []
	with open('./career_groups.json') as json_file:
		data = json.load(json_file)
		dataList = list(data['group'])

	if careerGroups == '':
		careerGroups = []
		if int(length) > len(dataList):
			length = len(dataList)
		for x in range(int(length)):
			careerGroups.append(dataList[x]['name'])
	else:
		careerGroups = careerGroups.split(',')

	for careerGroup in careerGroups:
		index = next((i for i, item in enumerate(dataList) if item['name'] == careerGroup), -1)
		if index > -1:
			params = {}
			careerGroupParams = []
			for x in dataList[index]['careers']:
				careerGroupParams.append({'career': {'$regex': str(x)}})
			params['$or'] = careerGroupParams
			data = list(recruitment_news.find(params))
			output.append({
				'career_group': careerGroup,
				'size': len(data)
			})
		else:
			output.append({
				'careerGroup': careerGroup,
				'size': 0
			})


	total = sum(i['size'] for i in output)
	for i in output:
		if total == 0:
			i['percent']: 0
		else:
			i['percent'] = round(int(i['size']) / total * 100)

	return jsonify({'result': output})

@app.route('/analysist_careers', methods = ['GET'])
def analysist_careers():
	careers = request.args['careers']
	length = request.args['length']
	output = []
	dataList = []
	with open('./career_groups.json') as json_file:
		data = json.load(json_file)
		for x in data['group']:
			dataList.extend(x['careers'])

	if careers == '':
		careers = []
		if int(length) > len(dataList):
			length = len(dataList)
		for x in range(int(length)):
			careers.append(dataList[x])
	else:
		careers = careers.split(',')

	for career in careers:
		params = {}
		params['$or'] = [{'career': {'$regex': career}}]
		data = list(recruitment_news.find(params))
		output.append({
			'career': career,
			'size': len(data)
		})

	# total = sum(i['size'] for i in output)
	# for i in output:
	# 	if total == 0:
	# 		i['percent']: 0
	# 	else:
	# 		i['percent'] = round(int(i['size']) / total * 100)

	return jsonify({'result': output})
if __name__ == '__main__':
 	app.run(debug = True)
