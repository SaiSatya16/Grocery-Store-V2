# Grocery Store Web Application

This project is a sophisticated multi-user grocery store web application that seamlessly integrates Vue.js for the frontend and Flask for the backend. Bootstrap ensures an intuitive, user-friendly interface, allowing for dynamic category and product management.

## Installation

1. Install required dependencies:
`pip install -r requirements.txt`

2. Set up Environment Variables:
`export DATABASE_URL=sqlite:///database.sqlite3`

2. Create a SQLite3 database by running:
`python upload_initial_data.py`

3. Start the Flask server:
flask run

4. Visit `localhost` in your browser to access the grocery store application.

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

