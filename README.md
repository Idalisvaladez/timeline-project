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



<img width="1231" alt="Data-Model" src="https://github.com/Idalisvaladez/timeline-project/assets/139524475/21f76dfa-47f8-43f5-917c-005c67ddcda6">




### Relationships

- A ‘User’ has many ‘Comments’
- A 'User' has many 'Events' through 'Comments'
- A ‘User’ has many ‘Likes'
- A ‘User’ has many ‘Events’ through ‘Likes’
- An ‘Event’ has many ‘Likes’ & many ‘Comments’
- An 'Event' has many 'Users' through 'Likes' & 'Comments'

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
- DELETE /users/<int:id>/events/<int:id>/comments/<int:id>
- PATCH /events/<int:id>/likes/<int:id>
- POST /events/<int:id>/comments
- PATCH /events/<int:id>/comments/<int:id>

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
- PATCH /events/<int:id>/comments/<int:id>

### NavBar
- /home
- /profile
- /create-event

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
- Friend requests/ friendships
