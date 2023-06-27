from flask import Flask, request, jsonify, json, render_template
from flask import Flask, jsonify
from flask_cors import CORS
import os

import mysql.connector

# instantiate the app
app = Flask(__name__, static_folder='static/', template_folder='client/dist/')


@app.route('/')
def index():
    return render_template("index.html")
app.config.from_object(__name__)


# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

msql_name = os.environ.get('MYSQL_USER_NAME')
msql_passwd = os.environ.get('MYSQL_PASSWD')

connection = mysql.connector.connect(host='localhost',
                                     database='mysql',
                                     user=msql_name,
                                     password=msql_passwd)


# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('Hello world!')

@app.route('/items-today', methods=['GET'])
def items_today():
    from datetime import datetime

    cur = connection.cursor()

    item_for = request.args['items_for']

    cur.execute(
        f""" 
        select * FROM items_purchasing WHERE DATE(purchased_date) = DATE(NOW()) AND item_for = {item_for}
        """
    )
    items = [
        {'name':i[1], 'id': i[0], 'unit': i[2], 'price': i[3], 'count': i[4]}
        for i in cur.fetchall()
    ]

    total = 0
    for i in items:
        total += int(i['price']) * int(i['count'])
    return jsonify({'total': total,
            'items': items})

@app.route('/add-items-purchased', methods=['POST'])
def add_item_purchased():
    from datetime import datetime
    from flask import request

    cur = connection.cursor()
    today = str(datetime.today().date())
    item = request.get_json()

    cur.execute(
        f"""
        INSERT INTO items_purchasing (item_name, unit, item_count, item_price, item_for, purchased_date)
        VALUES ('{item['name']}', '{item['unit']}', {int(float(item['count']) * 100)}, {int(float(item['price']) * 100)}, 
        {item['item_for']}, '{today}')
        """
    )
    connection.commit()


    return jsonify(item)

@app.route('/delete-item/<item_id>', methods=['DELETE'])
def delete_item(item_id):
    from datetime import datetime
    from flask import request

    cur = connection.cursor()

    cur.execute(
        f"""
        DELETE FROM items_purchasing WHERE id = {item_id}
        """
    )
    connection.commit()


    return jsonify(item)


if __name__ == '__main__':
    app.run()
