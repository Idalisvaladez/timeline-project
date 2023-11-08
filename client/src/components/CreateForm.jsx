import React, {useState} from "react";
import { Modal, Form, Input, Upload, Button, Message} from "@arco-design/web-react";
import { useUser } from '../components/UserDetails';
import apiKey from "../ApiKey";


const FormItem = Form.Item
const formItemLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 17,
    },
  };


function CreateForm({handleAddEvent, visible, setVisible}) {
    const [userDetails, setUserDetails] = useUser();
    const [newEvent, setNewEvent] = useState([]);
    const [userId, setUserId] = useState('')
    const [eventUrl, setEventUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onValuesChange = (changeValue, values) => {
        const newEvent = (changeValue, values)
        setNewEvent(newEvent)
        setUserId(userDetails.id)
        console.log("this is the event info: ", newEvent, userId)
      };


      const uploadImage = (files) => {
        console.log(files)

        const formData = new FormData()
        formData.append('file', files)
        formData.append('upload_preset', 'q9tpgtm7')
        formData.append('api_key', apiKey)

        fetch('https://api.cloudinary.com/v1_1/idvalacloud/image/upload', {
            method: 'POST',
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => {
            setEventUrl(data.secure_url)
        })
    }
    
      const onSubmit = (e) => {
        e.preventDefault();
        let new_event = {
            description: newEvent.description,
            picture: eventUrl,
            user_id: userId,
        }
        fetch("/events", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_event),
        })
        .then(res => {
            if (res.status === 201) {
                setLoading(true);
                Message.success('Event posted!');
                setVisible(false)
                setLoading(false);
                return res.json()
            } else if (res.status === 400) {
                setLoading(true);
                Message.error('Failed to post event!')
                setLoading(false)
                console.error('All fields required to signup')
            }
        })
        .then(event => handleAddEvent(event))
        .catch((error) => console.error('Error: ', error));
    }
    
    

    return (
        <Form
            {...formItemLayout}
            form={form}
            labelCol={{
                style: { flexBasis: 90 },
            }}
            wrapperCol={{
                style: { flexBasis: 'calc(100% - 90px)' },
            }}
            initialValues={{description: ''}}
            onValuesChange={onValuesChange}
        >
            <Form.Item
                label='Picture'
                field='picture'
                >
                    <Upload drag field='file' onDrop={(event) => {uploadImage(event.dataTransfer.files[0])}}/>
            </Form.Item>
            <FormItem label='Caption' field='description' rules={[{ required: true }]}>
                    <Input.TextArea 
                            placeholder="Add a description... " 
                            maxLength={{ length: 150, error: true}}
                            autoSize
                            allowClear
                            wrapperStyle={{maxWidth: '100%'}}
                    />
            </FormItem>
            <>
                      <Button
                        onClick={() => {
                          setVisible(false);
                          form.resetFields({picture: '', description: ''})
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        loading={loading}
                        onClick={onSubmit}
                        type='primary'
                        htmlType="submit"
                      >
                        Post
                      </Button>
                    </>
        </Form>
    )
}

export default CreateForm;