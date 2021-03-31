import React, { Fragment, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {getIDFactura, updateFactura, getFactura} from '../Actions/FacturaAction'

const FormFacturaEdit = props => {

    const {register, errors, handleSubmit} = useForm();

    
    
    const [facturaEdit, setfacturaEdit] = useState(
        {
            fechaEmision: '',
            idFactura:'',
            numeroFactura:'',
            razonSocial: '',
            ruc: '',
            sumTotalProductos: ''
        }
    );

    const obtenerFacturaId = async() =>{
        const response = await getIDFactura(props.props);
        console.log(response.data);
        setfacturaEdit(response.data);
    };

    useEffect(() => {
        obtenerFacturaId();
       console.log(props.props)
    }, [props])

    const insertValues = e => {
        const {name, value} = e.target;
        setfacturaEdit( user => ({
            ...user,
            [name]: value
        }))
    }

    const obtenerProducto = async() =>{
        await getFactura();
    };

    const save = e =>{
        e.preventDefault();
        
        updateFactura(facturaEdit, facturaEdit.idFactura).then(async response => {
            if(response.status === 200)
            {
                alert("Se actualizo la factura");
                await obtenerProducto();
            }
            else
            {
                alert("Ocurrio un error al momento actualizar la factura")
            }
        });

        //e.target.reset();
    }

    return (
        <Fragment>
            <form className="container-sm" onSubmit={handleSubmit(save)}> 
                <div className="mb-3">
                    <label className="form-label col-form-label-lg">Edite los datos a continuación</label>
                </div>
                
                    <label for="exampleFormControlInput1" className="form-label">R.U.C.: </label>
                    <input 
                        type="text" 
                        onChange={insertValues}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        className="form-control mb-3" 
                        id="exampleFormControlInput1"
                        name = "ruc"
                        value = {facturaEdit.ruc}
                        autoComplete="off"
                        ref={register({
                            required:{
                                value: true,
                                message: 'El campo R.U.C. es requerido'
                            },
                            maxLength:{
                                value: 11,
                                message: 'Máximo 11 caracteres'
                            },
                            pattern: {
                                value: /[0-9]/,
                                message: "Solo se aceptan números"
                              }
                        })
                        }
                    />
                    <span className="text-danger text-small d-block mb-2">
                        {errors?.ruc?.message}
                    </span>
                
                    <label for="exampleFormControlInput2" className="form-label">Razón Social: </label>
                    <input 
                        type="text" 
                        onChange={insertValues}
                        className="form-control mb-3" 
                        id="exampleFormControlInput2"
                        name = "razonSocial"
                        value = {facturaEdit.razonSocial}
                        autoComplete="off"
                        ref={register({
                            required:{
                                value: true,
                                message: 'El campo Razón Social es requerido'
                            }
                        })
                        }/>
                    <span className="text-danger text-small d-block mb-2">
                        {errors?.razonSocial?.message}
                    </span>
                
                    <label for="exampleFormControlInput3" className="form-label">Numero de Factura: </label>
                    <input 
                        type="text" 
                        onChange={insertValues}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        className="form-control mb-3" 
                        id="exampleFormControlInput3"
                        name = "numeroFactura"
                        value = {facturaEdit.numeroFactura}
                        autoComplete="off"
                        ref={register({
                            required:{
                                value: true,
                                message: 'El campo Numero de Facturación es requerido'
                            }
                        })
                        }/>
                    <span className="text-danger text-small d-block mb-2">
                        {errors?.numeroFactura?.message}
                    </span>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={save}>Editar Factura</button>
                
            </form>

            
        </Fragment>
    )
}

export default FormFacturaEdit
