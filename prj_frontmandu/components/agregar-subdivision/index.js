import {Button, Form, Input, Select} from "antd";
import {useState} from "react";

const PaginaAgregarSubdivision = ({data, onCancel, onSubmit}) => {
    // console.log('data', data);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState();
    const onFinish = () => {
        onSubmit(formData);
    }
    const onChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setFormData({
            subdivision_nombre: value,
            divisionId: data.id
        });
    }
    return <>
        <Form className="formulario-agregarSubdiv" form={form} onFinish={onFinish}>
            <Form.Item
                name="subdivision_nombre"
                label="Nombre Subdivisión"
                onChange={onChange}
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Guardar</Button>{' '}
                <Button onClick={onCancel}>Cancelar</Button>
            </Form.Item>
        </Form>
    </>
}

export default PaginaAgregarSubdivision;
