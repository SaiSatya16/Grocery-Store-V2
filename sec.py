from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required
from model import db, User, Role
datastore = SQLAlchemyUserDatastore(db, User, Role)