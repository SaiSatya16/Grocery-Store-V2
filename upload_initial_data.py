from app import app
from sec import datastore
from model import db, Role, Category, Product, Association
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

    # categories = ["Fruits", "Beverages", "Bread/Bakery", "Beauty and Hygene", "Dairy", "Dry/Baking Goods", "Frozen Foods", "Meat", "Vegetables", "Cleaners", "Paper Goods", "Personal Care", "House Holds", "Snacks", "Others"]
    categories = [
        {
            "name": "Fruits",
            "active": True,
            "image": "/static/uploads/1_cat_image.png"
        }
        ,
        {
            "name": "Beverages",
            "active": True,
            "image": "/static/uploads/2_cat_image.png"
        },
        {
            "name": "Bread/Bakery",
            "active": True,
            "image": "/static/uploads/3_cat_image.png"
        },
        {
            "name": "Beauty and Hygene",
            "active": True,
            "image": "/static/uploads/4_cat_image.png"
        },
        {
            "name": "Dairy",
            "active": True,
            "image": "/static/uploads/5_cat_image.png"
        },
        {
            "name": "Dry/Baking Goods",
            "active": True,
            "image": "/static/uploads/6_cat_image.png"
        },
        {
            "name": "Frozen Foods",
            "active": True,
            "image": "/static/uploads/7_cat_image.png"
        },
        {
            "name": "Meat",
            "active": True,
            "image": "/static/uploads/8_cat_image.png"
        },
        {
            "name": "Vegetables",
            "active": True,
            "image": "/static/uploads/9_cat_image.png"
        },
        {
            "name": "Cleaners",
            "active": True,
            "image": "/static/uploads/10_cat_image.png"
        },
        {
            "name": "Paper Goods",
            "active": True,
            "image": "/static/uploads/11_cat_image.png"
        },
        {
            "name": "Personal Care",
            "active": True,
            "image": "/static/uploads/12_cat_image.png"
        },
        {
            "name": "House Holds",
            "active": True,
            "image": "/static/uploads/13_cat_image.png"
        },
        {
            "name": "Snacks",
            "active": True,
            "image": "/static/uploads/14_cat_image.png"
        },
        {
            "name": "Others",
            "active": True,
            "image": "/static/uploads/15_cat_image.png"
        },
    ]

    for category in categories:
        db.session.add(Category(**category))
    db.session.commit()

    products = [
        {
            "name": "Apple",
            "unit": "Rs/Item",
            "rate": 40,
            "quantity": 100,
            "manufacture_date" : "2020-01-01",
            "expiry_date": "2020-03-01",
            "category_id": 1,
            "image": "/static/uploads/1_pro_image.png"

        },
        {
            "name": "Banana",
            "unit": "Rs/Item",
            "rate": 20,
            "quantity": 100,
            "manufacture_date" : "2020-01-01",
            "expiry_date": "2020-03-01",
            "category_id": 1,
            "image": "/static/uploads/2_pro_image.png"

        },
        {
            "name": "Orange",
            "unit": "Rs/Item",
            "rate": 30,
            "quantity": 100,
            "manufacture_date" : "2020-01-01",
            "expiry_date": "2020-03-01",
            "category_id": 1,
            "image": "/static/uploads/3_pro_image.png"

        },
        {
            "name": "Pineapple",
            "unit": "Rs/Item",
            "rate": 50,
            "quantity": 100,
            "manufacture_date" : "2020-01-01",
            "expiry_date": "2020-03-01",
            "category_id": 1,
            "image": "/static/uploads/4_pro_image.png"

        },
        {
            "name": "Mango",
            "unit": "Rs/Item",
            "rate": 60,
            "quantity": 100,
            "manufacture_date" : "2020-01-01",
            "expiry_date": "2020-03-01",
            "category_id": 1,
            "image": "/static/uploads/5_pro_image.png"

        },
        {
            "name": "Pepsi",
            "unit": "Rs/Item",
            "rate": 40,
            "quantity": 100,
            "manufacture_date" : "2020-01-01",
            "expiry_date": "2020-03-01",
            "category_id": 2,
            "image": "/static/uploads/6_pro_image.png"

        },
        {
            "name": "Coca Cola",
            "unit": "Rs/Item",
            "rate": 40,
            "quantity": 100,
            "manufacture_date" : "2020-01-01",
            "expiry_date": "2020-03-01",
            "category_id": 2,
            "image": "/static/uploads/7_pro_image.png"

        },
        {
            "name": "Sprite",
            "unit": "Rs/Item",
            "rate": 40,
            "quantity": 100,
            "manufacture_date" : "2020-01-01",
            "expiry_date": "2020-03-01",
            "category_id": 2,
            "image": "/static/uploads/8_pro_image.png"

        },
        {
            "name": "Mountain Dew",
            "unit": "Rs/Item",
            "rate": 40,
            "quantity": 100,
            "manufacture_date" : "2020-01-01",
            "expiry_date": "2020-03-01",
            "category_id": 2,
            "image": "/static/uploads/9_pro_image.png"

        },
        {
            "name": "7Up",
            "unit": "Rs/Item",
            "rate": 40,
            "quantity": 100,
            "manufacture_date" : "2020-01-01",
            "expiry_date": "2020-01-01",
            "category_id": 2,
            "image": "/static/uploads/10_pro_image.png"

        },
        {
            "name": "Bread",
            "unit": "Rs/Item",
            "rate": 40,
            "quantity": 100,
            "manufacture_date" : "2020-01-01",
            "expiry_date": "2021-01-01",
            "category_id": 3,
            "image": "/static/uploads/11_pro_image.png"

        },
        {
            "name": "Biscuit",
            "unit": "Rs/Item",
            "rate": 10,
            "quantity": 100,
            "manufacture_date" : "2020-01-01",
            "expiry_date": "2021-01-01",
            "category_id": 3,
            "image": "/static/uploads/12_pro_image.png"

        },
        {
            "name": "Shampoo",
            "unit": "Rs/Item",
            "rate": 100,
            "quantity": 100,
            "manufacture_date" : "2020-01-01",
            "expiry_date": "2021-01-01",
            "category_id": 4,
            "image": "/static/uploads/13_pro_image.png"

        },
        {
            "name": "Soap",
            "unit": "Rs/Item",
            "rate": 20,
            "quantity": 100,
            "manufacture_date" : "2020-01-01",
            "expiry_date": "2021-01-01",
            "category_id": 4,
            "image": "/static/uploads/14_pro_image.png"

        },
        {
            "name": "Toothpaste",
            "unit": "Rs/Item",
            "rate": 50,
            "quantity": 100,
            "manufacture_date" : "2020-01-01",
            "expiry_date": "2021-01-01",
            "category_id": 4,
            "image": "/static/uploads/15_pro_image.png"

        },
    ]

    for product in products:
        db.session.add(Product(**product))
    db.session.commit()

    for product in products:
        p = Product.query.filter_by(name=product["name"]).first()
        if p:
            pid = p.id
            cid = p.category_id

            existing_association = Association.query.filter_by(
                category_id=cid, product_id=pid
            ).first()

            if not existing_association:  # If association doesn't exist, create it
                asso = Association(category_id=cid, product_id=pid)
                db.session.add(asso)
    db.session.commit()



