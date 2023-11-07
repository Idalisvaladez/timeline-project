import React, { useState, useForm} from "react";
import { Button, Form, Input } from "@arco-design/web-react";

const formItemLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 17,
    },
  };


function EditEventForm({events, handleUpdateEvent}) {
    const {id, description, user_id} = events
    const [descriptions, setDescriptions] = useState(events.description);
    const [userId, setUserId] = useState(events.user_id)
    const [form] = Form.useForm();

    const onValuesChange = (changeValue, values) => {
        console.log(events)
        setDescriptions(values)
        console.log('descriptions: ', descriptions, userId)
      };

    const onSubmit = (e) => {
        e.preventDefault();
        fetch(`/events/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(descriptions)
        })
        .then((res) => {
            if (res.status === 202) {
                console.log('descriptions from res: ',descriptions)
                return res.json()
            } else if (res.status === 400) {
                console.log('Please edit description before submitting')
            }
        })
        .then((data) => handleUpdateEvent(data))
        .catch((error) => console.log(error))
    }

    return (
        <Form 
            {...formItemLayout}
            form={form}
            onValuesChange={onValuesChange}
            initialValues={{description: ''}}
        >   
            <Form.Item field='description' initialValue={description}>
                <Input.TextArea autoSize />
            </Form.Item>
            <Button onClick={onSubmit}>Submit</Button>
        </Form>
    )
}

export default EditEventForm;