import axios from "axios";

const absoluteUrl = (req, setLocalhost) => {
    let protocol = 'https:';
    let host = req
        ? req.headers['x-forwarded-host'] || req.headers['host']
        : window.location.host;
    if (host.indexOf('localhost') > -1) {
        if (setLocalhost) host = setLocalhost;
        protocol = 'http:';
    }
    return {
        protocol: protocol,
        host: host,
        origin: protocol + '//' + host,
        url: req,
    };
}
const fetchData = async (url, method, config) => {
    if (method === 'GET') {
        return await axios.get(url, config);
    } else {
        return await axios.post(url, config);
    }
}
const getItem = (label, key, icon, children, type) => {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export {
    absoluteUrl,
    getItem,
    fetchData
}
