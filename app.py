
from flask import Flask, flash, redirect, render_template, request, session, abort
from model import(
    select)
from response import (
    format_json)
from security import *

import os
import hashlib
app = Flask(__name__)


@app.route('/')
def home():
    if validate(get_token()):
            user = select("SELECT nombre FROM usuario WHERE idUsuario = %s" % (get_user_id(get_token())))
            return render_template('private/nav_log.html', user = user)
    return render_template('login.html')
 

@app.route('/login', methods=['POST'])
def do_admin_login():
    
    email = request.form['Email']
    password = salting(request.form['password'])
    if email and password:
        user = select("SELECT idUsuario FROM usuario WHERE email = '%s' AND password = '%s'" % (email, password))
        if len(user) > 0:
            set_session(set_token(user[0]['idUsuario']))
        else:
            flash('wrong password!')
        
    return home()
    

@app.route("/logout")
def logout():
    session.clear() 
    return home()


if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    app.run(debug=True,threaded=True)