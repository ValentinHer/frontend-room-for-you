'use client'

import { Button, Card, Form, Input, message } from "antd";
import { loginUser } from "hooks/user-hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { LoginUser } from "types/user-types";

const LoginForm: React.FC = () => {
    const [form] = Form.useForm();
    const [status, setStatus] = useState({ success: null, message: '' });
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();

    const onFinish = async (values: LoginUser) => {
        setStatus({ success: null, message: '' });
        const result = await loginUser(values);
        setStatus({ message: result.message, success: result.success });

        if (!status.success) return await error();

        const { data } = result;

        return await success(data.rol);
    }

    const success = async (rol: string) => {
        await messageApi.open({
            type: 'loading',
            content: status.message,
            style: {
                marginTop: '5vh'
            }
        })

        if (rol === "admin") return router.push('/admin');
        if (rol === "propietario") return router.push('/owner');
        if (rol === "cliente") return router.push('/client');
    }

    const error = async () => {
        await messageApi.open({
            type: 'error',
            content: status.message,
            style: {
                marginTop: '5vh'
            }
        })
    }

    return (
        <>
            {contextHolder}
            <Card style={{ width: 400 }}>
                <Form
                    form={form}
                    layout="vertical"
                    name="login"
                    onFinish={onFinish}
                    style={{ maxWidth: 400 }}
                >
                    <Form.Item
                        layout="vertical"
                        label="Correo electrónico:"
                        name="email"
                        rules={[
                            { required: true, message: "Introduzca su correo electrónico" },
                            { type: 'email', message: "Introduzca en email válido" }
                        ]}
                        labelCol={{ span: 24 }}
                    >
                        <Input placeholder="example@exmaple.example" />
                    </Form.Item>
                    <Form.Item
                        layout="vertical"
                        label="Contraseña:"
                        name="password"
                        rules={[{ required: true, message: "Introduzca su contraseña" }]}
                        labelCol={{ span: 24 }}
                    >
                        <Input.Password />
                    </Form.Item>
                    <br />
                    <Form.Item>
                        <Button style={{ width: '100%' }} type="primary" htmlType="submit" >
                            Iniciar Sesión
                        </Button>
                    </Form.Item>
                    <p style={{ margin: 0, textAlign: 'center' }}>No tienes una cuenta? <Link href='/signup'>Registrarse</Link></p>
                </Form>
            </Card>
        </>
    )
}

export default LoginForm;