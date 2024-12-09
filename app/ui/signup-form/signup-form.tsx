'use client'

import { Button, Card, Flex, Form, Input, message, Select } from "antd";
import { createUser } from "hooks/user-hook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { TSignUpUser } from "types/user";

const { Option } = Select;

const SignUpForm: React.FC = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();

    const onFinish = async (values: TSignUpUser) => {
        const { confirmPassword, ...newUser } = values;
        const result = await createUser(newUser);
        if(!result.success) return await error(result.message);
        
        return await success(result.message);
    }

    const success = async (message: string) => {
        await messageApi.open({
            type: 'success',
            content: message,
            style: {
                marginTop: '5vh'
            }
        })

        router.push('/login');
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
            <Card style={{ width: 500 }}>
                <Form
                    form={form}
                    layout="vertical"
                    name="register"
                    onFinish={onFinish}
                    style={{ maxWidth: 500 }}
                >
                    <Flex justify="space-between">
                        <Form.Item
                            layout="vertical"
                            style={{ display: 'inline-block', width: '49%' }}
                            label="Nombre(s):"
                            name="firstname"
                            rules={[
                                { required: true, message: "Introduzca su nombre" }
                            ]}
                            labelCol={{ span: 24 }}
                        >
                            <Input placeholder="nombre(s)" />
                        </Form.Item>
                        <Form.Item
                            layout="vertical"
                            style={{ display: 'inline-block', width: '49%' }}
                            label="Apellidos:"
                            name="lastname"
                            rules={[{ required: true, message: "Introduzca sus apellidos" }]}
                            labelCol={{ span: 24 }}
                        >
                            <Input placeholder="apellidos" />
                        </Form.Item>
                    </Flex>
                    <Flex justify="space-between">
                        <Form.Item
                            layout="vertical"
                            style={{ display: 'inline-block', width: '49%' }}
                            label="Num. Teléfono:"
                            name="numberPhone"
                            rules={[
                                { required: true, message: "Introduzca su num. teléfono" },
                                { max: 10, message: "El mínimo son 10 caracteres" }
                            ]}
                            labelCol={{ span: 24 }}
                        >
                            <Input placeholder="7721324323" />
                        </Form.Item>
                        <Form.Item
                            layout="vertical"
                            style={{ display: 'inline-block', width: '49%' }}
                            label="Género:"
                            name="gender"
                            rules={[{ required: true, message: "Seleccione su género" }]}
                            labelCol={{ span: 24 }}
                        >
                            <Select placeholder="Seleccione su género">
                                <Option value="masculino" >Masculino</Option>
                                <Option value="femenino" >Femenino</Option>
                            </Select>
                        </Form.Item>
                    </Flex>
                    <Flex justify="space-between">
                        <Form.Item
                            layout="vertical"
                            style={{ display: 'inline-block', width: '49%' }}
                            label="Rol:"
                            name="role"
                            rules={[
                                { required: true, message: "Seleccione su rol" }
                            ]}
                            labelCol={{ span: 24 }}
                        >
                            <Select placeholder="Seleccione su rol">
                                <Option value="propietario">Propietario</Option>
                                <Option value="cliente">Cliente</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            layout="vertical"
                            style={{ display: 'inline-block', width: '49%' }}
                            label="Correo electrónico:"
                            name="email"
                            rules={[
                                { required: true, message: "Introduzca su correo electrónico" },
                                { type: 'email', message: 'Introduzca un email válido' }
                            ]}
                            labelCol={{ span: 24 }}
                        >
                            <Input placeholder="example@exmaple.example" />
                        </Form.Item>
                    </Flex>
                    <Flex justify="space-between">
                        <Form.Item
                            layout="vertical"
                            style={{ display: 'inline-block', width: '49%' }}
                            label="Contraseña:"
                            name="password"
                            rules={[{ required: true, message: "Introduzca su contraseña" }]}
                            labelCol={{ span: 24 }}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            layout="vertical"
                            style={{ display: 'inline-block', width: '49%' }}
                            label="Confirmar contraseña:"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: "Confirme su contraseña" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Las contraseñas no coinciden'));
                                    }
                                })
                            ]}
                            labelCol={{ span: 24 }}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                    </Flex>
                    <br />
                    <Flex vertical justify="center" align="center" >
                        <Form.Item>
                            <Button type="primary" htmlType="submit" >
                                Registrar
                            </Button>
                        </Form.Item>
                    </Flex>
                    <p style={{ margin: 0, textAlign: 'center' }}>Ya tienes una cuenta? <Link href='/login'>Iniciar Sesión</Link></p>
                </Form>
            </Card>
        </>
    )
}
export default SignUpForm;