import React from 'react';
import { Layout } from 'antd';
import './homeStyles.css';
import BrandLogo from './../../assets/logoitunes.png';

const { Header, Content, Footer } = Layout;

const Home = () => {
    return (
        <>
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: "6%", backgroundColor: "#1d1d1f" }}>
                    <div style={{ marginTop: '-10px', marginLeft: '-25px' }}>
                        <img src={BrandLogo} width="30px" height="30px" />
                        <span style={{ color: "#ffffff", fontSize: "18px", marginLeft: "10px" }}>iTunes</span>
                    </div>

                    {/* <div><img src={BrandLogo} alt="boohoo" className="img-responsive"/>Hello</span></div>; */}
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380, marginTop: '70px' }}>
                        Content
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>iTunes By Ant Design ©2020</Footer>
            </Layout>
        </>
    )
}

export default Home;