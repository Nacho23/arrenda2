import MySQLdb

MYSQL_DATABASE_USER = 'root'
MYSQL_DATABASE_PASSWORD = ''
MYSQL_DATABASE_DB = 'arrenda2'
MYSQL_DATABASE_HOST = '127.0.0.1'

def select(sql):
    cursor = MySQLdb.connect(user=MYSQL_DATABASE_USER, passwd=MYSQL_DATABASE_PASSWORD, host=MYSQL_DATABASE_HOST, db=MYSQL_DATABASE_DB, charset='utf8').cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(sql)
    data = cursor.fetchall()
    cursor.close()
    return data

def insert(sql):
    con = MySQLdb.connect(user=MYSQL_DATABASE_USER, passwd=MYSQL_DATABASE_PASSWORD, host=MYSQL_DATABASE_HOST, db=MYSQL_DATABASE_DB, charset='utf8')
    cursor = con.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(sql)
    con.commit()
    cursor.close()
    return cursor.lastrowid


