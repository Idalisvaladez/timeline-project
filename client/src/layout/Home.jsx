import React, { useContext } from 'react';
import { useState } from 'react';
import { Button, Layout, Menu, Typography, Modal } from '@arco-design/web-react';
import { IconHome, IconUser } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserDetails';
import Events from '../components/Events';
import Create from './Create';



const MenuItem = Menu.Item;

const Sider = Layout.Sider;
const Content = Layout.Content;
const collapsedWidth = 60;
const normalWidth = 220;



function Home({events, comments, users, handleAddEvent, handleAddComment, likes, handleAddLike, handleDeleteLike}) {
    const [collapsed, setCollapsed] = useState(false);
    const [siderWidth, setSiderWidth] = useState(normalWidth);
    const [userDetails, setUserDetails] = useUser();
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
        setUserDetails(null)
        localStorage.removeItem('userDetails')
        navigate('/login')
    }
  



    const displayEvents = events.map((event) => <Events key = {event.id} events = {event} comments = {comments} users = {users} handleAddComment={handleAddComment} likes ={likes} handleAddLike={handleAddLike} handleDeleteLike={handleDeleteLike}/>)
    
    
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
          <div className='logo'/>
          <Menu autoOpen style = {{height: 70,}}>
          <Typography.Title delete  bold style={{
                fontFamily: 'Acme',
                fontSize: 60, 
                top: 0,
                right: 50,
                position: 'absolute',
                margin: 'auto',
                textAlign: 'center',
           }}>
            TIME
            </Typography.Title>
          </Menu>
          
          <Menu theme='light' autoOpen style={{ width: '100%', height: '100%',}}>
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
            <Create handleAddEvent={handleAddEvent}/>
            <Button
            type='primary'
            style ={{
                background: '#CBE0C3',
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
                {displayEvents}
            </div>
        </Content>
      </Layout>
    )
}

export default Home;