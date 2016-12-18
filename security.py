from flask import Flask, session

import hashlib, binascii

salt = "d8rj48s8ej48w#|#$"


def salting(passs):
	return binascii.hexlify(hashlib.pbkdf2_hmac('sha256', passs, salt , 10000))

def set_token(user_id):
    return user_id

def validate(token):
    if 'logged_in' in session:
    	return True
    else:
        return False
    
def set_session(token):
    session['logged_in'] = True
    session['id'] = token

def unset_session(): #borrar token
    if 'logged_in' in session:
        del session['logged_in']

def get_token():
    if 'logged_in' in session:
        return session['id']
    return False
    
def get_user_id(token):
    if 'id' in session:
        return session['id']
