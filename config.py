import os

class Config(object):
    DEBUG = False
    TESTING = False


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    #postgres://grocery_store_2_db_user:Fhs6MFOexDJsyW6W9pxnAIfUKsc9HxF4@dpg-cmfets0cmk4c739a65rg-a.singapore-postgres.render.com/grocery_store_2_db
    SECRET_KEY = "thisissecter1"
    SECURITY_PASSWORD_SALT = "thisissaltt1"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    WTF_CSRF_ENABLED = False
    SECURITY_TOKEN_AUTHENTICATION_HEADER = 'Authentication-Token'
    CACHE_TYPE = "RedisCache"
    CACHE_REDIS_HOST = "localhost"
    CACHE_REDIS_PORT = 6379
    CACHE_REDIS_DB = 3

