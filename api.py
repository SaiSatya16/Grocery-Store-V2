from flask_restful import Resource, Api, fields, marshal_with, reqparse
from model import db
from model import Category, Product, Cart, Association, Bought

from werkzeug.exceptions import HTTPException
from flask_cors import CORS
import json
from flask import make_response
from flask_security import auth_required, roles_required
import os
api = Api()
from functools import wraps
from flask import abort
from flask_security import roles_accepted

def any_role_required(*roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            if not roles_accepted(*roles):
                abort(403, description="Insufficient permissions")
            return fn(*args, **kwargs)
        return decorator
    return wrapper

#==========================Validation========================================================
class NotFoundError(HTTPException):
    def __init__(self,status_code):
        self.response = make_response(" ", status_code)

class BusinessValidationError(HTTPException):
    def __init__(self, status_code, error_code, error_message):
        message = {"error_code":error_code,"error_message":error_message}
        self.response = make_response(json.dumps(message), status_code)


#==============================output fields========================================
Category_fields = {
    "id":fields.Integer,
    "name":fields.String,
    "active":fields.Boolean
}

Product_fields = {
    "id":fields.Integer,
    "name":fields.String,
    "unit":fields.String,
    "rate":fields.Integer,
    "quantity":fields.Integer,
    "manufacture_date":fields.String,
    "expiry_date":fields.String,
    "category_id": fields.Integer
}

cart_fields = {
    "id":fields.Integer,
    "user_id":fields.Integer,
    "product_id":fields.Integer,
    "product_name":fields.String,
    "req_quantity":fields.Integer,
    "product_rate":fields.Integer,
    "product_unit":fields.String
}

bought_fields = {
    "id":fields.Integer,
    "date":fields.String,
    "user_id":fields.Integer,
    "product_id":fields.Integer,
    "product_name":fields.String,
    "req_quantity":fields.Integer,
    "product_rate":fields.Integer,
    "product_unit":fields.String
}



#====================Create Category and product request pares=======================================
create_Category_parser = reqparse.RequestParser()
create_Category_parser.add_argument('name')
create_Category_parser.add_argument('active')


create_product_parser = reqparse.RequestParser()
create_product_parser.add_argument('name')
create_product_parser.add_argument('unit')
create_product_parser.add_argument('rate')
create_product_parser.add_argument('quantity')
create_product_parser.add_argument('manufacture_date')
create_product_parser.add_argument('expiry_date')
create_product_parser.add_argument('category_id')


create_cart_parser = reqparse.RequestParser()
create_cart_parser.add_argument('user_id')  
create_cart_parser.add_argument('product_id')   
create_cart_parser.add_argument('product_name')
create_cart_parser.add_argument('req_quantity')
create_cart_parser.add_argument('product_rate')
create_cart_parser.add_argument('product_unit')




#====================Update Category and product request pares=======================================
update_Category_parser = reqparse.RequestParser()
update_Category_parser.add_argument('name')
update_Category_parser.add_argument('active')

update_product_parser = reqparse.RequestParser()
update_product_parser.add_argument('name')
update_product_parser.add_argument('unit')
update_product_parser.add_argument('rate')
update_product_parser.add_argument('quantity')
update_product_parser.add_argument('manufacture_date')
update_product_parser.add_argument('expiry_date')
update_product_parser.add_argument('category_id')


#=================================Category api======================================================
class Category_Api(Resource):

    #==========GET all categories================
    @auth_required('token')
    @any_role_required('Admin','Manager','Customer')
    # @roles_required('Manager')
    def get(self):
        data = []
        category = Category.query.all()
        if category is None:
            return NotFoundError(status_code=404)
        else:
            for i in category:
                data.append({"id":i.id,"name":i.name, "image":i.image,  "active":i.active})
            return data
    #==========POST================   
    @marshal_with(Category_fields)
    @any_role_required('Admin','Manager')
    @auth_required('token')
    def post(self):
        args = create_Category_parser.parse_args()
        name = args.get("name",None)
        active = args.get("active",None)
        if active is not None:
            active = active.lower() == 'true'
        if name is None:
            raise BusinessValidationError(status_code=400,error_code="BE1001",error_message="Category name is required")
        category = Category.query.filter_by(name = name).first()
        if category:
            raise BusinessValidationError(status_code=400,error_code="BE1004",error_message="duplicate Category")
        new_Category = Category(name=name,active=active)
        db.session.add(new_Category)
        db.session.commit()
        return new_Category,201
    
    #==========PUT================
    @any_role_required('Admin','Manager')
    @auth_required('token')
    @marshal_with(Category_fields)
    def put(self,id):
        args = update_Category_parser.parse_args()
        name = args.get("name")
        active = args.get("active",None)
        if active is not None:
            active = active.lower() == 'true'
        if name is None:
            return BusinessValidationError(status_code=400, error_code="name", error_message="Category Name is required")
        category = Category.query.filter_by(id = id).first()
        if category is None:
            raise NotFoundError(status_code=404)
        Category.query.filter(Category.id==id).update({'name':name, 'active':active})
        db.session.commit()
        return category
    

    
    #================DELETE===========
    @roles_required('Admin')
    @auth_required('token')
    def delete(self, id):
        ALLOWED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'gif']  # Add more formats as needed
        deleted_formats = []

        # Attempt to delete images
        for img_format in ALLOWED_IMAGE_FORMATS:
            img_path = f'static/uploads/{id}_cat_image.{img_format}'
            if os.path.exists(img_path):
                os.remove(img_path)
                deleted_formats.append(img_format)

        # Check if any images were deleted
        if deleted_formats:
            # Additional deletion logic for Category and related products
            C1 = Category.query.get(id)
            if C1 is not None:
                p1 = C1.product_relation 
                for i in p1:
                    for img_format in ALLOWED_IMAGE_FORMATS:
                        img_path = f'static/uploads/{i.id}_pro_image.{img_format}'
                        if os.path.exists(img_path):
                            os.remove(img_path)
                            deleted_formats.append(img_format)
                    db.session.delete(i)
                db.session.delete(C1)
                db.session.commit()
                return f"Deleted images of formats: {', '.join(deleted_formats)} and Category", 201

        # If no images were found to delete, proceed to delete only the category
        C1 = Category.query.get(id)
        if C1 is not None:
            p1 = C1.product_relation 
            for i in p1:
                db.session.delete(i)
            db.session.delete(C1)
            db.session.commit()
            return "Deleted Category", 201

        return NotFoundError(status_code=404)

