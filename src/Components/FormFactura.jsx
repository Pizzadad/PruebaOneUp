import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {createFactura, getProducto, getFactura} from '../Actions/FacturaAction'

const FormFactura = () => {

    const {register, errors, handleSubmit} = useForm();
    
    const [productoItem, setproductoItem] = useState([{
        idProducto: '',
        nombre : '',
        descripcion : '',
        precioUnitario : ''
    }]);

    const [facturaAdd, setfacturaAdd] = useState({
        fechaEmision: '',
        idFactura: 0,
        numeroFactura:'',
        razonSocial: '',
        ruc: '',
        sumTotalProductos: 0,
        
    });

    const insertValues = e => {
        const {name, value} = e.target;
        setfacturaAdd( user => ({
            ...user,
            [name]: value
        }))
    }

    
    
    const save = e =>{
        e.preventDefault();
        
        createFactura(facturaAdd).then(response => {
            if(response.status === 200)
            {
                alert("Se creo la factura");
                obtenerFacturaForm();
            }
            else
            {
                alert("Ocurrio un error al momento de guardar la factura")
            }
        });

        //e.target.reset();
    }

    useEffect(() => {
        obtenerProducto();
        
    }, [])

    const obtenerProducto = async() =>{
        const response = await getProducto();
        setproductoItem(response.data);   
        
    };

    const obtenerFacturaForm = async() =>{
        await getFactura();
    };

    return (
        <Fragment>
            <form className="container-sm" onSubmit={handleSubmit(save)}> 
                <div className="mb-3">
                    <label className="form-label col-form-label-lg">Ingrese los datos a continuación</label>
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
                
                    <select className="form-select mb-4" multiple aria-label="multiple select example">
                        {
                            productoItem.map((productoItem) => (
                                <option key={productoItem.idProducto} value={productoItem.idProducto}>
                                    {productoItem.nombre} - {productoItem.descripcion} - S/.{productoItem.precioUnitario}
                                </option>
                            ))
                        }                        
                    </select>

                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={save}>Guardar Factura</button>
                
            </form>

            
        </Fragment>
    )
}

export default FormFactura