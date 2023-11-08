import React, {useState, useRef, useEffect, useContext}from 'react';
import { Timeline, Grid, Form, Input, Typography, Link, Button, Message } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import { userDetailsContext } from '../components/UserDetails';
import { useUser } from '../components/UserDetails';

const TimelineItem = Timeline.Item;
const { Row } = Grid;

const imageStyle = {
  
}
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


function Login() {
    const [mode, setMode] = useState('alternate');
    const [size, setSize] = useState('default');
    const [layout, setLayout] = useState('vertical');
    const [userDetails, setUserDetails] = useUser();
    const [userFound, setUserFound] = useState(true)
    const navigate = useNavigate();



    const onValuesChange = (changeValue, values) => {
        const user = (changeValue, values);
        setUserDetails(user)
      };

    const onSubmit = (e) => {
        e.preventDefault();
        let user = {
            email: userDetails.email,
            _password_hash: userDetails.password,
        }
        fetch('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then((res) => {
            if (res.status === 201) {
                Message.info('Login successful')
                navigate('/home')
                return res.json()
            } else if (res.status === 404) {
                setUserFound(false)
                Message.error('User not found. Please signup')
            } else if (res.status === 403) {
                Message.error('Incorrect password. Try again')
            }
        })
        .then((data => 
            setUserDetails(data))
        )
    }


    return(
        <div>
            <div style={{ 
                    maxWidth: 500,
                    height: 500, 
                    padding: 40,
                    border: '1px solid var(--color-border)',
                    borderColor: 'black',
                    alignItems: 'center',
                    left: 0,
                    right: 0,
                    top: 10,
                    bottom: 10,
                    margin: 'auto',
                    position: 'absolute',
                    backgroundColor: 'white',
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
                    layout = {layout}
                    autoComplete='off'
                    {...formItemLayout}
                    size={size}
                    initialValues={{email: '', password: ''}}
                    onValuesChange={onValuesChange}
                    scrollToFirstError
                    >
                    <FormItem label='Email' field='email' rules={[{ required: true }]}>
                        <Input placeholder='Email' />
                    </FormItem>
                    <FormItem label='Password' field='password' rules={[{ required: true , minLength: 12}]}>
                        <Input.Password
                            placeholder='Password' 
                            defaultVisibility = {false}
                            
                        />
                    </FormItem>
                </Form>
                <Button
                    onClick={onSubmit}
                    type='primary'
                    style={{
                        width: 400,
                        background: '#CBE0C3',
                        position: 'relative',
                        margin: 'auto',
                        marginLeft: 50,
                        marginTop: 200,
                    }}
                    >
                Login
                </Button>
                <div
                    style={{ 
                        maxWidth: 500,
                        height: 10, 
                        padding: 40,
                        borderTop: '1px solid var(--color-border)',
                        borderColor: 'black',
                        alignItems: 'center',
                        left: 0,
                        right: 0,
                        bottom: 10,
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
                >Don't have an account?  </Typography.Text>
                <Link 
                    href = '/signup' 
                    hoverable = {true} 
                    style={{
                        fontSize: 20,
                        fontFamily: 'Acme',
                        color: 'lime-10',
                        position: 'absolute',
                    }}
                >
                Signup
                </Link>
                </div>
            </div>
    </div>
    )
}

export default Login;