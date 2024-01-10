from app import app
from sec import datastore
from model import db, Role
from flask_security import hash_password
from werkzeug.security import generate_password_hash


with app.app_context():
    db.create_all()
    datastore.find_or_create_role(name="Admin", description="user is Admin")
    datastore.find_or_create_role(name="Manager", description="user is Manager")
    datastore.find_or_create_role(name="Customer", description="user is Customer")
    db.session.commit()
    if not datastore.find_user(email="admin@gmail.com"):
        datastore.create_user(
            username="admin",
            email="admin@gmail.com",
            password= generate_password_hash("admin"),
            roles=["Admin"])
    if not datastore.find_user(email="manager@gmail.com"):
        datastore.create_user(
            username="manager",
            email="manager@gmail.com",
            password=generate_password_hash("manager"),
            roles=["Manager"], active=False)
    if not datastore.find_user(email="customer@gmail.com"):
        datastore.create_user(
            username="customer",
            email="customer@gmail.com",
            password=generate_password_hash("customer"),
            roles=["Customer"])
    db.session.commit()