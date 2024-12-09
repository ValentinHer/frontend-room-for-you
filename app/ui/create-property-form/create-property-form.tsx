import { UploadOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Flex, Form, Input, InputNumber, message, Select, Upload } from "antd";

const { Option } = Select;

export default function CreatePropertyForm({ props }) {

    return (
        <>
            <Flex justify="space-between">
                <Form.Item
                    layout="vertical"
                    style={{ display: 'inline-block', width: '49%' }}
                    label="Título:"
                    name="title"
                    rules={[
                        { required: true, message: "Introduzca un título para la propiedad" }
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Input placeholder="título" />
                </Form.Item>
                <Form.Item
                    layout="vertical"
                    style={{ display: 'inline-block', width: '49%' }}
                    label="Tipo de propiedad"
                    name="type"
                    rules={[
                        { required: true, message: "Seleccione el tipo de propiedad" }
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Select placeholder="Seleccione el tipo">
                        <Option value="departamento" >Departamento</Option>
                        <Option value="casa" >Casa</Option>
                        <Option value="cuarto" >Cuarto</Option>
                    </Select>
                </Form.Item>
            </Flex>
            <Flex justify="space-between">
                <Form.Item
                    layout="vertical"
                    style={{ display: 'inline-block', width: '49%' }}
                    label="Dirección"
                    name="address"
                    rules={[
                        { required: true, message: "Introduzca la dirección de la propiedad" }
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Input placeholder="Dirección" />
                </Form.Item>
                <Form.Item
                    layout="vertical"
                    style={{ display: 'inline-block', width: '49%' }}
                    label="Tipo de transacción"
                    name="transactionType"
                    rules={[
                        { required: true, message: "Seleccione el tipo de transacción" }
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Select placeholder="Seleccione el tipo">
                        <Option value="renta" >Renta</Option>
                        <Option value="venta" >Venta</Option>
                    </Select>
                </Form.Item>
            </Flex>
            <Flex justify="space-between">
                <Form.Item
                    layout="vertical"
                    style={{ display: 'inline-block', width: '49%' }}
                    label="Precio"
                    name="price"
                    rules={[
                        { required: true, message: "Introduzca un precio" }
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <InputNumber placeholder="Precio" width='49vw' min={1} />
                </Form.Item>
                <Form.Item
                    layout="vertical"
                    style={{ display: 'inline-block', width: '49%' }}
                    label="Descripción"
                    name="description"
                    rules={[
                        { required: true, message: "Introduzca una descripción de la propiedad" }
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Input placeholder="Descripción" />
                </Form.Item>
            </Flex>
            <Flex justify="space-between">
                <Form.Item
                    layout="vertical"
                    style={{ display: 'inline-block', width: '49%' }}
                    label="Características"
                    name="features"
                    rules={[
                        { required: true, message: "Introduzca las características de la propiedad" }
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Input placeholder="Caracteristicas" />
                </Form.Item>
                <Form.Item
                    layout="vertical"
                    style={{ display: 'inline-block', width: '49%' }}
                    label="Estado"
                    name="state"
                    rules={[
                        { required: true, message: "Seleccione el estado de la propiedad" }
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Select placeholder="Seleccione el estado" >
                        <Option value="disponible" >Disponible</Option>
                        <Option value="rentado" >Rentado</Option>
                        <Option value="vendido" >Vendido</Option>
                    </Select>
                </Form.Item>
            </Flex>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            defaultBg: '#ff8616',
                            defaultColor: '#fff',
                            defaultBorderColor: 'none',
                            defaultHoverBg: '#ffa838',
                            defaultHoverColor: '#fff',
                            defaultHoverBorderColor: 'none',
                            defaultActiveBg: '#ff8616',
                            defaultActiveBorderColor: 'none',
                            defaultActiveColor: '#fff'
                        }
                    }
                }}
            >
                <Upload {...props} >
                    <Button icon={<UploadOutlined />} >Seleccionar Archivo</Button>
                </Upload>
            </ConfigProvider>
        </>
    );
}