#=================================Product api======================================================
class Product_Api(Resource):

        
    #==========GET all products================
    @auth_required('token')
    @any_role_required('Admin','Manager','Customer')
    def get(self,id):
        c = Category.query.get(id)
        products = c.product_relation
        data = []
        if products is None:
            return NotFoundError(status_code=404)
        else:
            for i in products:
                data.append({"id":i.id,"name":i.name,"unit":i.unit,"rate":i.rate,"quantity":i.quantity,"manufacture_date":i.manufacture_date,"expiry_date":i.expiry_date, "image":i.image,"category_id":i.category_id})
            return data

    #==========POST================   
    @auth_required('token')
    @roles_required('Manager')
    @marshal_with(Product_fields)
    def post(self,id):
        args = create_product_parser.parse_args()
        name = args.get("name",None)
        unit = args.get("unit",None)
        rate = args.get("rate",None)
        quantity = args.get("quantity",None)
        manufacture_date = args.get("manufacture_date",None)
        expiry_date = args.get("expiry_date",None)
        category_id = id
        if name is None:
            raise BusinessValidationError(status_code=400,error_code="BE1001",error_message="Product name is required")
        if unit is None:
            raise BusinessValidationError(status_code=400,error_code="BE1002",error_message="Product unit is required")
        if rate is None:
            raise BusinessValidationError(status_code=400,error_code="BE1003",error_message="Product rate is required")
        if quantity is None:
            raise BusinessValidationError(status_code=400,error_code="BE1008",error_message="Product quantity is required")
        if manufacture_date is None:
            raise BusinessValidationError(status_code=400,error_code="BE1005",error_message="Product manufacture_date is required")
        if expiry_date is None:
            raise BusinessValidationError(status_code=400,error_code="BE1006",error_message="Product expiry_date is required")
        if category_id is None:
            raise BusinessValidationError(status_code=400,error_code="BE1007",error_message="Product category_id is required")
        


        
        product = Product.query.filter_by(name = name, unit= unit, rate= rate, quantity= quantity, manufacture_date=manufacture_date, category_id=category_id).first()
        if product:
            raise BusinessValidationError(status_code=400,error_code="BE1004",error_message="duplicate Product")
        new_Product = Product(name=name, unit= unit, rate= rate, quantity= quantity, manufacture_date=manufacture_date, expiry_date=expiry_date, category_id=category_id)
        
        db.session.add(new_Product)
        db.session.commit()
        p = Product.query.filter_by(name = name, unit= unit, rate= rate, quantity= quantity, manufacture_date=manufacture_date, category_id=category_id).first()
        pid = p.id
        asso = Association(category_id=category_id,product_id=pid)
        db.session.add(asso)
        db.session.commit()
        return new_Product,201
    
    #==========PUT================
    @roles_required('Manager')
    @auth_required('token')
    @marshal_with(Product_fields)
    def put(self,id):
        args = update_product_parser.parse_args()
        name = args.get("name",None)
        unit = args.get("unit",None)
        rate = args.get("rate",None)
        quantity = args.get("quantity",None)
        manufacture_date = args.get("manufacture_date",None)
        expiry_date = args.get("expiry_date",None)
        category_id = args.get("category_id",None)
        if name is None:
            raise BusinessValidationError(status_code=400,error_code="BE1001",error_message="Product name is required")
        if unit is None:
            raise BusinessValidationError(status_code=400,error_code="BE1002",error_message="Product unit is required")
        if rate is None:
            raise BusinessValidationError(status_code=400,error_code="BE1003",error_message="Product rate is required")
        if quantity is None:
            raise BusinessValidationError(status_code=400,error_code="BE1008",error_message="Product quantity is required")
        if manufacture_date is None:
            raise BusinessValidationError(status_code=400,error_code="BE1005",error_message="Product manufacture_date is required")
        if expiry_date is None:
            raise BusinessValidationError(status_code=400,error_code="BE1006",error_message="Product expiry_date is required")
        if category_id is None:
            raise BusinessValidationError(status_code=400,error_code="BE1007",error_message="Product category_id is required")
     
        product = Product.query.filter_by(id = id).first()
        if product is None:
            raise NotFoundError(status_code=404)
        Product.query.filter(Product.id==id).update({'name':name,'unit':unit, 'rate':rate, 'quantity': quantity, 'manufacture_date':manufacture_date, 'expiry_date':expiry_date, 'category_id':category_id})
        db.session.commit()
        return product,201
    
    @roles_required('Manager')
    @auth_required('token')
    def delete(self, id):
        ALLOWED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'gif']  # Add more formats as needed
        deleted_formats = []

        # Attempt to delete images
        for img_format in ALLOWED_IMAGE_FORMATS:
            img_path = f'static/uploads/{id}_pro_image.{img_format}'
            if os.path.exists(img_path):
                os.remove(img_path)
                deleted_formats.append(img_format)

        # Check if any images were deleted
        if deleted_formats:
            # Additional deletion logic for Category and related products
            P1 = Product.query.get(id)
            if P1 is not None:
                db.session.delete(P1)
                db.session.commit()
                return f"Deleted images of formats: {', '.join(deleted_formats)} and Product", 201

        # If no images were found to delete, proceed to delete only the category
        P1 = Product.query.get(id)
        if P1 is not None:
            db.session.delete(P1)
            db.session.commit()
            return "Deleted Product", 201

        return NotFoundError(status_code=404)
    
