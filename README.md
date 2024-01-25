# Grocery Store Web Application

This project is a sophisticated multi-user grocery store web application that seamlessly integrates Vue.js for the frontend and Flask for the backend. Bootstrap ensures an intuitive, user-friendly interface, allowing for dynamic category and product management.

## Installation

1. Create a virtual environment:
`python3 -m venv venv`

2. Activate the virtual environment:
`source venv/bin/activate`

3. Install required dependencies:
`pip install -r requirements.txt`

4. Set up Environment Variables:
`export DATABASE_URL=sqlite:///database.sqlite3`

5. Create a SQLite3 database by running:
`python upload_initial_data.py`

6. Start the Flask server:
`flask run`

7. Visit `localhost` in your browser to access the grocery store application.

## Usage
Login as an admin to manage categories and approve manager requests. Login as a manager to manage products within approved categories. Login as a customer to shop and place orders.
- **Admin Credentials**:
    - **Email**: admin@gmail.com
    - **Password**: admin
- **Manager Credentials**:
    - **Email**: manager@gmail.com
    - **Password**: manager
- **Customer Credentials**:
    - **Email**: customer@gmail.com
    - **Password**: customer

- you cam also create your own account and login.
- you can register as a manager and wait for admin approval.
- you can register as a customer and start shopping.

## Background Job Execution
- open a new terminal and run the following command:
    - `redis-server`
- open a another terminal and run the following command:
    - `celery -A app.celery worker --loglevel=info`
- open one terminal and run the following commands:
    - `celery -A app:celery_app beat -l INFO`

This will start the celery worker and celery beat.
To test the email notification feature, login as an admin and click on the "Send Daily Reminder" button. This will send a reminder email to all customers who have items in their cart. To test the monthly report feature, login as an admin and click on the "Send Monthly Report" button. This will send a monthly report to all managers.

To test emails in development, you can use Mail-Hog. To install Mail-Hog, browse to the Mail-Hog Github Repository and follow the installation instructions for your operating system. Once installed, run Mail-Hog and visit `localhost:8025` in your browser to view emails sent by the application.

## Description

This application is designed to provide a comprehensive and seamless grocery shopping experience. It merges frontend and backend technologies to ensure smooth interactions for users, admins, and managers.

- **Vue.js & Flask Integration**: Frontend and backend technologies merge seamlessly to offer a responsive and interactive user experience.

- **Dynamic Category and Product Management**: Admins and managers have effortless control over categories and products, enabling real-time stock updates and flexible pricing options.

- **Security Features**: Token-based authentication ensures secure access for admins, managers, and customers. Admins have control over manager approvals, establishing a secure access hierarchy.

- **Flask REST APIs**: Strict data validation through APIs ensures accuracy and integrity of user interactions.

- **Efficient Batch Job Execution**: Integration of Redis and Celery enhances performance during heavy loads, ensuring efficient batch job execution.

## Architecture and Features

The project's architecture consists of several key components:

- **Model Definitions**: `model.py` contains definitions for different models like Category, Product, Association, User, Role, RoleUsers, Cart, and Bought.

- **Controllers and API Endpoints**: `app.py` manages app creation and controllers, while `api.py` houses all API endpoints.

- **Token-based Authentication**: Implementation of token-based authentication for Admin, Customer, and Manager roles.

- **Role-based Access Control**: Admins can perform CRUD operations on categories, managers can manage items within approved categories, and customers can shop and place orders.

- **Email Notifications**: Admins can send daily reminder emails to customers and monthly reports to managers.

This application offers a robust, secure, and responsive grocery shopping experience, ensuring data integrity while seamlessly integrating functionalities for various user roles.

