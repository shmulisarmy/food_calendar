from flask import Flask, render_template, abort
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3

app = Flask(__name__)

@app.route('/')
def ri():
    return render_template('index.html')

@app.route('/signup/<string:name>/<string:password>', methods=['GET'])
def signup(name, password):
    conn = sqlite3.connect('example.db')
    cursor = conn.cursor()

    # Hash the password using Flask's built-in function
    hashed_password = generate_password_hash(password, method='sha256')

    # Use placeholders (?) in the SQL query for parameters
    cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (name, hashed_password))

    conn.commit()
    conn.close()

    return render_template('calendar_page.html', message='signup successful')

@app.route('/signin/<string:name>/<string:password>', methods=['GET'])
def signin(name, password):
    conn = sqlite3.connect('example.db')
    cursor = conn.cursor()

    # Use placeholders (?) in the SQL query for parameters
    cursor.execute("SELECT * FROM users WHERE username = ?", (name,))
    row = cursor.fetchone()

    conn.close()

    if row is None:
        return render_template('index.html', message='user does not exist')

    stored_password_hash = row[1]  # Assuming password is the second column
    if not check_password_hash(stored_password_hash, password):
        return render_template('index.html', message="wrong username or password")

    return render_template('calendar_page.html', message='signin successful')

@app.route('/add_data/<string:name>/<string:password>/<string:sent_data>', methods=['GET'])
def add_data(name, password, sent_data):
    conn = sqlite3.connect('example.db')
    cursor = conn.cursor()

    # Check user credentials before updating data
    cursor.execute("SELECT * FROM users WHERE username = ?", (name,))
    row = cursor.fetchone()

    if row is None or not check_password_hash(row[1], password):
        conn.close()
        return render_template('index.html', message='user does not exist or wrong username or password')

    # Update data based on the username
    data[name] = sent_data

    conn.close()
    return render_template('calendar_page.html', message='data added successfully', data=data[name])

data = {}

if __name__ == '__main__':
    app.run()
