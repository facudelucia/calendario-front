import React from 'react';
import './login.css';
import { useForm } from "../../hooks/useForm";
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

const LoginScreen = () => {
    const dispatch = useDispatch()
    const [formLoginValues, handleLoginInputChange] = useForm({
        Lemail: "",
        Lpassword: "",
    });

    const { Lemail, Lpassword } = formLoginValues

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        Rname: "",
        Remail: "",
        Rpassword: "",
        Rconfirm: "",
    });

    const { Rname, Remail, Rpassword, Rconfirm } = formRegisterValues

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(startLogin(Lemail, Lpassword))
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        if(Rpassword !== Rconfirm){
            Swal.fire("Error", "passwords must match", "error");
            return
        }
        dispatch(startRegister(Remail, Rpassword, Rname))
        
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                value={Lemail}
                                name="Lemail"
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                value={Lpassword}
                                name="Lpassword"
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                value={Rname}
                                name="Rname"
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                value={Remail}
                                name="Remail"
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                value={Rpassword}
                                name="Rpassword"
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                value={Rconfirm}
                                name="Rconfirm"
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;