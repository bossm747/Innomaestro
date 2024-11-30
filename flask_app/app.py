import sys
import os

# Add the current directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, render_template, request, jsonify
import maestro_anyapi

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        objective = request.form.get('objective')
        if objective:
            results = maestro_anyapi.run_maestro(objective)
            return jsonify({'results': results})
    return render_template('index.html')

@app.route('/results', methods=['POST'])
def results():
    data = request.get_json()
    objective = data.get('objective')
    if objective:
        results = maestro_anyapi.run_maestro(objective)
        return jsonify({'results': results})
    return jsonify({'error': 'No objective provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
