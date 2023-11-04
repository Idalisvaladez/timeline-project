from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.sql import func
from datetime import *
from sqlalchemy.ext.hybrid import hybrid_property


from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    username = db.Column(db.String, unique = True)
    _password_hash = db.Column(db.String, nullable = False)
    profile_picture = db.Column(db.String, default = "https://pixabay.com/get/g85c3c97d1b6da4d7313d19607b5cc476c22a932d3ef3f2f583e5a52be957a98dda28167e027b7023b80462a4559ae1533d2c659e2408af13b2663921c385d2980f4c00a686e4b3c2efee025938b13916_640.png")

    # Relationship to intermediary models
    comments = db.relationship('Comment', backref = 'user', cascade= 'all, delete-orphan')
    likes = db.relationship('Like', backref='user', cascade = 'all, delete-orphan')
    events = db.relationship('Event', backref= 'user', cascade = 'all, delete-orphan')

    # Prevent recursion error
    serialize_rules = ("-comments.user", "-likes.user",'-events.user','-events.comments.user', '-events.likes.user',)

    @validates('name')
    def validate_name(self, key, name):
        if name and 1 <= len(name):
            return name
        else:
            raise ValueError("Name cannot be empty")
        
    @validates('username')
    def validate_username(self, key, username):
        if username and 1 <= len(username):
            return username
        else:
            raise ValueError("Username cannot be empty")
        
    @validates('password')
    def validate_password(self, key, password):
        if password and 1 <= len(password):
            return password
        else:
            raise ValueError("Password cannot be empty")
        
    @validates('email')
    def validate_email(self, key, email):
        if email and '@' in email:
            return email
        else:
            raise ValueError("Must be a valid email")

    
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        if password and len(password) >= 12:
            password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
            self._password_hash = password_hash.decode('utf-8')
        else:
            raise ValueError("Password Invalid")
        
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    
    def __repr__(self):
        return f'<User {self.username}, ID {self.id}>'



class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key = True)
    comment = db.Column(db.String(500), nullable = False)
    timestamp = db.Column(db.DateTime, default = datetime.utcnow)

    # Relationship to user and event
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    # Prevent recursion error
    serialize_rules = ("-user.comments", "-event.comments",)

    @validates('comment')
    def validate_comment(self, key, comment):
        if comment and 1 <= len(comment) <= 500:
            return comment
        elif len(comment) > 500:
            raise ValueError("Comment cannot excede 500 characters")
        elif 1 <= len(comment):
            raise ValueError("Comment cannot be empty")

    def __repr__(self):
        return f'<Comment {self.comment} at {self.timestamp}>'
    

    
class Like(db.Model, SerializerMixin):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key = True)
    liked = db.Column(db.Boolean) 

    # Relationship to user and event
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    # Prevent recursion error
    serialize_rules = ("-user.likes", "-event.likes",)

    def __repr__(self):
        return f'<Liked is {self.liked}>'
    

    
class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    picture = db.Column(db.String, nullable = False)
    description = db.Column(db.String(500), nullable = True)
    timestamp = db.Column(db.DateTime, default = datetime.utcnow)

    
    # Relationship to intermediary models
    comments = db.relationship('Comment', backref = 'event', cascade= 'all, delete-orphan')
    likes = db.relationship('Like', backref='event', cascade = 'all, delete-orphan')

    # Prevent recursion errors
    serialize_only = ('-comments.event', '-likes.event',)


    def __repr__(self):
        return f'<Event {self.id} created at {self.timestamp}'




