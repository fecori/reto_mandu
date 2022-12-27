import {useState} from "react";
import Head from "next/head"
import axios from "axios";
import {Layout, Menu, Tabs, Radio, Row, Col, Select, Space, Input, Modal, Button} from "antd";
import {absoluteUrl, fetchData, getItem} from "../utils";
import ContenidoTabs from "../components/contenido-tabs";
import Divisiones from "../components/divisiones";
import PaginaListarSubdivisiones from "../components/listar-subdivisiones";
import PaginaAgregarSubdivision from "../components/agregar-subdivision";

const {Search} = Input;
const {Header, Content, Footer} = Layout;
const items = [
    getItem('Dashboard', 'dashboard', null),
    getItem('Organización', 'organizacion', null),
    getItem('Modelos', 'modelos', null, [
        getItem('Modelo 1', 'modelo_1'),
        getItem('Modelo 2', 'modelo_2')
    ]),
    getItem('Seguimiento', 'seguimiento', null, [
        getItem('Seguimiento 1', 'seguimiento_1'),
        getItem('Seguimiento 2', 'seguimiento_2')
    ])
];

function Home({origin, data}) {
    const {content} = data;
    const [getData, setData] = useState(content);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [typeModal, setTypeModal] = useState('');
    const [getSubdivision, setSubDivision] = useState(null);

    const onClick = (e) => {
        console.log('click ', e);
    };
    const onSearch = (value) => {
        console.log('onSearch value', value)
    }
    const addSubdivicion = (data) => {
        setTypeModal('agregar');
        setSubDivision(data);
        setOpenModal(true);
    }
    const verSubdiviciones = async (data) => {
        const {id} = data;
        fetchData(`http://localhost:8001/api/v1/subdivision/listar/${id}`, 'GET')
            .then(resSubDiv => {
                const {data: {subdiviciones}} = resSubDiv;
                setTypeModal('listar');
                setSubDivision(subdiviciones);
                setOpenModal(true);
            })
            .catch(error => console.log('verSubdiviciones error', error));
    }
    const handleOk = () => {
        console.log('clic ok')
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpenModal(false);
            setTypeModal('');
        }, 1000)
    };
    const onSubmit = (data) => {
        const {subdivision_nombre, divisionId} = data;
        axios.post('http://localhost:8001/api/v1/subdivision/crear', {
                subdivision_nombre, divisionId
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(resAddSubdiv => {
                setOpenModal(false);
                setTypeModal('');
                setData(resAddSubdiv.data.content);
            })
    }
    const btnCancelar = () => {
        setLoading(false);
        setOpenModal(false);
        setTypeModal('');
    };
    return (
        <>
            <Head>
                <title>Reto Mandu</title>
                <meta name="description" content="Reto Mandu"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Layout className="layout">
                <Header>
                    <div className="logo"/>
                    <Menu
                        onClick={onClick}
                        defaultSelectedKeys={['organizacion']}
                        theme="dark"
                        mode="horizontal"
                        items={items}
                    />
                </Header>
                <Content style={{
                    padding: '0 50px',
                }}>
                    <div className="site-layout-header">
                        <h1>Organización</h1>
                    </div>
                    <div className="site-layout-content">
                        <Row>
                            <Col span={12}>
                                <Radio.Group defaultValue="listado" buttonStyle="solid" style={{marginBottom: 8}}>
                                    <Radio.Button value="listado">Listado</Radio.Button>
                                    <Radio.Button value="arbol">Árbol</Radio.Button>
                                </Radio.Group>
                            </Col>
                            <Col span={12} className="top-sel-search">
                                <Select
                                    defaultValue="columnas"
                                    style={{
                                        width: 153
                                    }}
                                    options={[
                                        {
                                            value: 'columnas',
                                            label: 'Columnas',
                                        }
                                    ]}
                                />
                                <Space direction="vertical">
                                    <Search
                                        placeholder="Buscar"
                                        onSearch={onSearch}
                                        style={{
                                            width: 200,
                                        }}
                                    />
                                </Space>
                            </Col>
                        </Row>
                        <Tabs
                            defaultActiveKey="1"
                            items={[
                                {
                                    label: `Divisiones`,
                                    key: 'divisiones',
                                    children: <Divisiones content={getData} addSubdivicion={addSubdivicion}
                                                          verSubdiviciones={verSubdiviciones}/>,
                                },
                                {
                                    label: `Colaboradores`,
                                    key: 'colaboradores',
                                    children: <ContenidoTabs demo={true}/>,
                                }
                            ]}
                        />
                    </div>
                </Content>
                <Footer>Reto Mandü</Footer>
                <Modal
                    open={openModal}
                    onCancel={btnCancelar}
                    footer={typeModal === 'agregar' ? null : [<Button key="back" onClick={btnCancelar}>
                        Cancelar
                    </Button>]}>
                    {typeModal === 'agregar' &&
                        <PaginaAgregarSubdivision data={getSubdivision} onSubmit={onSubmit} onCancel={btnCancelar}/>}
                    {typeModal === 'listar' && <PaginaListarSubdivisiones data={getSubdivision}/>}
                </Modal>
            </Layout>
        </>
    )
}

export async function getServerSideProps(context) {
    const {req} = context;
    const {origin} = absoluteUrl(req);
    const result = await axios.get(`http://localhost:8001/api/v1/division/consultar`);
    return {
        props: {
            origin,
            data: result.data
        },
    };
}

export default Home;
