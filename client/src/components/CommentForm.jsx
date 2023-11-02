import React, {useState} from "react";
import {Avatar, Form, Comment, Button, Input, Message} from '@arco-design/web-react';
import { useUser } from "./UserDetails";


function CommentForm({events, handleAddComment}) {
    const [userDetails, setUserDetails] = useUser();
    const [eventId, setEventId] = useState('');
    const [newComment, setNewComment] = useState([])

    const onValuesChange = (changeValue, values) => {
        const newComment = (changeValue, values)
        setNewComment(newComment)
        setEventId(events.id)
        console.log("this is the event info: ", newComment, eventId)
      };

      const onSubmit = (e) => {
        e.preventDefault();
        let new_comment = {
            comment: newComment.comment,
            user_id: userDetails.id,
            event_id: eventId,
        }
        fetch("/comments", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_comment),
        })
        .then(res => {
            if (res.status === 201) {
                Message.success('Comment posted!');
                return res.json()
            } else if (res.status === 400) {
                Message.error('Failed to post comment!')
            }
        })
        .then(comment => handleAddComment(comment))
    }


    return (
        <Comment
                align='right'
                actions={[
                <Button key='0' type='secondary'>
                    Cancel
                </Button>,
                <Button key='1' type='primary' onClick={onSubmit}>
                    Post
                </Button>,
                ]}
                avatar={
                    <Avatar>
                        <img alt ={userDetails.username} src ={userDetails.profile_picture}/>
                    </Avatar>}
                content={
                <Form 
                    initialValues={{comment: ''}}
                    onValuesChange={onValuesChange}
                >
                    <Form.Item field='comment'>
                        <Input.TextArea 
                            placeholder="Add a comment... " 
                            maxLength={{ length: 500, errorOnly: true}}
                            showWordLimit
                            autoSize
                            wrapperStyle={{width: 250}}
                        />
                    </Form.Item>
                </Form>
                }
                />
    )
}

export default CommentForm;