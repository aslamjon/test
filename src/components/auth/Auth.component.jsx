import React, { useState } from 'react'
import { currentUser } from '../../redux/auth/auth.selector';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setCurrentUser } from '../../redux/auth/auth.action'
import {
    BackgroundStyledInAuth,
    CardStyledInAuth,
    ButtonStyledInAuth,
    InputStyledInAuth
} from './auth.style'
import { Link } from 'react-router-dom';

const Auth = ({ setCurrentTab }) => {
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
        axios.post(url, params, config).then(res => res.data.token && setCurrentTab({ ...form, token: res.data.token }));
        event.preventDefault();
    }
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
    const { _username, _password, _subdomain } = form;
    return (
        <BackgroundStyledInAuth>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
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
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <Link href="">register now!</Link>
                </Form.Item>
            </Form>
            <CardStyledInAuth onSubmit={submitHanding}>
                <InputStyledInAuth className="form-control" type="text" placeholder="Username" name="_username" value={_username} onChange={handleChange} />
                <InputStyledInAuth className="form-control" type="password" placeholder="Password" name="_password" value={_password} onChange={handleChange} />
                <InputStyledInAuth className="form-control" type="text" placeholder="Subdomain" name="_subdomain" value={_subdomain} onChange={handleChange} />
                <ButtonStyledInAuth className="btn btn-outline-dark" type="submit">Submit</ButtonStyledInAuth>
            </CardStyledInAuth>
        </BackgroundStyledInAuth>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser
})

const mapDispathToProps = dispatch => ({
    setCurrentTab: value => dispatch(setCurrentUser(value)),
})

export default connect(mapStateToProps, mapDispathToProps)(Auth);