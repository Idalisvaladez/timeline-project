# Welcome to Timeline

## Description

A social media application that allows you to post events on your personal timeline and scroll through events from other users.

---

## CRUD Deliverables

- C : Users can create an account, Users can create an Event
- R : Users can view other Users Events, Users can view their own Events, Users can view Likes and Comments on Events
- U : Users can update their profile username and profile picture, Users can edit their Event description, Users can edit their Comments
- D : Users can delete their Events and comments, User can delete their account

## Data Models


<img width="1353" alt="Screenshot 2023-10-24 at 2 51 22 PM" src="https://github.com/Idalisvaladez/timeline-project/assets/139524475/a6016262-1887-4845-9c2f-03e1500e55e8">




### Relationships

- A ‘User’ has many ‘Events’
- A ‘User’ has many ‘Friends’
- A ‘User’ has many ‘Likes’ through ‘Events’
- An ‘Event’ has many ‘Likes’ & many ‘Comments’

### Validations and Contraints

- 'Users' name cannot be empty
- 'Users' usersname cannot be empty and must be unique
- 'Users' password cannot be empty and must be at least 12 characters
- 'Users' email cannot be empty and must include '@'
- 'Comments' cannot be empty and limit 500 characters

---

## WireFrame

![Timeline (1)](https://github.com/Idalisvaladez/timeline-project/assets/139524475/ccc8d726-f8e5-4cc4-970d-873326451bbf)



## API Routes

- GET /users/<int:id>
- GET /events
- GET /events/<int:id>
- GET /users/<int:id>/events
- POST /events
- POST /events/<int:id>/comments
- PATCH /events/<int:id>
- PATCH /users/<int:id>
- PATCH /events/<int:id>/likes
- PATCH /events/<int:id>/comments
- DELETE /users/<int:id>/events/<int:id>
- DELETE /users/<int:id>/events/<int:id>/comments


## Component Routing
### Homepage
- GET /events
- GET /users
- DELETE /users/<int:id>/events/<int:id>/comments
- PATCH /events/<int:id>/likes
- POST /events/<int:id>/comments
- PATCH /events/<int:id>/comments

### Login
- POST /login

### SignUp
- POST /signup

### My profile
- path: /myProfileUserName
- GET /events/<int:id>
- DELETE /events/<int:id>
- PATCH /users/<int:id>
- POST /events/<int:id>/comments
- PATCH /events/<int:id>/comments

### NavBar
- /home
- /profile
- /create-event
- /search

---

## Serialize Rules

- Exclude sensitive information from User (i.e password)
- (‘-likes.user’,)
- (‘-likes.event’,)
- (‘-user.likes’, ‘-event.likes’,)
  
Only include relevant info from users comments (i.e. the comment and username of the user_id that posted it)


---

## Stretch Goals

- Create a real time chat messenger
- Email verification signup message
- Notifications tab that shows comments and likes
