#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
from datetime import *


# Local imports
from config import app, db, api
# Add your model imports
from models import User, Event, Comment, Like


# Views go here!

class Users(Resource):
    def get(self):
        users = [user.to_dict(only = ('id', 'name', 'username','profile_picture')) for user in User.query.all()]
        return make_response(users, 200)
    

api.add_resource(Users, '/users')

class Signup(Resource):
    def post(self):
        data = request.json
        try: 
            new_user = User(
                    name = data['name'],
                    email = data['email'],
                    username = data['username'],
                    password_hash = data['_password_hash'],
                )
            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id

            return make_response(new_user.to_dict(), 201)
        
        except ValueError:
            return make_response({'error': '422 Unprocessable Entity'}, 422)


api.add_resource(Signup, '/signup')

class Login(Resource):

    def post(self):
        data = request.json
        print(data['email'])
        print(data['_password_hash'])

        user = User.query.filter_by(email = data['email']).first()
        password = data['_password_hash']

        if user and user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(rules = ('-password_hash',)), 201)
        elif user._password_hash != data['_password_hash']:
            return make_response({"error": "incorrect password"}, 403)
        elif user is None:
            return make_response({"error": "user not found"}, 404)
        
api.add_resource(Login, '/login')


class Logout(Resource):

    def delete(self):
        session['user_id'] = None

        return make_response({}, 204)
    

api.add_resource(Logout, '/logout')

class CheckSession(Resource):

    def get(self):
        user = User.query.filter_by(id = session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return make_response({'message': '401: Not Authorized'}, 401)

api.add_resource(CheckSession, '/check_session')




class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id = id).first()

        if user:
            return make_response(user.to_dict(rules = ('-comments', '-likes','-_password_hash','-email',)), 200)
        else:
            return make_response({"error": "No user found"}, 404)
        
    def delete(self, id):
        user = User.query.filter_by(id = id).first()

        if user:
            db.session.delete(user)
            db.session.commit()

            return make_response({"Successfully deleted": True}, 204)
        else:
            return make_response({"error": "No user found"}, 404)
        
    def patch(self, id):
        user = User.query.filter_by(id = id).first()
        data = request.json

        if user:
            try:
                for u in data:
                    setattr(user, u, data[u])

                db.session.add(user)
                db.session.commit()

                return make_response(user.to_dict(only = ('id', 'name', 'username','profile_picture',)), 201)
            except ValueError:
                return make_response({"errors": ["validation errors"]}, 400)
        else:
            return make_response({"error": "No user found"}, 404)

       

api.add_resource(UserByID, '/users/<int:id>')




class Events(Resource):
    def get(self):
        events = [event.to_dict(rules = ('-comments', '-likes',)) for event in Event.query.all()]
        return make_response(events, 200)
    
    def post(self):
        data = request.json

        if data['timestamp']:
            fixed_date = datetime.strptime(data['timestamp'], '%Y-%m-%d %H:%M:%S')
        try:
            new_event = Event(
                picture = data['picture'],
                description = data['description'],
                timestamp = fixed_date,
            )
            db.session.add(new_event)
            db.session.commit()

            return make_response(new_event.to_dict(), 201)

        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)


api.add_resource(Events, '/events')

class EventByID(Resource):
    def get(self, id):
        event = Event.query.filter_by(id = id).first()

        if event:
            return make_response(event.to_dict(rules = ('-comments', '-likes',)), 200)
        else:
            return make_response({"error": "No event found"}, 404)
        
    def delete(self, id):
        event = Event.query.filter_by(id = id).first()

        if event:
            db.session.delete(event)
            db.session.commit()

            return make_response({"Successfully deleted": True}, 204)
        else:
            return make_response({"error": "No event found"}, 404)
        
    def patch(self, id):
        event = Event.query.filter_by(id = id).first()

        if event:
            try:
                data = request.json
                for e in data:
                    setattr(event, e, data[e])

                db.session.add(event)
                db.session.commit()

                return make_response(event.to_dict(only = ('id', 'picture', 'description', 'timestamp',)), 201)
            except ValueError:
                return make_response({"errors": ["validation errors"]}, 400)
        else:
            return make_response({"error": "No event found"}, 404)


api.add_resource(EventByID, '/events/<int:id>')

