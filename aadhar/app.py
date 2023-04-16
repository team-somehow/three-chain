from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import cv2
from pyzbar.pyzbar import decode
from pyaadhaar.utils import isSecureQr
from pyaadhaar.decode import AadhaarSecureQr


app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/test", methods=['GET'])
def test():
    return jsonify("Hello World")


@app.route("/", methods=['POST'])
def hello_world():
    print(request.files)
    file = request.files['file']
    file.save(file.filename)
    img = cv2.imread(file.filename)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    try:

        code = decode(gray)

        qrData = code[0].data

        isSecureQR = (isSecureQr(qrData))

        if isSecureQR:
            secure_qr = AadhaarSecureQr(int(qrData))
            decoded_secure_qr_data = secure_qr.decodeddata()

        return jsonify(decoded_secure_qr_data)

    except Exception as e:
        return jsonify(e)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
