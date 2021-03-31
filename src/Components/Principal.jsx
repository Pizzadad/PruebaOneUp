import React, { Fragment, useState,useEffect } from 'react'
import FormFactura from './FormFactura'
import {getFactura} from '../Actions/FacturaAction'
import TarjetaFactura from './TarjetaFactura';
import Modal from 'react-modal';

const Principal = () => {


    const [modaldialog, setmodaldialog] = useState(false)
    
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };

    const [facturadata, setfacturadata] = useState([
        {
            fechaEmision: '',
            idFactura:'',
            numeroFactura:'',
            razonSocial: '',
            ruc: '',
            sumTotalProductos: ''
        }
    ]);

    const obtenerFactura = async() =>{
        const response = await getFactura();
        setfacturadata(response.data);
    };

    useEffect(() => {
        obtenerFactura();
    }, [])

    return (
        <Fragment>
            <div className="container-sm">
                
                <div className="row justify-content-end mb-5">
                    <div className="col">
                        <button type="button" onClick={() => setmodaldialog(true)} className="btn btn-success">
                            Agregar Factura
                        </button>
                    </div>
                </div>
                <div className="row mb-4">
                    {
                        facturadata.map((facturadata) => (
                            <TarjetaFactura key={facturadata.idFactura} props={facturadata}/>
                        ))
                    }
                </div>
                
                <Modal 
                    isOpen = {modaldialog}
                    shouldCloseOnOverlayClick = {false}
                    onRequestClose = {() => setmodaldialog(false)}
                    style={customStyles}
                >
                    <FormFactura />
                    <button type="button" onClick={() => setmodaldialog(false)} className="btn btn-secondary mt-5">Cerrar</button>
                            
                </Modal>

            </div>
        </Fragment>
    )
}

export default Principal
