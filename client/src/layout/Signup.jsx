import React from 'react';
import { useRef, useEffect, useState } from 'react';
import '@arco-design/web-react/dist/css/arco.css';
// import { useNavigate } from 'react-router-dom';

import {
  Form,
  Input,
  Button,
  Message,
  Typography,
  Link,
} from '@arco-design/web-react';
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

// const navigate = useNavigate();


function Signup() {
    const formRef = useRef();
    const [size, setSize] = useState('default');
    const [layout, setLayout] = useState('vertical');
    useEffect(() => {
      formRef.current.setFieldsValue({
        rate: 5,
      });
    }, []);

    const onValuesChange = (changeValue, values) => {
        console.log('onValuesChange: ', changeValue, values);
      };

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
        top: 10,
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
      <FormItem label='Full Name' field='name' rules={[{ required: true }]}>
        <Input placeholder='Full name' />
      </FormItem>
      <FormItem label='Email' field='email' rules={[{ required: true }]}>
        <Input placeholder='Email' />
      </FormItem>
      <FormItem label='Username' field='username' rules={[{ required: true }]}>
        <Input placeholder='Username' />
      </FormItem>
      <FormItem label='Password' field='password' rules={[{ required: true , minLength: 12}]}>
        <Input 
            placeholder='Password' 
            type='password'
        />
      </FormItem>
      <FormItem {...noLabelLayout}>
        <Button
          onClick={async () => {
            if (formRef.current) {
              try {
                await formRef.current.validate();
                Message.info('Signup successful!');
                // navigate('/home')

              } catch (_) {
                console.log(formRef.current.getFieldsError());
                Message.error('校验失败，请检查字段！');
              }
            }
          }}
          type='primary'
          style={{
            width: 400,
            background: '#7BE188',
            position: 'absolute',
            marginLeft: -80,
        }}
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
    >Already have an account?  </Typography.Text>
    <Link 
        href = '/login' 
        hoverable = {false} 
        style={{
            fontSize: 20,
            fontFamily: 'Acme',
        }}
    >
    Login
    </Link>
  </div>
  </>
    )
}

export default Signup;