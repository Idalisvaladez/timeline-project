import React, { useState } from "react";
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
    const {id, description} = events
    const [updateDes, setUpdateDes] = useState(description);
    const [form] = Form.useForm();

    const onValuesChange = (changeValue, values) => {
        const newDescription = (changeValue, values)
        setUpdateDes(newDescription)
        console.log("this is the new event info: ", newDescription)
      };

    const onSubmit = (e) => {
        e.preventDefault();
        let edited_event = {
            description: updateDes.description,
        }
        fetch(`/events/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(edited_event)
        })
        .then((res) => {
            if (res.status === 202) {
                return res.json()
            } else if (res.status === 400) {
                console.log('Please edit description before submitting')
            }
        })
        .then((data) => handleUpdateEvent(data))
        .catch((error) => console.error(error))
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