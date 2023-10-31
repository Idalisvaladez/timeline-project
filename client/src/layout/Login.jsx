import React, {useState, useRef, useEffect, useContext}from 'react';
import { Timeline, Grid, Form, Input, Typography, Link, Button, Message } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import { userDetailsContext } from '../components/UserDetails';

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
    const formRef = useRef();
    const [size, setSize] = useState('default');
    const [layout, setLayout] = useState('vertical');
    const [userDetails, setUserDetails] = useContext(userDetailsContext);
    const [userFound, setUserFound] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
      formRef.current.setFieldsValue({
        rate: 5,
      });
    }, []);

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
                console.log(user)
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
                    ref={formRef}
                    layout = {layout}
                    autoComplete='off'
                    {...formItemLayout}
                    size={size}
                    onValuesChange={onValuesChange}
                    scrollToFirstError
                    >
                    <FormItem label='Email' field='email' rules={[{ required: true }]}>
                        <Input placeholder='Email' />
                    </FormItem>
                    <FormItem label='Password' field='password' rules={[{ required: true , minLength: 12}]}>
                        <Input 
                            placeholder='Password' 
                            type='password'
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
                        border: '1px solid var(--color-border)',
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
      <Timeline 
        direction='horizontal' 
        mode={mode} 
        labelPosition='relative'
        style={{
            position: 'relative',
            border: '1px solid var(--color-border)',
            borderColor: 'black',
            bottom: 10,
            width: '100%',
            padding: 20,
            margin: 'auto',
            top: 300,
            contain: 'content',
            zIndex: -1,
        }}
      >
        <TimelineItem lineColor='grey' dotColor='green'>
          <Row align='center'>
            <img
              width='40'
              style={imageStyle}
              src='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b5d834b83708a269b4562924436eac48.png~tplv-uwbnlip3yd-png.png'
            />
            <div style={{ marginBottom: 12, }} >
              Toutiao
              <div style={{ fontSize: 12, color: '#4E5969', }} >
                Founded in 2012
              </div>
            </div>
          </Row>
        </TimelineItem>
        <TimelineItem>
          <Row align='center'>
            <img
              width='40'
              style={imageStyle}
              src='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/385ed540c359ec8a9b9ce2b5fe89b098.png~tplv-uwbnlip3yd-png.png'
            />
            <div style={{ marginBottom: 12, }} >
              Xigua Video
              <div style={{ fontSize: 12, color: '#4E5969', }} >
                Founded in 2017
              </div>
            </div>
          </Row>
        </TimelineItem>
        <TimelineItem>
          <Row align='center'>
            <img
              width='40'
              style={imageStyle}
              src='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/385ed540c359ec8a9b9ce2b5fe89b098.png~tplv-uwbnlip3yd-png.png'
            />
            <div style={{ marginBottom: 12, }} >
              Xigua Video
              <div style={{ fontSize: 12, color: '#4E5969', }} >
                Founded in 2017
              </div>
            </div>
          </Row>
        </TimelineItem>
        <TimelineItem>
            <Row align='center'>
                <div>
                    Founded
                </div>
            </Row>
        </TimelineItem>
        <TimelineItem>
            <Row align='center'>
                <div>
                    Founded
                </div>
            </Row>
        </TimelineItem>
        <TimelineItem>
            <Row align='center'>
                <div>
                    Founded
                </div>
            </Row>
        </TimelineItem>
        <TimelineItem>
          <Row align='center'>
            <div style={{ marginBottom: 12, }} >
              Pipidance
              <div style={{ fontSize: 12, color: '#4E5969', }} >
                Founded in 2018
              </div>
            </div>
          </Row>
        </TimelineItem>
      </Timeline>
    </div>
    )
}

export default Login;