import { useContext, useState } from "react";
import Autocomplete from "react-google-autocomplete";

import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";

import styles from '../styles/auth.module.css';

const RegisterFormKeys = {
    UserType: 'userType',
    FirstName: 'firstName',
    LastName: 'lastName',
    Email: 'email',
    PhoneNumber: 'phoneNumber',
    Password: 'password',
    ConfirmPassword: 'confirm-password',
};
 
const Register = () => {

    const { registerSubmitHandler } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const { values, onChange, onSubmit } = useForm(async (formValues) => {
        const error = await registerSubmitHandler(formValues);
        if (error) {
            setError(error);
        }
    }, {
        [RegisterFormKeys.UserType]: '1',
        [RegisterFormKeys.FirstName]: '',
        [RegisterFormKeys.LastName]: '',
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.PhoneNumber]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: '',
    });

    const onPlaceSelected = (place) => {
        const locationData = {
            location: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        };
        localStorage.setItem('locationData', JSON.stringify(locationData));
    }

    return (
            <>
            <div className="py-5 text-center">
                <h2>Регистрация</h2>
            </div>

            <div className="row g-5">
                <div className="offset-md-2 col-md-7 col-lg-8">

                    <div className="row g-3 justify-content-center">
                        <img src="/images/002-register.png" className={styles['form-icon']} />
                    </div>

                    {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}</div>}

                    <form onSubmit={onSubmit} className={styles['register-form']}>
                        <div className="row g-3">

                            <div className={`col-sm-12 ${styles['user-type']}`} >
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name={RegisterFormKeys.UserType} id="user_type_1" value="1" 
                                    onChange={onChange}
                                    />
                                    <label className="form-check-label" htmlFor="user_type_1">Потребител</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name={RegisterFormKeys.UserType} id="user_type_2" value="2" 
                                    onChange={onChange} 
                                    />
                                    <label className="form-check-label" htmlFor="user_type_2">Човек в нужда</label>
                                </div>
                            </div>
                            
                            <div className="col-sm-6">
                                <label htmlFor={RegisterFormKeys.FirstName} className="form-label">Вашето име</label>
                                <input type="text" className="form-control" id={RegisterFormKeys.FirstName} name={RegisterFormKeys.FirstName} values={values[RegisterFormKeys.FirstName]} onChange={onChange} />
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor={RegisterFormKeys.LastName} className="form-label">Фамилия</label>
                                <input type="text" className="form-control" id={RegisterFormKeys.LastName} name={RegisterFormKeys.LastName} values={values[RegisterFormKeys.LastName]} onChange={onChange} />
                            </div>
                            <div className="col-6">
                                <label htmlFor={RegisterFormKeys.Email} className="form-label">Имейл адрес</label>
                                <input type="email" className="form-control" id={RegisterFormKeys.Email} name={RegisterFormKeys.Email} values={values[RegisterFormKeys.Email]} onChange={onChange} />
                            </div>
                            <div className="col-6">
                                <label htmlFor={RegisterFormKeys.PhoneNumber} className="form-label">Телефон</label>
                                <input type="text" className="form-control" id={RegisterFormKeys.PhoneNumber} name={RegisterFormKeys.PhoneNumber}  values={values[RegisterFormKeys.PhoneNumber]} onChange={onChange} />
                            </div>

                            <div className="col-12">
                                <label htmlFor="location" className="form-label">Местоположение</label>
                                <Autocomplete
                                    apiKey="AIzaSyBmoVphbRmwLUh-77d1v_G9Wur2MU7YTBQ"
                                    onPlaceSelected={onPlaceSelected}
                                    className="form-control"
                                />
                            </div>

                            <div className="col-6">
                                <label htmlFor={RegisterFormKeys.Password} className="form-label">Парола</label>
                                <input type="password" className="form-control" id={RegisterFormKeys.Password} name={RegisterFormKeys.Password} values={values[RegisterFormKeys.Password]} onChange={onChange} />
                            </div>

                            <div className="col-6">
                                <label htmlFor={RegisterFormKeys.ConfirmPassword} className="form-label">Повторете паролата</label>
                                <input type="password" className="form-control" id={RegisterFormKeys.ConfirmPassword} name={RegisterFormKeys.ConfirmPassword} values={values[RegisterFormKeys.ConfirmPassword]} onChange={onChange} />
                            </div>
                        </div>

                            <hr className="my-4" />
                                <button className="w-100 btn btn-primary btn-lg" type="submit">Регистрирай се</button>
                            </form>
                        </div>
                </div>
                </>
       
    );
}

export default Register;