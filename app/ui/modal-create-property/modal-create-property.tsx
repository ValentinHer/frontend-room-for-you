import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, GetProp, message, Modal, UploadFile, UploadProps } from "antd";
import { uploadFile } from "hooks/file-hooks";
import { createProperty } from "hooks/property-hook";
import { useState } from "react";
import CreatePropertyForm from "ui/create-property-form";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function ModalCreateProperty() {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onFinish = async (values) => {
        const ownerId = sessionStorage.getItem('user');
        const data = { ...values, ownerId }

        const result = await createProperty(data);

        if (!result.success) return await error(result.message);

        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files', file as FileType);
        })

        formData.append('CreateFileDto', JSON.stringify({ propertyId: result.data.id }));

        const resultUploadFile = await uploadFile(formData);

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

        window.location.reload();
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

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file])

            return false;
        },
        fileList
    }

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)} icon={<PlusOutlined />} >
                Nueva Propiedad
            </Button>
            <Modal
                open={open}
                title="Crear una Nueva Propiedad"
                okText="Guardar"
                width={1000}
                cancelText="Cancelar"
                okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
                onCancel={() => {
                    setOpen(false)
                    setFileList([])
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
                <CreatePropertyForm props={props} />
            </Modal>
        </>
    );
}