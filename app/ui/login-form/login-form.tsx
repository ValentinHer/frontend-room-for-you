'use client'

import { Button, Card, Form, Input, message } from "antd";
import { loginUser } from "hooks/user-hook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { TLoginUser } from "types/user";

const LoginForm: React.FC = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();

    const onFinish = async (values: TLoginUser) => {
        const result = await loginUser(values);

        if (!result.success) return await error(result.message);

        const {rol, userId} = result.data;
        sessionStorage.setItem("user", userId);

        return await success(rol, result.message);
    }

    const success = async (rol: string, message: string) => {
        await messageApi.open({
            type: 'loading',
            content: message,
            style: {
                marginTop: '5vh'
            }
        })

        if (rol === "admin")return router.push('/admin/dashboard');
        if (rol === "propietario")return router.push('/owner/properties');
        if (rol === "cliente")return router.push('/client/properties');
    }

    const error = async (message: string) => {
        await messageApi.open({
            type: 'error',
            content: message,
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