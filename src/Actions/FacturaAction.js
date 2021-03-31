import HttpClient from '../Services/HttpClient'; 

export const getFactura = () => {
    return new Promise((resolve, eject) => {
        
        HttpClient.get('/api/factura/getall')
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            console.log('error' ,  error);
            resolve(error);
        })
    })
}

export const getProducto = () => {
    return new Promise((resolve, eject) => {
        
        HttpClient.get('/api/factura/getallproducto')
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            console.log('error' ,  error);
            resolve(error);
        })
    })
}

export const createFactura = (producto) => {
    return new Promise((resolve, eject) => {
        
        HttpClient.post('/api/factura/create', producto).then((response) => {
            resolve(response);
        }).catch((error) => {
           
            resolve(error);
        })

    })
}

export const updateFactura = (producto, id) => {
    return new Promise((resolve, eject) => {
        
        HttpClient.put(`/api/factura/update/${id}`, producto).then((response) => {
            resolve(response);
        }).catch((error) => {
           
            resolve(error);
        })

    })
}

export const getIDFactura = (id) => {
    return new Promise((resolve, eject) => {
        
        HttpClient.get(`/api/factura/get/${id}`).then((response) => {
            resolve(response);
        }).catch((error) => {
           
            resolve(error);
        })

    })
}