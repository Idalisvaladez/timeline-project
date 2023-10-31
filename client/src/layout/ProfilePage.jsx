import React, { useContext } from 'react';
import { useState } from 'react';
import { Button, Layout, Menu, Typography } from '@arco-design/web-react';
import { IconHome, IconUser, IconPlusCircle } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import { userDetailsContext } from '../components/UserDetails';


const MenuItem = Menu.Item;

const Sider = Layout.Sider;
const Content = Layout.Content;
const collapsedWidth = 60;
const normalWidth = 220;



function ProfilePage() {
    const [collapsed, setCollapsed] = useState(false);
    const [siderWidth, setSiderWidth] = useState(normalWidth);
    const [userDetails, setUserDetails] = useContext(userDetailsContext)
    const navigate = useNavigate();

    const onCollapse = (collapsed) => {
        setCollapsed(collapsed);
        setSiderWidth(collapsed ? collapsedWidth : normalWidth);
    };

    const handleMoving = (_, { width }) => {
        if (width > collapsedWidth) {
        setSiderWidth(width);
        setCollapsed(!(width > collapsedWidth + 20));
        } else {
        setSiderWidth(collapsedWidth);
        setCollapsed(true);
        }
    };

    const handleLogout = () => {
        fetch('/logout', {
            method: 'DELETE',
        })
        .then((res) => {
            if (res.ok) {
                setUserDetails(null)
                navigate('/login')
            }
        })
    }


    return (
        <Layout className='byte-layout-collapse-demo' style={{
            height: '100%',
        }}>
        <Sider
          theme='light'
          onCollapse={onCollapse}
          width={siderWidth}
          resizeBoxProps={{
            directions: ['right'],
            onMoving: handleMoving,
          }}
        >
          <div className='logo'
           />
           <Typography.Title delete  bold style={{
                fontFamily: 'Acme',
                fontSize: 60, 
                top: 0,
                position: 'absolute',
                margin: 'auto',
                textAlign: 'center',
           }}>
            TIME
            </Typography.Title>
          <Menu theme='light' autoOpen style={{ width: '100%', height: '100%', border: '1px solid var(--color-border)',
            borderColor: 'red'}}>
            <MenuItem key='1' disabled>
              <IconHome />
                Home
            </MenuItem>
            <MenuItem 
                key='2' 
                onClick={ () => {
                    navigate('/profile') 
                }}>
              <IconUser />
              Profile
            </MenuItem>
            <MenuItem 
                key='3'
                onClick={ () => {
                    navigate('/create') 
            }}>
              <IconPlusCircle/>
              Create
            </MenuItem>
            <Button
            type='primary'
            style ={{
                background: '#7BE188',
                position: 'absolute',
                bottom: 0,
                width: '100%',
                right: 0,
                left: 0,
                padding: 20,
                fontFamily: 'Acme',
                fontSize: 20,
                textAlign: 'center',
                
            }}
            onClick={handleLogout}
            >
            Logout
            </Button>
          </Menu>
        </Sider>
        <Content style={{ background: 'rgb(240,255,255)', textAlign: 'center', padding: '30px', overflow: 'scroll'}}>
            <div style={{ width: '100%', height: '100%', overflow: 'scroll',}}>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>

            </div>
        </Content>
      </Layout>
    )
}

export default ProfilePage;