from celery import shared_task
from model import Product,User,Role
import flask_excel as excel
# from .mail_service import send_message
from model import User, Role
from jinja2 import Template
from mailservice import send_message
import os

from datetime import datetime, timedelta
from flask import render_template_string
from flask_mail import Message
from sqlalchemy import func
# from . import mail  # Assuming you have a Flask-Mail instance named 'mail'
from model import User, Bought


@shared_task(ignore_result=False)
def create_resource_csv():
    stud_res = Product.query.with_entities(
        Product.name, Product.unit, Product.quantity, Product.rate).all()

    csv_output = excel.make_response_from_query_sets(
        stud_res, ["name", "unit", "quantity", "rate"], "csv")
    filename = "test.csv"

    with open(filename, 'wb') as f:
        f.write(csv_output.data)
    return filename



@shared_task(ignore_result=True)
def daily_reminder(to, subject):
    users = User.query.filter(User.roles.any(Role.name == 'Customer')).all()
    for user in users:
        email_content = render_template_string(
        """
        <h1>Grocery Store Visit</h1>
        <p>Hello {{name}},</p>
        <p>We hope this message finds you well. We wanted to remind you that there are exciting offers availabe in our grocery store</p>
        <p>Many Products are available at discounted Prices.</p>
        <p>We are looking forward for your Visit soon.</p>
        <p>Best regards,</p>
        <p>The Grocery Store Team</p>
        """,
        name=user.username
        )
        send_message( user.email, subject,email_content)
    return "OK"
  


@shared_task(ignore_result=True)
def monthly_report(to, subject):
    
    # users = User.query.filter(User.roles.any(Role.name == 'Customer')).all()
    Manager = User.query.filter(User.roles.any(Role.name == 'Manager')).all()
    c = datetime.now()
    current_date = c.strftime('%Y-%m-%d')
    past_date = (c - timedelta(days=30)).strftime('%Y-%m-%d')


    orders = Bought.query.with_entities( 
        Bought.user_id, Bought.date, Bought.product_name, Bought.req_quantity, Bought.product_rate).filter(Bought.date.between(past_date, current_date)).all()
    

    for manager in Manager:
        html_report = render_template_string("""
            <html>
                <head></head>
                <body>
                    <h2>Monthly Report</h2>
                    <h3> Hello {{ managername }}</h3>  
                    <p>Here is the monthly report of the orders placed in the last 30 days</p>
                    <p>from {{past_date}} to {{current_date}} </p>             
                    <table border="1">
                        <tr>
                            <th>User ID</th>
                            <th>Date</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                        {% for order in orders %}
                            <tr>
                                <td>{{ order.user_id }}</td>
                                <td>{{ order.date }}</td>
                                <td>{{ order.product_name }}</td>
                                <td>{{ order.req_quantity }}</td>
                                <td>{{ order.req_quantity * order.product_rate }}</td>
                            </tr>
                        {% endfor %}
                    </table>
                </body>
            </html>
        """,  orders=orders, managername=manager.username, past_date=past_date, current_date=current_date )
        send_message(manager.email, subject, html_report)
    return "OK"



