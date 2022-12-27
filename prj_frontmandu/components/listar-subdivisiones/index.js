const PaginaListarSubdivisiones = ({data}) => {
    if (data.length) {
        return data.map((item, key) => {
            const {subdivision_nombre} = item;
            return <p key={key}>{subdivision_nombre}</p>
        })
    } else {
        return <>No se encontraron subdivisiones</>
    }
}

export default PaginaListarSubdivisiones;
