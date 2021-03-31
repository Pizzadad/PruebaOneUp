import React, { Fragment, useState, useEffect } from 'react'

import FormFacturaEdit from './FormFacturaEdit';
import Modal from 'react-modal';

const TarjetaFactura = props => {

    const [facturadataprops, setfacturadataprops] = useState(props);
    const [modaldialog, setmodaldialog] = useState(false);

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

    useEffect(() => {
        setfacturadataprops(props)
        
    }, [props])

    return (
        <Fragment>
             <div className="col-md-4 mb-4">
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">N° de facturacion: {facturadataprops.props.numeroFactura} - {facturadataprops.props.fechaEmision}</h5>
                        <p className="card-text">R.U.C.: {facturadataprops.props.ruc}</p>
                        <p className="card-text">Razón Social: {facturadataprops.props.razonSocial}</p>                        
                        <button type="button" onClick={() => setmodaldialog(true)} className="btn btn-primary">
                            Editar Factura
                        </button>
                    </div>
                </div>
            </div>

            <Modal 
                    isOpen = {modaldialog}
                    shouldCloseOnOverlayClick = {false}
                    onRequestClose = {() => setmodaldialog(false)}
                    style={customStyles}
                >
                    <FormFacturaEdit props={facturadataprops.props.idFactura} />
                    <button type="button" onClick={() => setmodaldialog(false)} className="btn btn-secondary mt-5" data-bs-dismiss="modal">Cerrar</button>
                            
                </Modal>
        </Fragment>
    )
}

export default TarjetaFactura
