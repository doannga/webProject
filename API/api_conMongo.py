from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
import json
from dict_careers import Career_dict
from flask_pymongo import pymongo

# full search support
# db.job_information1.createIndex({'title': 'text', 'hiringOrganization.name':'text'},{name: 'TextIndex'})

app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb://127.0.0.1:27017")
recruitment_news = client.recruitment_information.job_information1
@app.route('/')

@app.route('/tinh_tpho', methods=['GET'])
def get_location():
  output = []
  with open('./tinh_tpho.json') as json_file:
    data = json.load(json_file)
    for x in data['tinh_tpho']:
      output.append(x["name_with_type"])
    return jsonify({'result': output})


@app.route('/career', methods=['GET'])
def get_career():
  output = []
  output.append(Career_dict.get_careers())
  return jsonify({'result': output})


@app.route('/career_groups', methods=['GET'])
def get_career_groups():
  output = []
  with open('./career_groups.json') as json_file:
    data = json.load(json_file)
    for x in data['group']:
      output.append({'name': x['name'], "careers": x['careers']})
    return jsonify({'result': output})


@app.route('/search_recruitments', methods=['GET'])
def get_search_recruitment_news():
  page = int(request.args['page'])
  limit = int(request.args['limit'])
  career_group = request.args['career_group']
  career = request.args['career']
  address = request.args['address']
  salary = request.args['salary']
  exp = request.args['exp']
  query = request.args['query']

  params = {}
  if (career_group != '' and career == ''):
    careers = []
    with open('./career_groups.json') as json_file:
      data = json.load(json_file)
      careers = [i['careers']
                 for i in data['group'] if i['name'] == career_group][0]
      params = {'occupationalCategory': {'$in': careers}}

  if career != '':
    params['occupationalCategory'] = career

  if address != '':
    params['jobLocation.address.addressRegion'] = address

  if salary != '':
    salaries = salary.split('-')
    params['$and'] = [
        {
            'baseSalary.minValue': {'$gte': int(salaries[0]), '$lt': int(salaries[1])}
        },
        {
            'baseSalary.maxValue': {'$gte': int(salaries[0]), '$lt': int(salaries[1])}
        },
    ]

  if exp != '':
    if exp == 'Không yêu cầu':
      params['$or'] = [
          {'experienceRequirements': ''},
          {'experienceRequirements': 'Không yêu cầu'}
      ]
    elif exp == 'Trên 5 năm':
      experiences = []
      for i in range(5, 30):
        experiences.append(
            {'experienceRequirements': {'$regex': str(i) + ' '}})
      params['$or'] = experiences
    else:
      params['experienceRequirements'] = exp

  if query != '':
    params['$text'] = {'$search': '\"' + query + '\"'}

  print('params ========> ', params)
  mongo_query = recruitment_news.find(params)
  total_size = mongo_query.count()
  data = list(mongo_query.limit(limit).skip(page*limit))

  output = []
  for x in data:
    output.append({
        'id': str(x['_id']),
        'title': x['title'],
        'description': x['description'],
        'jobBenefits': x['jobBenefits'],
        'skills': x['skills'],
        'qualifications': x['qualifications'],
        'experienceRequirements': x['experienceRequirements'],
        'datePosted': x['datePosted'],
        'validThrough': x['validThrough'],
        'employmentType': x['employmentType'],
        'hiringOrganization': x['hiringOrganization'],
        'jobLocation': x['jobLocation'],
        'baseSalary': x['baseSalary'],
        'occupationalCategory': x['occupationalCategory'],
        'url': x['url']
    })

  return jsonify({
      'result': output,
      'page': page,
      'total_size': total_size
  })


@app.route('/analysist_career_groups', methods=['GET'])
def analysist_career_groups():
  career_groups = request.args['career_groups']
  length = request.args['length']
  output = []
  data_list = []
  with open('./career_groups.json') as json_file:
    data = json.load(json_file)
    data_list = list(data['group'])

  if career_groups == '':
    career_groups = []
    if int(length) > len(data_list):
      length = len(data_list)
    for x in range(int(length)):
      career_groups.append(data_list[x]['name'])
  else:
    career_groups = career_groups.split(',')

  for career_group in career_groups:
    careers = [i['careers'] for i in data_list if i['name'] == career_group][0]
    params = {'occupationalCategory': {'$in': careers}}
    size = recruitment_news.find(params).count()
    output.append({
        'career_group': career_group,
        'size': size
    })

  total = sum(i['size'] for i in output)
  for i in output:
    if total == 0:
      i['percent']: 0
    else:
      i['percent'] = round(int(i['size']) / total * 100)

  return jsonify({'result': output})


@app.route('/analysist_careers', methods=['GET'])
def analysist_careers():
  careers = request.args['careers'].split(',')
  length = request.args['length']
  addresses = request.args['addresses'].split(',')
  output = {}
  careerData = []
  addressData = []

  # remove string empty
  careers = [i for i in careers if i.strip()]
  addresses = [i for i in addresses if i.strip()]

  with open('./career_groups.json') as json_file:
    data = json.load(json_file)
    for x in data['group']:
      careerData.extend(x['careers'])
  with open('./tinh_tpho.json') as json_file:
    data = json.load(json_file)
    for x in data['tinh_tpho']:
      addressData.append(x['name_with_type'])

  if len(addresses) == 0 and len(careers) == 0:
    addresses = ['Hà Nội', 'Hồ Chí Minh']
    careers = careerData[:int(length)]

  if len(careers) > 0 and len(addresses) == 0:
    output['type'] = 1
    out = []
    for career in careers:
      params = {'occupationalCategory': {'$in': [career]}}
      size = recruitment_news.find(params).count()
      out.append({
          'career': career,
          'size': size
      })
    output['data'] = out
  elif len(careers) == 0 and len(addresses) > 0:
    output['type'] = 2
    out = []
    for address in addresses:
      params = {'jobLocation.address.addressRegion': address}
      size = recruitment_news.find(params).count()
      out.append({
          'address': address,
          'size': size
      })
    output['data'] = out
  else:
    output['type'] = 3
    out = []
    for address in addresses:
      params = {}
      result = []
      for career in careers:
        params['$and'] = [
            {'jobLocation.address.addressRegion': address},
            {'occupationalCategory': {'$in': [career]}}
        ]
        size = recruitment_news.find(params).count()
        result.append({'career': career, 'size': size})
      out.append({'address': address, 'careers': result})
    output['data'] = out

  print(output)

  return jsonify({'result': output})


@app.route('/check_duplicates', methods=['GET'])
def check_duplicates():
  data = list(recruitment_news.aggregate([
      {'$group': {'_id': {'url': '$url', 'title': '$title'}, 'count': {'$sum': 1}}},
      {'$match': {'count': {'$gt': 1}}},
      {'$sort': {'count': -1}}
  ]))
  total = sum(int(i['count']) for i in data)
  return jsonify({'result': data, 'total': total})


if __name__ == '__main__':
  app.run(debug=True)
