import React from "react";
import { useRef, useEffect, useState, useContext } from 'react';
import '@arco-design/web-react/dist/css/arco.css';
import { useNavigate } from 'react-router-dom';
import { IconUser, IconPen, IconEmail, IconImage } from "@arco-design/web-react/icon";
import '../layout/EditProfileForm.css'


import {
  Form,
  Input,
  Button,
  Message,
  Typography,
  Divider,
  Avatar
} from '@arco-design/web-react';
import { useUser } from "./UserDetails";
const {Title} = Typography;

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
};
const noLabelLayout = {
  wrapperCol: {
    span: 17,
    offset: 7,
  },
};

const FormItem = Form.Item


function EditProfileForm({users, handleUpdateUser}) {
    const formRef = useRef();
    const [size, setSize] = useState('default');
    const [layout, setLayout] = useState('vertical');
    const navigate = useNavigate();
    const [userDetails, SetUserDetails] = useUser();
    const curUser = users.filter((user) => user.id === userDetails.id)
    const [updateUser, setUpdateUser] = useState([]);
   

    
    
    const curPic = curUser.map((user) =>  user.profile_picture)
    const curUsername = curUser.map((user) => user.username)
    const curEmail = curUser.map((user) => user.email)

    useEffect(() => {
      formRef.current.setFieldsValue({
      });
    }, []);


      const onValuesChange = (changeValue, values) => {
        console.log(values)
        setUpdateUser(values)
        console.log(updateUser)
      };

    const onSubmit = (e) => {
        e.preventDefault();
        let update_user = {
            username: updateUser.username,
            email: updateUser.email,
            profile_picture: updateUser.profile_picture,
        }
        fetch(`/users/${userDetails.id}`, {
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(update_user)
        })
        .then((res) => {
            if (res.status === 202) {
                Message.success('User successfully updated')
                return res.json()
            } else if (res.status === 400) {
                console.log('Please edit profile before submitting')
            }
        })
        .then((data) => {
            console.log(curUser)
            handleUpdateUser(data)
            console.log(data)
        })
        .catch((error) => console.log(error))
    }



    return (
        <div style={{ marginBottom: 12, width:300, display: 'flex', flexDirection: 'column' }}>
        <Typography.Title 
            bold
            style = {{
                fontFamily: 'Acme', 
                fontSize: 60, 
                top: 0,
                position: 'relative',
                margin: 'auto',
                textAlign: 'right',
                left: 150,
                padding: 20,
                width: 300,
            }}
        >
            Edit Profile
        </Typography.Title>
        <div
        className='divider-demo'
        style={{ marginTop: 48 }}
      >
        <div>
            <Form
            style={{
                position: 'relative',
                maxWidth: 500,
                margin: 'auto',
                padding: 20,
            }}
            ref={formRef}
            layout = {layout}
            autoComplete='off'
            {...formItemLayout}
            size={size}
            onValuesChange={onValuesChange}
        
            scrollToFirstError
            >
            <FormItem label='Username' field='username'  style={{width: 500}}>
                <Input placeholder={curUsername} />
            </FormItem>
            <FormItem label='Email' field='email'  style={{width: 500}}>
                <Input placeholder={curEmail} />
            </FormItem>
            <FormItem label='Profile Picture' field='profile_picture'  style={{width: 500}}>
                <Input placeholder={curPic} />
            </FormItem>
            
            <FormItem {...noLabelLayout}>
                <Button
                type='primary'
                style={{
                    width: 200,
                    background: '#CBE0C3',
                    position: 'absolute',
                    marginLeft: -50,
                }}
                    onClick={onSubmit}
                >
                Update Account
                </Button>
                <Button
                type='primary'
                style={{
                    width: 200,
                    background: '#0F3E03',
                    position: 'absolute',
                    marginLeft: 200,
                }}
                    
                >
                Delete Account
                </Button>
            </FormItem>
            </Form>
        </div>
      </div>
      </div>
    )
}

export default EditProfileForm;