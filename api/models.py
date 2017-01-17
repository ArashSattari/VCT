# Create your Flask-SQLALchemy models as usual but with the following
# restriction: they must have an __init__ method that accepts keyword
# arguments for all columns (the constructor in
# flask_sqlalchemy.SQLAlchemy.Model supplies such a method, so you
# don't need to declare a new one).
from config import db


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.Unicode)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.Unicode)
    password = db.Column(db.Unicode)
    first_name = db.Column(db.Unicode)
    last_name = db.Column(db.Unicode)
    email = db.Column(db.Unicode)
    company_id = db.Column(db.ForeignKey('company.id'))
    company = db.relationship(Company, backref=db.backref('users', lazy='dynamic'))


class Sign(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    px = db.Column(db.Float)
    pz = db.Column(db.Float)
    ix = db.Column(db.Float)
    iy = db.Column(db.Float)
    iz = db.Column(db.Float)
    iry = db.Column(db.Float)
    iw = db.Column(db.Float)
    ih = db.Column(db.Float)
    cx = db.Column(db.Float)
    cz = db.Column(db.Float)
    crx = db.Column(db.Float)
    cry = db.Column(db.Float)
    img_url = db.Column(db.Unicode)
    reports = db.Column(db.Unicode)
    owner_id = db.Column(db.ForeignKey('user.id'))
    owner = db.relationship(User, backref=db.backref('signs', lazy='dynamic'))
    company_id = db.Column(db.ForeignKey('company.id'))
    company = db.relationship(Company, backref=db.backref('signs', lazy='dynamic'))


#
# class Person(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.Unicode)
#     birth_date = db.Column(db.Date)
#
#
# class Article(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.Unicode)
#     published_at = db.Column(db.DateTime)
#     author_id = db.Column(db.Integer, db.ForeignKey('person.id'))
#     author = db.relationship(Person, backref=db.backref('articles',
#                                                         lazy='dynamic'))