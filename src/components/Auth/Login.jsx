import { useContext, useState } from 'react';
import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/authContext';

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

            <div className="row g-5">
                <div className="offset-md-2 col-md-7 col-lg-8">


                    {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}</div>}


                    <form onSubmit={onSubmit}>
                        <div className="row g-3">
                            
                            <div className="col-6">
                                <label htmlFor="email" className="form-label">Имейл адрес</label>
                                <input type="email" className="form-control" id="email"
                                name={LoginFormKeys.Email}
                                onChange={onChange}
                                value={values[LoginFormKeys.Email]}
                                />
                            </div>

                            <div className="col-6">
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