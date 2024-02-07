from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin

db = SQLAlchemy()


class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column('user_id', db.Integer(), db.ForeignKey('user.id'))
    role_id = db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=False)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=False)
    roles = db.relationship('Role', secondary='roles_users',
                         backref=db.backref('users', lazy='dynamic'))

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer,primary_key = True,autoincrement = True)
    name = db.Column(db.String,nullable = False,unique = True)
    description = db.Column(db.String,nullable = False)



class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True,autoincrement = True)
    name = db.Column(db.String(100), nullable=False)
    active = db.Column(db.Boolean())
    image = db.Column(db.String(100))
    product_relation = db.relationship("Product",backref="category_relation", secondary="association") 

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True,autoincrement = True)
    name = db.Column(db.String(100), nullable=False)
    unit = db.Column(db.String(100), nullable=False)
    rate = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    manufacture_date = db.Column(db.String(100), nullable=False)
    expiry_date = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(100))
    category_id=db.Column(db.Integer, db.ForeignKey("category.id"), nullable=False)

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True,autoincrement = True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    product_id=db.Column(db.Integer, nullable=False)
    product_name=db.Column(db.String(100), nullable=False)
    req_quantity = db.Column(db.Integer,nullable = False)
    product_rate=db.Column(db.Integer, nullable=False)
    product_unit=db.Column(db.String(100),  nullable=False)

class Bought(db.Model):
    id = db.Column(db.Integer, primary_key=True,autoincrement = True)
    date = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    product_id=db.Column(db.Integer, nullable=False)
    product_name=db.Column(db.String(100), nullable=False)
    req_quantity = db.Column(db.Integer,nullable = False)
    product_rate=db.Column(db.Integer, nullable=False)
    product_unit=db.Column(db.String(100),  nullable=False)
    




class Association(db.Model):
    category_id = db.Column(db.Integer, db.ForeignKey("category.id"),primary_key = True, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"),primary_key = True, nullable=False)
