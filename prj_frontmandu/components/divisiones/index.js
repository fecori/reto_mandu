import {Col, Row, Table} from "antd";
import {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";

const Divisiones = ({content, addSubdivicion, verSubdiviciones}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const filtroDivision = [];
    const filtroDivisionSuperior = [];
    const filtroNivel = [];

    const columns = [
        {
            title: 'División',
            dataIndex: 'division_nombre',
            filters: filtroDivision,
            onFilter: (value, record) => record.division_nombre.indexOf(value) === 0,
            sorter: (a, b) => a.division_nombre.length - b.division_nombre.length,
        },
        {
            title: 'División Superior',
            dataIndex: 'division_superior',
            filters: filtroDivisionSuperior,
            onFilter: (value, record) => record.division_superior.indexOf(value) === 0,
            sorter: (a, b) => a.division_superior.length - b.division_superior.length,
        },
        {
            title: 'Colaboradores',
            dataIndex: 'colaboradores',
            sorter: (a, b) => a.colaboradores - b.colaboradores,
        },
        {
            title: 'Nivel',
            dataIndex: 'nivel',
            filters: filtroNivel,
            onFilter: (value, record) => parseInt(record.nivel) === parseInt(value),
            sorter: (a, b) => a.nivel - b.nivel,
        },
        {
            title: 'Subdivisiones',
            dataIndex: 'sub_divisiones',
            sorter: (a, b) => a.sub_divisiones - b.sub_divisiones,
            render: (value, data) => {
                return <>
                    <button className="btnVerSubdivicion" onClick={() => verSubdiviciones(data)}>{value}</button>
                    <button className="btnAddSubdivicion" onClick={() => addSubdivicion(data)}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7" cy="7" r="7" fill="#49C5A9" fillOpacity="0.9"/>
                            <line x1="3.625" y1="7.375" x2="10.375" y2="7.375" stroke="white" strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M7 7V4M7 8V10.5" stroke="white" strokeWidth="1.25" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </button>
                </>
            }
        },
        {
            title: 'Embajadores',
            dataIndex: 'embajadores'
        },

    ];

    const data = content.map((item, key) => {
        const {division_nombre, embajadores, division_superior, colaboradores, nivel} = item;
        if (division_nombre) {
            if (filtroDivision) {
                const existeDivision = filtroDivision.some(el => el.text === division_nombre);
                if (!existeDivision) {
                    filtroDivision.push({
                        text: division_nombre,
                        value: division_nombre,
                    });
                }
            }
        }
        if (division_superior) {
            const existeDivisionSuperior = filtroDivisionSuperior.some(el => el.text === division_superior);
            if (!existeDivisionSuperior) {
                filtroDivisionSuperior.push({
                    text: division_superior,
                    value: division_superior,
                });
            }
        }
        if (nivel) {
            const existeNivel = filtroNivel.some(el => el.text === nivel);
            if (!existeNivel) {
                filtroNivel.push({
                    text: nivel,
                    value: Number(nivel),
                });
            }
        }
        return {
            key,
            ...item,
            embajadores: embajadores || '-',
            division_superior: division_superior || '-',
            colaboradores: colaboradores || 0,
            nivel: nivel || 0,
        }
    })
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('items seleccionados: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return <>
        {/*<Row>
            <Col span={8}>izquierda</Col>
            <Col span={8} offset={8}>derecha</Col>
        </Row>*/}
        <Row>
            <Col span={24}>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        defaultPageSize: 2,
                        showSizeChanger: true,
                        // showQuickJumper: true,
                        pageSizeOptions: ['2', '10', '20', '30'],
                        showTotal: (total) => `Total colaboradores: ${total}`
                    }}
                />
            </Col>
        </Row>
        {/*<Row>
            <Col span={8}>izquierda</Col>
            <Col span={8} offset={8}>derecha</Col>
        </Row>*/}
    </>
}

export default Divisiones;
