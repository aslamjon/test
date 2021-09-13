import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, GlobalOutlined } from '@ant-design/icons';

import { setCurrentUser } from '../../redux/auth/auth.action'
import { currentUser } from '../../redux/auth/auth.selector';
import {
    BackgroundStyledInSignin,
    CardStyledInSignIn
} from './SignInStyle';

const SignIn = ({ SetCurrentUser }) => {
    const [form, setForm] = useState({
        _username: '',
        _password: '',
        _subdomain: ''
    });
    const handleChange = (event) => {
        setForm(form => ({ ...form, [event.target.name]: event.target.value }));
    }
    const submitHanding = (event) => {
        const url = 'https://face.ox-sys.com/security/auth_check';
        const params = new URLSearchParams(form);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        axios.post(url, params, config)
            .then(res => res.data.token && SetCurrentUser({ ...form, token: res.data.token }));
        event.preventDefault();
    }
    const { _username, _password, _subdomain } = form;
    return (
        <BackgroundStyledInSignin>
            <CardStyledInSignIn>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Form.Item
                        name="_username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" name="_username" value={_username} onChange={handleChange}/>
                    </Form.Item>
                    <Form.Item
                        name="_password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            name="_password"
                            placeholder="Password"
                            value={_password} onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="_subdomain"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Subdomain!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<GlobalOutlined className="site-form-item-icon" />}
                            type="text"
                            placeholder="Subdomain"
                            name="_subdomain"
                            value={_subdomain} onChange={handleChange}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="button" onClick={submitHanding} className="login-form-button">
                            Log in
                        </Button>
                        Or <Link to="/signup">register now!</Link>
                    </Form.Item>
                </Form>
            </CardStyledInSignIn>
        </BackgroundStyledInSignin>
    )
}
const mapStateToProps = createStructuredSelector({
    currentUser
})

const mapDispathToProps = dispatch => ({
    SetCurrentUser: value => dispatch(setCurrentUser(value)),
})

export default connect(mapStateToProps, mapDispathToProps)(SignIn);
