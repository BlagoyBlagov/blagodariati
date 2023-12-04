import { useState } from "react";
import * as authService from "../../services/authService";
import { registerValidate } from "../../utils/registerValidate";
import LocationSearch from "../locationSearch";

const Register = () => {

    const formInitValues = {
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        phoneNumber: '',
        userType: '1',
        password: '',
        rePassword: '',
    };


    const [formValues, setFormValues] = useState(formInitValues);
    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        const { name, value } = e.target;

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: undefined,
        }));
        
        setFormValues((state) => ({
            ...state,
            [name]: value,
        }));
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const newErrors = registerValidate(formValues);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            authService.register(formValues);
        }
    }


    return (
            <>
            <div className="py-5 text-center">
                <h2>Регистрация</h2>
                <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius magnam exercitationem incidunt eos dolore? Molestias recusandae, expedita quos quod soluta sit qui amet optio reiciendis vitae accusamus delectus eaque iure!</p>
            </div>

            <div className="row g-5">
                <div className="offset-md-2 col-md-7 col-lg-8">
                    <form onSubmit={submitHandler}>
                        <div className="row g-3">
                            
                            <div className="col-sm-12">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="userType" id="user_type_1" value="1" 
                                    onChange={changeHandler}
                                    checked={String(formValues.userType) === '1'}
                                    />
                                    <label className="form-check-label" htmlFor="user_type_1">Потребител</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="userType" id="user_type_2" value="2" 
                                    onChange={changeHandler} 
                                    checked={String(formValues.userType) === '2'}
                                    />
                                    <label className="form-check-label" htmlFor="user_type_2">Нуждаещ се</label>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">Вашето име</label>
                                <input type="text" className="form-control" id="firstName" name="firstName" value={formValues.firstName} onChange={changeHandler} />
                                {errors.firstName && <p>{errors.firstName}</p>}
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">Фамилия</label>
                                <input type="text" className="form-control" id="lastName" name="lastName" value={formValues.lastName} onChange={changeHandler} />
                                {errors.lastName && <p>{errors.lastName}</p>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="email" className="form-label">Имейл адрес</label>
                                <input type="email" className="form-control" id="email" name="email" value={formValues.email} onChange={changeHandler} />
                                {errors.email && <p>{errors.email}</p>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="phoneNumber" className="form-label">Телефон</label>
                                <input type="phoneNumber" className="form-control" id="phoneNumber" name="phoneNumber" value={formValues.phoneNumber} onChange={changeHandler} />
                            </div>

                            <div className="col-12">
                                <label htmlFor="location" className="form-label">Местоположение</label>
                                <LocationSearch value={formValues.location} onChange={changeHandler} />
                            </div>

                            <div className="col-6">
                                <label htmlFor="password" className="form-label">Парола</label>
                                <input type="password" className="form-control" id="password" name="password" value={formValues.password} onChange={changeHandler} />
                                {errors.password && <p>{errors.password}</p>}
                            </div>

                            <div className="col-6">
                                <label htmlFor="rePassword" className="form-label">Повторете паролата</label>
                                <input type="password" className="form-control" id="rePassword" name="rePassword" value={formValues.rePassword} onChange={changeHandler} />
                                {errors.rePassword && <p>{errors.rePassword}</p>}
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