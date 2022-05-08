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
    for node in data["bidNodes"]:
        node_str = str(node["id"]) + "{"+str(node["bidLevel"])+str(node["bidSuit"])+"}"
        output+=node_str+"\n"
        for rule in node.rules:
            rule_str = str(node["id"])+"--> |"+"HCP: "+ str(rule["minHCP"])+"-"+str(rule["maxHCP"]) + "TP: "+ str(rule["minTP"])+"-"+str(rule["maxTP"]) + [" "+", ".join([str(card["rank"]) + str(card["suit"]) for card in group["cards"]])+" Range: "+str(group["min"]) + "-" + str(group["max"]) for group in rule["keyCardGroups"]] + "|" +rule["destination"]
            ouput+=rule_str+"\n"
    print(data) # PLACEHOLDER
    ## END YOUR CODE
    return output

