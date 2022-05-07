from flask import Flask, request
import json

app = Flask(__name__)

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    ## BEGIN YOUR CODE
    output = {} # PLACEHOLDER
    print(data) # PLACEHOLDER
    ## END YOUR CODE
    return output
