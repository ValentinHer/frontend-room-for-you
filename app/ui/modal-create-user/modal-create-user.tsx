import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, message, Modal } from "antd";
import { createUser } from "hooks/user-hook";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TSignUpUser } from "types/user";
import CreateUserForm from "ui/create-user-form";


export default function ModalCreateUser() {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: TSignUpUser) => {
        const { confirmPassword, ...newUser } = values;
        const result = await createUser(newUser);
        if (!result.success) return await error(result.message);

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

        window.location.reload()
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
            <Button type="primary" onClick={() => setOpen(true)} icon={<PlusOutlined />} >
                Nueva Usuario
            </Button>
            <Modal
                open={open}
                title="Crear una Nueva Usuario"
                okText="Guardar"
                width={600}
                cancelText="Cancelar"
                okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
                onCancel={() => {
                    setOpen(false)
                }}
                destroyOnClose
                modalRender={(dom) => (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        name="create-property"
                        style={{ maxWidth: 1000 }}
                        preserve={false}
                    >
                        {dom}
                    </Form>
                )}
            >
                {contextHolder}
                <CreateUserForm />
            </Modal>
        </>
    );
}