class UserEvents(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            likes = [like.to_dict(only = ('user_id', 'event_id', 'id',)) for like in Like.query.all() if like.user_id == user.id]
            if likes:
                events = [event.to_dict(only = {'id', 'description',}) for event in Event.query.all()]

            return make_response(likes, 200)
        else:
            return make_response({"error": "No user found"}, 404)


api.add_resource(UserEvents, '/users/<int:id>/events')


class UserEventsByID(Resource):
    def get(self, user_id, event_id):
        user = User.query.filter_by(id = user_id).first()
        if user:
            event = Event.query.filter_by(id = event_id).first()
            if event:
                return make_response({"user_id": user_id, "event_id": event_id, "event_details": event.to_dict(rules = ('-likes','-comments',))}, 200)
            else:
                return make_response({"error": "No event found for the user"}, 404)
        else:
            return make_response({"error": "No user found"}, 404)
        
        
    def delete(self, user_id, event_id):
        user = User.query.filter_by(id = user_id).first()
        if user:
            event = Event.query.filter_by(id = event_id).first()
            if event:
                db.session.delete(event)
                db.session.commit()

                return make_response({"Successfully deleted": True}, 204)
            else:
                return make_response({"error": "No event found for the user"}, 404)                
        else:
            return make_response({"error": "No user found"}, 404)
        
        
    def patch(self, user_id, event_id):
        user = User.query.filter_by(id = user_id).first()
        if user:
            event = Event.query.filter_by(id = event_id).first()
            if event:
                try:
                    data = request.json
                    for key, value in data.items():
                        if hasattr(event, key):
                            if key == 'timestamp':
                                value = datetime.strptime(data['timestamp'], '%Y-%m-%d %H:%M:%S')
                            setattr(event, key, value)

                    db.session.add(event)
                    db.session.commit()

                    return make_response({"user_id": user_id, "event_id": event_id, "event_details": event.to_dict(rules = ('-likes','-comments',))}, 202)
                
                except ValueError as e:
                    return make_response({"errors": ["validation errors"]}, 400)
            else:
                return make_response({"error": "No event found for the user"}, 404)
        else:
            return make_response({"error": "No user found"}, 404)
        
api.add_resource(UserEventsByID, '/users/<int:user_id>/events/<int:event_id>')




class Comments(Resource):
    def get(self):
        comments = [comment.to_dict(only = ('id', 'comment', 'timestamp', 'user_id', 'event_id',)) for comment in Comment.query.all()]
        return make_response(comments, 200)
    
    def post(self):
        data = request.json

        if data['timestamp']:
            fixed_date = datetime.strptime(data['timestamp'], '%Y-%m-%d %H:%M:%S')

        try:
            new_comment = Comment(
                comment = data['comment'],
                timestamp = fixed_date,
                user_id = data['user_id'],
                event_id = data['event_id'],
            )

            db.session.add(new_comment)
            db.session.commit()
            
        except ValueError:
            return make_response({"errors": ["validation errors"]})


api.add_resource(Comments, '/comments')



class CommentByID(Resource):
    def get(self, id):
        comment = Comment.query.filter_by(id = id).first()

        if comment:
            return make_response(comment.to_dict(only = ('id','comment', 'timestamp', 'user_id', 'event_id',)), 200)
        else:
            return make_response({"error": "No comment found"}, 404)
        
    def delete(self, id):
        comment = Comment.query.filter_by(id = id).first()

        if comment:
            db.session.delete(comment)
            db.session.commit()

            return make_response({"Successfully deleted": True}, 204)
        else:
            return make_response({"error": "No comment found"}, 404)
        
    def patch(self, id):
        comment = Comment.query.filter_by(id = id).first()

        if comment:
            try:
                data = request.json
                for c in data:
                    setattr(comment, c, data[c])

                db.session.add(comment)
                db.session.commit()

                return make_response(comment.to_dict(only = ('id', 'comment', 'timestamp', 'user_id', 'event_id',)), 202)
            except ValueError as e:
                print(e)
                return make_response({"errors": ["validation errors"]}, 400)
        else:
            return make_response({"error": "No comment found"}, 404)
       

api.add_resource(CommentByID, '/comments/<int:id>')

class EventComments(Resource):
    def get(self, id):
        event = Event.query.filter_by(id=id).first()
        if event:
            comments = [comment.to_dict(only = ('id', 'comment', 'user_id','event_id',)) for comment in Comment.query.all() if comment.event_id == event.id]


            return make_response(comments, 200)
        else:
            return make_response({"error": "No user found"}, 404)


api.add_resource(EventComments, '/events/<int:id>/comments')


class UserEventComments(Resource):
    def get(self, user_id, event_id):
        user = User.query.filter_by(id = user_id).first()
        if user:
            event = Event.query.filter_by(id = event_id).first()
            if event:
                comments = [
                    comment.to_dict(only=('id', 'comment', 'user_id', 'event_id',))
                    for comment in Comment.query.filter_by(event_id=event.id).all()
                ]
                return make_response(comments, 200)
            else:
                return make_response({"error": "No event found"}, 404)
        else:
            return make_response({"error": "No user found"}, 404)


api.add_resource(UserEventComments, '/users/<int:user_id>/events/<int:event_id>/comments')



class UserEventComment(Resource):
    def get(self, user_id, event_id, comment_id):
        
        user = User.query.filter_by(id = user_id).first()
        if user:
            event = Event.query.filter_by(id=event_id).first()
            if event:
                comment = Comment.query.filter_by(id=comment_id, event_id=event.id, user_id = user.id).first()
                if comment:
                    return make_response(comment.to_dict(only = ('comment', 'user','event', 'id','-event.likes','-user.likes',)), 200)
                else:
                    return make_response({"error": "No comment found for the event"}, 404)
            else:
                return make_response({"error": "No event found for the user"}, 404)
        else:
            return make_response({"error": "No user found"}, 404)
        

    def patch(self, user_id, event_id, comment_id):
        user = User.query.filter_by(id = user_id).first()
        if user:
            event = Event.query.filter_by(id=event_id).first()
            if event:
                comment = Comment.query.filter_by(id=comment_id, event_id=event.id, user_id = user.id).first()
                if comment:
                    try:
                        data = request.json
                        for key, value in data.items():
                            if hasattr(comment, key):
                                if key == 'timestamp':
                                    value = datetime.strptime(data['timestamp'], '%Y-%m-%d %H:%M:%S')
                            setattr(comment, key, value)

                        db.session.add(comment)
                        db.session.commit()

                        return make_response({"event_id": event_id, "comment_id": comment_id, "comment": comment.to_dict(only = ('comment', 'user',))}, 202)
                    except ValueError as e:
                        return make_response({"errors": ["validation errors"]}, 400)
                else:
                    return make_response({"error": "No comment found for the event"}, 404)
            else:
                return make_response({"error": "No event found for the user"}, 404)
        else:
            return make_response({"error": "No user found"}, 404)
        
    

    def delete(self, user_id, event_id, comment_id):
        user = User.query.filter_by(id = user_id).first()
        if user:
            event = Event.query.filter_by(id=event_id).first()
            if event:
                comment = Comment.query.filter_by(id=comment_id, event_id=event.id, user_id = user.id).first()
                if comment:
                    db.session.delete(comment)
                    db.session.commit()

                    return make_response({"Successfully deleted": True}, 204)
                else:
                    return make_response({"error": "No comment found"}, 404)
            else:
                return make_response({"error": "No event found"}, 404)                
        else:
            return make_response({"error": "No user found"}, 404)

api.add_resource(UserEventComment, '/users/<int:user_id>/events/<int:event_id>/comments/<int:comment_id>')



class EventsCommentByID(Resource):
    def get(self, event_id, comment_id):
        event = Event.query.filter_by(id= event_id).first()
        if event:
            comment = Comment.query.filter_by(id = comment_id).first()
            if comment:
                return make_response({"event_id": event_id, "comment_id": comment_id, "comment": comment.to_dict(only = ('user','comment',))}, 200)
            else:
                return make_response({"error": "No comment found for the event"}, 404)
        else:
            return make_response({"error": "No event found"}, 404)
        
        
    def delete(self, event_id, comment_id):
        event = Event.query.filter_by(id= event_id).first()
        if event:
            comment = Comment.query.filter_by(id = comment_id).first()
            if comment:
                db.session.delete(comment)
                db.session.commit()

                return make_response({"Successfully deleted": True}, 204)
            else:
                return make_response({"error": "No comment found for the event"}, 404)                
        else:
            return make_response({"error": "No event found"}, 404)
        
        
    def patch(self, event_id, comment_id):
        event = Event.query.filter_by(id= event_id).first()
        if event:
            comment = Comment.query.filter_by(id = comment_id).first()
            if comment:
                try:
                    data = request.json
                    for key, value in data.items():
                        if hasattr(comment, key):
                            if key == 'timestamp':
                                value = datetime.strptime(data['timestamp'], '%Y-%m-%d %H:%M:%S')
                            setattr(comment, key, value)

                    db.session.add(comment)
                    db.session.commit()

                    return make_response({"event_id": event_id, "comment_id": comment_id, "comment": comment.to_dict(only = ('comment', 'user',))}, 202)
                
                except ValueError as e:
                    return make_response({"errors": ["validation errors"]}, 400)
            else:
                return make_response({"error": "No comment found for the event"}, 404)
        else:
            return make_response({"error": "No event found"}, 404)


api.add_resource(EventsCommentByID, '/events/<int:event_id>/comments/<int:comment_id>')




class Likes(Resource):
    def get(self):
        likes = [like.to_dict(only = ('id', 'liked', 'user_id', 'event_id',)) for like in Like.query.all()]
        return make_response(likes, 200)

api.add_resource(Likes, '/likes')


class LikesByEvent(Resource):
    def get(self, id):
        event = Event.query.filter_by(id = id).first()
        if event:
            likes = [like.to_dict(only = ('liked',)) for like in Like.query.all()]


            return make_response(likes, 200)
        else:
            return make_response({"error": "No user found"}, 404)
        


api.add_resource(LikesByEvent, '/events/<int:id>/likes')



class LikeByID(Resource):
    def get(self, id):
        like = Like.query.filter_by(id = id).first()

        if like:
            return make_response(like.to_dict(only = ('id', 'liked', 'user_id', 'event_id',)), 200)
        else:
            return make_response({"error": "No like found"})
        
    def patch(self, id):
        like = Like.query.filter_by(id = id).first()

        if like:
            try:
                data = request.json
                for l in data:
                    setattr(like, l, data[l])

                db.session.add(like)
                db.session.commit()

                return make_response(like.to_dict(only = ('id', 'liked', 'user_id', 'event_id',)), 202)
            except ValueError as e:
                print(e)
                return make_response({"errors": ["validation errors"]}, 400)
        else:
            return make_response({"error": "No like found"}, 404)

api.add_resource(LikeByID, '/likes/<int:id>')



@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

