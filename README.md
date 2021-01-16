## convert python data to json data

    import json
    python_data = {'id': 1, 'name': 'ali'}
    json_data = json.dumps(python_data)
    print(json_data)
    {"id": 1, "name": "ali"}

## convert json data to python data 

    import json
    json_data = {"id": 1, "name": "ali"}
    python_data = json.loads(json_data)
    print(python_data)
    {'id': 1, 'name': 'ali'}
