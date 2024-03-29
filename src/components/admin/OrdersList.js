import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import {toast as alert} from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, deleteOrder, clearErrors } from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

export const OrdersList = () => {
    const navigate= useNavigate();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Orden eliminada correctamente');
            navigate('/orderList');
            dispatch({ type: DELETE_ORDER_RESET })
        }

    }, [dispatch, error, isDeleted, navigate])


    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Fecha',
                    field: 'fecha',
                    sort: 'asc'
                },
                {
                    label: 'No. Orden',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: '# Items',
                    field: 'numItems',
                    sort: 'asc'
                },
                {
                    label: 'Valor Total',
                    field: 'valorTotal',
                    sort: 'asc'
                },
                {
                    label: 'Estado',
                    field: 'estado',
                    sort: 'asc'
                },
                {
                    label: 'Acciones',
                    field: 'acciones',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            var fecha= new Date(order.fechaCreacion).toLocaleDateString()
            data.rows.push({
                fecha: fecha,
                id: order._id,
                numItems: order.items.length,
                valorTotal: `$${order.precioTotal}`,
                estado: order.estado && String(order.estado).includes('Entregado')
                    ? <p style={{ color: 'green' }}>{order.estado}</p>
                    : <p style={{ color: 'red' }}>{order.estado}</p>,
                acciones: <Fragment>
                    <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'Todos los Pedidos'} />
            <div className="row">
                <div className="col-12 col-md-3">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-9">
                    <Fragment>
                        {loading ? ( <span className="loader"></span>) : (
                            <MDBCard className='mt-2'>
                                <MDBCardHeader>
                                    <MDBCardTitle>
                                        <h1 className="text-center">Listado de pedidos</h1>
                                    </MDBCardTitle>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBDataTable
                                        data={setOrders()}
                                        className="px-2 text-center"
                                        bordered
                                        striped
                                        hover
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default OrdersList