import cv2
from pyzbar.pyzbar import decode
from pyaadhaar.utils import isSecureQr
from pyaadhaar.decode import AadhaarSecureQr

img = cv2.imread('example.png')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

code = decode(gray)

qrData = code[0].data

isSecureQR = (isSecureQr(qrData))

if isSecureQR:
    secure_qr = AadhaarSecureQr(int(qrData))
    decoded_secure_qr_data = secure_qr.decodeddata()
    print(decoded_secure_qr_data)
