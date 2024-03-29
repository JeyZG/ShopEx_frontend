import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { toast as alert } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'

export const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const dispatch = useDispatch();
    const { error, loading, message } = useSelector(state => state.forgotPassword)
    const navigate = useNavigate();

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message)
        }

    }, [dispatch, error, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData))
        alert.info("Solicitud enviada correctamente")
        navigate("/login")
    }

    return (
        <Fragment>
            <MetaData title={'Olvidé mi contraseña'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Olvidé mi contraseña</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email registrado</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false} >
                            Recuperar contraseña
                    </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default ForgotPassword;