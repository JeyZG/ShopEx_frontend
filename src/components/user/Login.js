import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import { clearErrors, login } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

const Login = () => {
    
    // Estados para obtener y setear email y contraseña
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { isAuthenticated, error, loading } = useSelector (state => state.auth)

    useEffect( () => {
        // Le decimos que despues de autenticado nos lleve a un sitio (Home)
        if(isAuthenticated){
            navigate('/')
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors)
        }
    }, [dispatch, isAuthenticated, error, navigate, alert])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <Fragment>
            {/* Aqui cargamos un loader mientras se extraen todos los productos de la base de datos */}
			{loading ? <span className='loader'></span> : (
                <Fragment>
                    <MetaData title={'Inicio de sesión'} />
                    <div className='row wrapper'>
                        <div className='col-10 col-lg-5'>
                            <form className='shadow-lg' onSubmit={submitHandler}>
                                <h1 className='mb-3 text-center'>Inicio de sesión</h1>
                                {/* Campo para email */}
                                <div className='form-group'>
                                    <label htmlFor='email_field'>Correo electronico</label>
                                    <input 
                                        type='email' 
                                        id='email_field' 
                                        className='form-control' 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></input>
                                </div>
                                {/* Campo para password */}
                                <div className='form-group'>
                                    <label htmlFor='password_field'>Contraseña</label>
                                    <input 
                                        type='password' 
                                        id='password_field' 
                                        className='form-control' 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></input>
                                </div>
                                {/* Link para Olvido de contraseña */}
                                <Link to='/forgotPassword' className='float-right mb-4'>Olvidé mi contraseña</Link>
                                {/* Boton para login */}
                                <button id='login_button' type='submit' className='btn btn-block py-3'>Login</button>
                                {/* Link para registrarse */}
                                <hr />
                                <Link to='/register' className='float-right mb-3 text-danger'>No tienes una cuenta? Registrate</Link>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
        
    )
}

export default Login