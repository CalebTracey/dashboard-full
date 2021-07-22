import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import { Form, Input, Button, Card, Upload, message } from 'antd';
import axios from 'axios';
import allActions from '../../redux/actions/index';
import NewEmployeeAvatar from './NewEmployeeAvatar';
import api from '../../api';

const AddEmployee = () => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [jobTitle, setJobTitle] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [address, setAddress] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [imageUrl, setImageUrl] = useState(false);

    
    const dispatch = useDispatch();

    const data = JSON.stringify({
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'jobTitle': jobTitle,
        'phoneNumber': phoneNumber,
        'address': address,
        'avatar': avatar
    });

    // const handleAvatarUpload = ({ file }) => setFile(file);

    

    const onFinish = async () => {
        await api.post('api/v1/employees/upload', data 
        ).then(res => {
            dispatch(allActions.employees.employeeAdded(res.data));
        }).catch(function (error) {
            console.log(error);
        });
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }} >
            <Card style={{ width: 500, alignSelf: 'center' }}>
                <Form
                    layout="vertical"
                    requiredMark={true}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                >
                        {/* <NewEmployeeAvatar 
                        /> */}

                    <Form.Item label="First name" required tooltip="This is a required field">
                        <Input
                            placeholder="First name"
                            onChange={(event) => setFirstName(event.target.value)} />
                    </Form.Item>
                    <Form.Item label="Last name" required tooltip="This is a required field">
                        <Input
                            placeholder="Last name"
                            onChange={(event) => setLastName(event.target.value)} />
                    </Form.Item>
                    <Form.Item label="Email" required tooltip="This is a required field">
                        <Input
                            placeholder="Email"
                            onChange={(event) => setEmail(event.target.value)} />
                    </Form.Item>
                    <Form.Item label="Job title" required tooltip="This is a required field">
                        <Input
                            placeholder="Job title"
                            onChange={(event) => setJobTitle(event.target.value)} />
                    </Form.Item>
                    <Form.Item label="Phone number" required tooltip="This is a required field">
                        <Input
                            placeholder="Phone number"
                            onChange={(event) => setPhoneNumber(event.target.value)} />
                    </Form.Item>
                    <Form.Item label="Address" required tooltip="This is a required field">
                        <Input
                            placeholder="Address"
                            onChange={(event) => setAddress(event.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"
                            onClick={onFinish}>
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
            </Card>

        </div>
    );
};

export default AddEmployee;