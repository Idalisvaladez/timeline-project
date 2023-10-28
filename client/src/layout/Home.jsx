import React from 'react';
import { Layout } from '@arco-design/web-react';
import '../layout/Home.css';
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;



function Home() {


        return (
            <div className="layout-basic-demo">
              <Layout>
                <Header>Header</Header>
                <Layout>
                  <Sider
                    resizeDirections={['right']}
                    style={{
                      minWidth: 150,
                      maxWidth: 500,
                      height: 200,
                    }}
                  >
                    Sider
                  </Sider>
                  <Content>Content</Content>
                </Layout>
                <Footer>Footer</Footer>
              </Layout>
            </div>
    )
}

export default Home;