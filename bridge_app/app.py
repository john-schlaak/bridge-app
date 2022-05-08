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
#     output = "\ngraph TD\nA[Client] --> B[Load Balancer]\nB --> C[Server1]\nB --> D[Server2]" # PLACEHOLDER
    output = ""
    for node in bidNodes:
        node = str(node.id) + "{"+str(node.bidName)+"}"
        output+=node+"\n"
        for rule in node.rules:
            rule = str(node.id)+"--> |"+"HCP: "+ str(rule.HCPMin)+"-"+str(rule.HCPMax) + "\nTP: "+ str(rule.TPMin)+"-"+str(rule.TPMax) {+" "+str(group.cards)+" "+str(group.num)for group in rule.groups}"|" +rule.nextBid
            ouput+=rule+"\n"
    print(data) # PLACEHOLDER
    ## END YOUR CODE
    return output

