import { useContext, useState } from 'react';
import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/authContext';

import styles from '../styles/auth.module.css';

const LoginFormKeys = {
    Email: 'email',
    Password: 'password',
}

export default function Login() {

    const { loginSubmitHandler } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const { values, onChange, onSubmit } = useForm(async (formValues) => {
        const error = await loginSubmitHandler(formValues);
        if (error) {
            setError(error);
        }
    }, {
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    });

    return (
            <>
            <div className="py-5 text-center">
                <h2>Вход</h2>
            </div>

            <div className="row g-5 justify-content-center">
                
                <div className="col-md-4">
                    <div className={styles['form-left-box']}>
                        <h3>Добре дошли отново!</h3>
                        <img src="/images/001-login.png" />
                    </div>
                </div>

                <div className="col-md-4">


                    {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}</div>}


                    <form onSubmit={onSubmit}>
                        <div className="row g-3">
                            
                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Имейл адрес</label>
                                <input type="email" className="form-control" id="email"
                                name={LoginFormKeys.Email}
                                onChange={onChange}
                                value={values[LoginFormKeys.Email]}
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="password" className="form-label">Парола</label>
                                <input type="password" className="form-control" id="password"
                                name={LoginFormKeys.Password}
                                onChange={onChange}
                                value={values[LoginFormKeys.Password]}
                                />
                            </div> 

                        </div>

                        <hr className="my-4" />
                        
                        <button className="w-100 btn btn-primary btn-lg" type="submit">Вход</button>
                    </form>
                </div>
            </div>
            </>
       
    );
}