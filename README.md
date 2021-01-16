### convert python data to json data

    import json
    python_data = {'id': 1, 'name': 'ali'}
    json_data = json.dumps(python_data)
    print(json_data)
    {"id": 1, "name": "ali"}
