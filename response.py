from flask import(
    json,
    Response,
    request,
    render_template
)

def format_json(result, code = 200):
    if result:
        data = json.dumps({'status': code, 'data': result})
    else:
        data = json.dumps({'status': 404, 'data': ""})
    resp = Response(data, status=code, mimetype='application/json')
    return resp