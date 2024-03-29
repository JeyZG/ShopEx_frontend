import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productsActions';
import { allOrders } from '../../actions/orderActions';
import { allUsers } from '../../actions/userActions';
import { NumericFormat } from 'react-number-format';

export const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, cantidadTotal, loading } = useSelector(state => state.allOrders)

    let outOfStock = 0;
    products.forEach(product => {
        if (product.inventario === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch])
    
    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-start">
                    <div className="col-12 col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-md-9">
                        {/* <h1 className="my-4 mt-5 text-center">Dashboard</h1> */}
                        {loading ? ( <span className="loader"></span>) : (
                            <Fragment>
                                <MetaData title={'Dashboard'} />
                                <div className="row pr-4 mt-5">
                                    <div className="col-xl-12 col-sm-12 mb-3">
                                        <div className="card text-white bg-primary o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">
                                                    Ventas Totales<br /> 
                                                    <b>
                                                    <NumericFormat
                                                        value={cantidadTotal && cantidadTotal.toFixed(2)}
                                                        displayType={"text"}
                                                        thousandSeparator={true}
                                                        prefix={"$"}
                                                        renderText={(value) => <span>{value}</span>}
                                                    />
                                                    </b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row pr-4">
                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-success o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">
                                                    Productos<br /> 
                                                    <b>{products && products.length}</b>
                                                </div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/listaProductos">
                                                <span className="float-left">Ver Detalles</span>
                                                <span className="float-right"><i className="fa fa-angle-right"></i></span>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-danger o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">
                                                    Pedidos<br /> 
                                                    <b>{orders && orders.length}</b>
                                                </div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/orderList">
                                                <span className="float-left">Ver Detalles</span>
                                                <span className="float-right"><i className="fa fa-angle-right"></i></span>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-info o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">
                                                    Usuarios<br /> 
                                                    <b>{users && users.length}</b>
                                                </div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                                <span className="float-left">Ver Detalles</span>
                                                <span className="float-right"><i className="fa fa-angle-right"></i></span>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-warning o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">
                                                    Agotados<br /> 
                                                    <b>{outOfStock}</b>
                                                </div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/productosAgotados">
                                                <span className="float-left">Ver Detalles</span>
                                                <span className="float-right"><i className="fa fa-angle-right"></i></span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default Dashboard