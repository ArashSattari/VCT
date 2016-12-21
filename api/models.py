# Create your Flask-SQLALchemy models as usual but with the following
# restriction: they must have an __init__ method that accepts keyword
# arguments for all columns (the constructor in
# flask_sqlalchemy.SQLAlchemy.Model supplies such a method, so you
# don't need to declare a new one).
from config import db


class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    birth_date = db.Column(db.Date)


class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Unicode)
    published_at = db.Column(db.DateTime)
    author_id = db.Column(db.Integer, db.ForeignKey('person.id'))
    author = db.relationship(Person, backref=db.backref('articles',
                                                        lazy='dynamic'))