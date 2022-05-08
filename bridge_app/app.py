from flask import Flask, request
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type, X-XSRF-TOKEN'

@app.route("/generate", methods=["POST", "OPTIONS"])
@cross_origin()
def generate():
    data = request.get_json()
    ## BEGIN YOUR CODE
    output = "\ngraph TD\nA[Client] --> B[Load Balancer]\nB --> C[Server1]\nB --> D[Server2]" # PLACEHOLDER
    print(data) # PLACEHOLDER
    ## END YOUR CODE
    return output

