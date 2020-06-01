import React, { useState, useEffect } from 'react';
import { Layout, Input, Row, Col, Card, Button } from 'antd';
import './homeStyles.css';
import BrandLogo from './../../assets/logoitunes.png';
import { AudioOutlined } from '@ant-design/icons';
import { create } from 'apisauce';

const style = { background: '#434343', padding: '8px 0' };

const { Search } = Input;

const { Header, Content, Footer } = Layout;

const { Meta } = Card;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#8C8C8C',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    />
);

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    const api = create({
        baseURL: `https://itunes.apple.com`,
        headers: { 'Content-Type': 'application/json' },
    })

    const handleChange = event => {
        event.preventDefault();
        event.persist();

        api.get('/')
            .then(response => setSearchTerm(event.target.value))
            .catch(error => console.log(error))
        console.log(event.target.value)
    };

    const searchSpace = (event) => {
        let keyword = event.target.value;
        api.get(`/search?term=${keyword}`)
            .then(response => {
                setSearchTerm(response.data)
                setLoading(true)
                console.log(keyword)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        api.get('/search?term=enrique')
            .then(response => {
                setSearchTerm(response.data)
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }, []);

    const handlePost = () => {
        api.post('/users', { name: 'steve' }, { headers: { 'x-gigawatts': '1.21' } })
    }

    return (
        <>
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: "6%", backgroundColor: "#1d1d1f" }}>
                    <div style={{ marginTop: '-10px', marginLeft: '-25px' }}>
                        <img src={BrandLogo} width="30px" height="30px" alt="Brand" />
                        <span style={{ color: "#ffffff", fontSize: "18px", marginLeft: "10px" }}>iTunes
                        <Search
                                style={{ width: '30%', float: 'right', marginTop: '17px', color: '#000000' }}
                                placeholder="Search Song"
                                // onSearch={value => searchTerm}
                                // value={searchTerm}
                                suffix={suffix}
                                allowClear
                                onChange={(event) => searchSpace(event)}
                            />
                        </span>
                    </div>
                </Header>

                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 30 }}>
                    <div className="site-layout-background"
                        style={{ overflow: "scroll", padding: 24, height: 615, marginTop: '35px', marginLeft: '70px', marginRight: '70px', backgroundColor: '#ffffff' }}>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-around">
                            {searchTerm && searchTerm.results ? searchTerm.results.map((song) => {
                                return (
                                    console.log('datatata', song),
                                    <Col xs={24} lg={5} span={5}>
                                        <Card
                                            hoverable
                                            style={{ width: 240, marginBottom: 20 }}
                                            cover={<img alt="example" height='230px' src={song.artworkUrl100} />}
                                        >
                                            <Meta style={{ marginTop: -10, marginBottom: -10 }} title={song.trackName} description={song.artistName} />
                                        </Card>
                                    </Col>
                                )
                            }) :
                                <Button
                                    type="default"
                                    loading
                                    danger
                                    style={{
                                        justify: 'center',
                                        marginTop: '20%'
                                    }}
                                />
                            }
                        </Row>
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>iTunes By Ant Design ©2020</Footer>
            </Layout>
        </>
    )
}

export default Home;