import React from 'react';
import { useRef, useEffect, useState, useContext } from 'react';
import '@arco-design/web-react/dist/css/arco.css';
import { useNavigate } from 'react-router-dom';



import {
  Form,
  Input,
  Button,
  Message,
  Typography,
  Link,
} from '@arco-design/web-react';
import { useUser} from '../components/UserDetails';
const FormItem = Form.Item;

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


function Signup() {
    const formRef = useRef();
    const [size, setSize] = useState('default');
    const [layout, setLayout] = useState('vertical');
    const navigate = useNavigate();
    const [userDetails, SetUserDetails] = useUser();
    const [userExists, setUserExists] = useState(false)

    useEffect(() => {
      formRef.current.setFieldsValue({
      });
    }, []);

    const onValuesChange = (changeValue, values) => {
        const user = (changeValue, values)
        SetUserDetails(user);
        console.log("this is the user info: ", userDetails)
      };

    

    const onSubmit = (e) => {
        e.preventDefault();
        let user = {
            name: userDetails.fullname,
            email: userDetails.email,
            username: userDetails.username,
            _password_hash: userDetails.password,
        }
        fetch("/signup", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        })
        .then(res => {
            if (res.status === 201) {
                Message.info('Signup successful!')
                navigate('/home')
                return res.json()
            } else if (res.status === 500) {
                setUserExists(true)
                Message.error('User already exists. Please login')
                console.error('User already exists')
            } else if (res.status === 400) {
                setUserExists(false)
                console.error('All fields required to signup')
            }
        })
        .then(data => {
            SetUserDetails(data)
        })
        .catch((error) => console.error('Error: ', error));
    }

   return (
    <>
    <div style={{ 
        maxWidth: 500,
        height: 500, 
        padding: 40,
        border: '1px solid var(--color-border)',
        borderColor: 'black',
        alignItems: 'center',
        left: 0,
        right: 0,
        top: 60,
        margin: 'auto',
        position: 'absolute',
        }}>
    <Typography.Title 
        bold
        style = {{
            fontFamily: 'Dancing Script', 
            fontSize: 60, 
            top: 0,
            position: 'relative',
            margin: 'auto',
            textAlign: 'center',
        }}
    >
        Timeline
    </Typography.Title>
    <Form
      style={{
        position: 'absolute',
        maxWidth: 500,
        left: 0,
        right: 0,
        margin: 'auto',
      }}
      ref={formRef}
      layout = {layout}
      autoComplete='off'
      {...formItemLayout}
      size={size}
      onValuesChange={onValuesChange}

      scrollToFirstError
    >
      <FormItem label='Full Name' field='fullname' rules={[{ required: true }]}>
        <Input placeholder='Full name' />
      </FormItem>
      <FormItem label='Email' field='email' rules={[{ required: true }]}>
        <Input placeholder='Email' />
      </FormItem>
      <FormItem label='Username' field='username' rules={[{ required: true }]}>
        <Input placeholder='Username' />
      </FormItem>
      <FormItem label='Password' field='password' rules={[{ required: true , minLength: 12}]}>
        <Input.Password 
            placeholder='Password' 
            defaultVisibility = {false}
        />
      </FormItem>
      <FormItem {...noLabelLayout}>
        <Button
          type='primary'
          style={{
            width: 400,
            background: '#CBE0C3',
            position: 'absolute',
            marginLeft: -80,
        }}
            onClick={onSubmit}
        >
          Signup
        </Button>
      </FormItem>
    </Form>
  </div>
  <div
  style={{ 
    maxWidth: 500,
    height: 10, 
    borderTop: '1px solid var(--color-border)',
    borderColor: 'black',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: 60,
    margin: 'auto',
    position: 'absolute',
    textAlign: 'center',
    }}
  >
    <Typography.Text 
        style={{
            fontFamily: 'Acme',
            fontSize: 20,
        }}
    >Already have an account?  </Typography.Text>
    <Link 
        href = '/login' 
        hoverable = {false} 
        style={{
            fontSize: 20,
            fontFamily: 'Acme',
            color: 'lime-10',
        }}
    >
    Login
    </Link>
  </div>
  </>
    )
}

export default Signup;