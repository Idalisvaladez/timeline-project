import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserDetails';
import { Layout, Menu, Button, Typography} from '@arco-design/web-react';
import { IconHome, IconPlusCircle, IconUser} from '@arco-design/web-react/icon';
import EditProfileForm from '../components/EditProfileForm';
import UserInfo from '../components/UserInfo';

const MenuItem = Menu.Item;

const Sider = Layout.Sider;
const Content = Layout.Content;
const collapsedWidth = 60;
const normalWidth = 220;
const Header = Layout.Header;
const Footer = Layout.Footer;



function EditProfile({users, handleUpdateUser}) {
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


    

    return (
        <Layout className='byte-layout-collapse-demo' style={{
            height: '100%',
        }}>
            <Header></Header>
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
            <MenuItem key='1' onClick={ () => {
                    navigate('/home') 
                }}>
              <IconHome />
                Home
            </MenuItem>
            <MenuItem 
                key='2'
                onClick={ () => {
                    navigate('/profile')}}
                >
              <IconUser />
              Profile
            </MenuItem>
            <MenuItem 
                key='2' 
                disabled>
              <IconPlusCircle />
              Create
            </MenuItem>
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
        <Content >
            <div>
                <EditProfileForm users ={users} handleUpdateUser={handleUpdateUser}/> 
            </div>
        </Content>
        <Footer></Footer>
      </Layout>
    )
}

export default EditProfile;