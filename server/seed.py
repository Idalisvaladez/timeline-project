#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Comment, Like, Event


def create_users():
    users = []
    for _ in range(10):
        user = User(
            name = fake.name(),
            email = fake.email(),
            username = fake.user_name(),
            password_hash = fake.password(length= 12),
            profile_picture = fake.image_url(),
        )
        users.append(user)
    return users

def create_comments(users, events):
    comments = []
    for _ in range(15):
        comment = Comment(
            comment = fake.sentence(nb_words = 15),
            timestamp = fake.date_time(),
            user_id = rc(users).id,
            event_id = rc(events).id,
        )
        comments.append(comment)
    return comments

def create_likes(users, events):
    likes = []
    for _ in range(10):
        like = Like(
            liked = fake.boolean(),
            user_id = rc(users).id,
            event_id = rc(events).id,
        )

        likes.append(like)
    return likes

def create_events(users):
    events = []
    for _ in range(10):
        event = Event(
            user_id = rc(users).id,
            picture = fake.image_url(),
            description = fake.sentence(nb_words = 10),
            timestamp = fake.date_time(),
        )
        events.append(event)
    return events


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Clearing db...")
        User.query.delete()
        Comment.query.delete()
        Like.query.delete()
        Event.query.delete()
        db.session.commit()

        print("Seeding users...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print("Seeding events...")
        events = create_events(users)
        db.session.add_all(events)
        db.session.commit()

        print("Seeding comments...")
        comments = create_comments(users, events)
        db.session.add_all(comments)
        db.session.commit()

        print("Seeding likes...")
        likes = create_likes(users, events)
        db.session.add_all(likes)
        db.session.commit()

        print("Done seeding :) ")