class Categoryget_Api(Resource):
    #==========GET================
    @marshal_with(Category_fields)
    @auth_required('token')
    @any_role_required('Admin','Manager','Customer')
    def get(self,id):
        category = Category.query.filter_by(id = id).first()
        if category is None:
            return NotFoundError(status_code=404)
        else:
            return category
class Productget_Api(Resource):
    #==========GET================
    @auth_required('token')
    @any_role_required('Admin','Manager','Customer')
    @marshal_with(Product_fields)
    def get(self,id):
        product = Product.query.filter_by(id = id).first()
        if product is None:
            return NotFoundError(status_code=404)
        else:
            return product
        
class Cart_Api(Resource):

    @auth_required('token')
    @any_role_required('Customer')
    @marshal_with(cart_fields)
    def get(self,id):
        cart = Cart.query.filter_by(user_id = id).all()
        if cart is None:
            return NotFoundError(status_code=404)
        else:
            return cart

    @auth_required('token')
    @any_role_required('Customer') 
    @marshal_with(cart_fields)
    def post(self):
        args = create_cart_parser.parse_args()
        user_id = args.get("user_id",None)
        product_id = args.get("product_id",None)
        product_name = args.get("product_name",None)
        req_quantity = args.get("req_quantity",None)
        product_rate = args.get("product_rate",None)
        product_unit = args.get("product_unit",None)
        if user_id is None:
            raise BusinessValidationError(status_code=400,error_code="BE1001",error_message="user_id is required")
        if product_id is None:
            raise BusinessValidationError(status_code=400,error_code="BE1002",error_message="product_id is required")
        if product_name is None:
            raise BusinessValidationError(status_code=400,error_code="BE1003",error_message="product_name is required")
        if req_quantity is None:
            raise BusinessValidationError(status_code=400,error_code="BE1004",error_message="req_quantity is required")
        if product_rate is None:
            raise BusinessValidationError(status_code=400,error_code="BE1005",error_message="product_rate is required")
        if product_unit is None:
            raise BusinessValidationError(status_code=400,error_code="BE1006",error_message="product_unit is required")
        new_cart = Cart(user_id=user_id,product_id=product_id,product_name=product_name,req_quantity=req_quantity,product_rate=product_rate,product_unit=product_unit)
        db.session.add(new_cart)
        db.session.commit()
        return new_cart,201
    
    @auth_required('token')
    @any_role_required('Customer')
    @marshal_with(cart_fields)
    def delete(self,id):
        cart = Cart.query.filter_by(id = id).all()
        if cart is None:
            return NotFoundError(status_code=404)
        else:
            for i in cart:
                db.session.delete(i)
            db.session.commit()
            return "deleted cart",201
        

class bought_api(Resource):

    @auth_required('token')
    @roles_required('Customer')
    @marshal_with(bought_fields)
    def get(self,id):
        bought = Bought.query.filter_by(user_id = id).all()
        if bought is None:
            return NotFoundError(status_code=404)
        else:
            return bought
        
   

api.add_resource(Category_Api, "/api/category/<int:id>", "/api/category", )
api.add_resource(Categoryget_Api, "/api/categoryget/<int:id>")
api.add_resource(Product_Api, "/api/product/<int:id>", "/api/product",)
api.add_resource(Productget_Api, "/api/productget/<int:id>")
api.add_resource(Cart_Api, "/api/cart/<int:id>", "/api/cart",)
api.add_resource(bought_api, "/api/bought/<int:id>",)