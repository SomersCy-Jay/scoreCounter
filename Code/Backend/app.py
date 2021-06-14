import subprocess
from repositories.Datarepository import DataRepository
import time
from flask_socketio import SocketIO, send, emit
from serial import Serial, PARITY_NONE
from flask import Flask, json, jsonify, request
from flask_cors import CORS
import threading
import subprocess
import os

os.environ["DISPLAY"] = ":0.0"

app = Flask(__name__)
app.config['SECRET_KEY'] = 'geheim!'
app.app_context()

socketio = SocketIO(app, cors_allowed_origins="*", logger=False,
                    engineio_logger=False, ping_timeout=1)
CORS(app)

# Custom endpoint
endpoint = '/api/v1'

scoreSpeler1 = 0
scoreSpeler2 = 0

subprocess.Popen(
    ["chromium-browser", "--start-fullscreen", "--start-maximized", "http://localhost"])


def score_binnenhalen():
    global scoreSpeler1
    global scoreSpeler2
    scoreSpeler1 = 0
    scoreSpeler2 = 0
    with Serial('/dev/ttyACM0', 9600, bytesize=8, parity=PARITY_NONE, stopbits=1) as poort:
        while True:
            receive_string = poort.readline().decode('utf-8').rstrip()
            if receive_string is not None:
                splits = str(receive_string).split()
                print(splits)
                if(splits[0] == "badge"):
                    print("badge")
                    badged()

                elif(splits[0] == "gedaan"):
                    print("gedaan")
                    gedaan()

                elif(splits[0] == "speler"):
                    welkespeler = splits[1]
                    print(welkespeler)
                    if welkespeler == "1":
                        welkescore = splits[3]
                        snelheid = splits[4]
                        print(snelheid)
                        scoreSpeler1 = int(welkescore)
                        print(f'speler1: {scoreSpeler1}')
                        print(f'speler2: {scoreSpeler2}')
                        dicti = DataRepository.get_speler1()
                        speler1_ID = dicti.get("speler1")
                        print(speler1_ID)
                        DataRepository.create_matchverloop(
                            speler1_ID, scoreSpeler1, scoreSpeler2, snelheid)
                        veranderScore()

                    elif welkespeler == "2":
                        welkescore = splits[3]
                        snelheid = splits[4]
                        print(snelheid)
                        scoreSpeler2 = int(welkescore)
                        print(f'speler1: {scoreSpeler1}')
                        print(f'speler2: {scoreSpeler2}')
                        dicti = DataRepository.get_speler2()
                        speler2_ID = dicti.get("speler2")
                        DataRepository.create_matchverloop(
                            speler2_ID, scoreSpeler1, scoreSpeler2, snelheid)
                        veranderScore()


thread = threading.Thread(target=score_binnenhalen)
thread.start()


def gedaan():
    with app.test_request_context('/'):
        socketio.emit('B2F_gedaan')


def badged():
    with app.test_request_context('/'):
        socketio.emit('B2F_badged')


def veranderScore():
    data = DataRepository.get_scores_match()
    with app.test_request_context('/'):
        socketio.emit('B2F_verandering_score', data)


@socketio.on_error()        # Handles the default namespace
def error_handler(e):
    print(e)


@socketio.on('F2B_poweroff')
def power_off():
    subprocess.Popen(["/sbin/poweroff"])


@socketio.on('F2B_verandering_score')
def verander_score(data):
    with Serial('/dev/ttyACM0', 9600, bytesize=8, parity=PARITY_NONE, stopbits=1) as poort:
        poort.write(data.encode('utf-8'))


@socketio.on('F2B_nieuweMatch')
def send_start():
    global scoreSpeler1
    global scoreSpeler2
    scoreSpeler1 = 0
    scoreSpeler2 = 0
    with Serial('/dev/ttyACM0', 9600, bytesize=8, parity=PARITY_NONE, stopbits=1) as poort:
        start = "start"
        poort.write(start.encode('utf-8'))


@socketio.on('connect')
def initial_connection():
    ips = subprocess.check_output(["hostname", "--all-ip-addresses"])
    zonderB = str(ips)[2:]
    adresArray = zonderB.split()
    adres = adresArray[0]
    socketio.emit('B2F_ip', adres)
    print('A new client connect')


@app.route(endpoint + "/", methods=['GET'])
def test():
    return "test"


@app.route(endpoint + "/create-speler", methods=['POST'])
def maak_speler():
    if request.method == 'POST':
        gegevens = DataRepository.json_or_formdata(request)
        data = DataRepository.create_speler(gegevens['naam'])
        return jsonify(id=data), 201


@app.route(endpoint + '/historiek/<idwedstrijd>', methods=['GET'])
def get_historiek_on_id(idwedstrijd):
    if request.method == 'GET':
        data = DataRepository.get_historiek(idwedstrijd)
        if data is not None:
            return jsonify(data), 200
        else:
            return jsonify(message='error'), 404


@app.route(endpoint + '/H2H/<speler1>-<speler2>', methods=['GET'])
def get_H2H(speler1, speler2):
    if request.method == 'GET':
        data = DataRepository.get_head_2_head(speler1, speler2)
        if data is not None:
            return jsonify(data), 200
        else:
            return jsonify(message='error'), 404


@app.route(endpoint + '/spelers', methods=['GET'])
def spelers():
    if request.method == 'GET':
        data = DataRepository.read_spelers()
        if data is not None:
            return jsonify(data), 200
        else:
            return jsonify(message='error'), 404


@app.route(endpoint + '/create-match', methods=['POST'])
def create_match():
    if request.method == 'POST':
        gegevens = DataRepository.json_or_formdata(request)
        data = DataRepository.create_match(
            gegevens['speler1'], gegevens['speler2'])
        return jsonify(idwedstrijd=data), 201


@app.route(endpoint + '/gespeelde-matchen', methods=['GET'])
def lees_matchen():
    if request.method == 'GET':
        data = DataRepository.read_match_score()
        if data is not None:
            return jsonify(data), 200
        else:
            return jsonify(message='error'), 404


@app.route(endpoint + "/delete-match/<idwedstrijd>", methods=['DELETE'])
def verwijder_match(idwedstrijd):
    if request.method == 'DELETE':
        data = DataRepository.delete_match(idwedstrijd)
        return jsonify(status=data), 201


@app.route(endpoint + "/delete-speler/<ID>", methods=['DELETE'])
def verwijder_speler(ID):
    if request.method == 'DELETE':
        data = DataRepository.delete_speler(ID)
        return jsonify(status=data), 201


@app.route(endpoint + '/namen_match/<idwedstrijd>', methods=['GET'])
def lees_namen(idwedstrijd):
    if request.method == 'GET':
        data = DataRepository.get_namen_voor_his(idwedstrijd)
        if data is not None:
            return jsonify(data), 200
        else:
            return jsonify(message='error'), 404


# START THE APP
if __name__ == '__main__':

    socketio.run(app, debug=False, host='0.0.0.0', port=5000)
