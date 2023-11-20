import { useState } from "react";
import * as authService from "../../services/authService";

const Register = () => {

    const formInitValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: '',
    };


    const [formValues, setFormValues] = useState(formInitValues);
    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        let value = '';

        if(e.target.type === 'radio') {
            value = e.target.checked;
        } else {
            value = e.target.value
        }

        setFormValues(state => ({
            ...state,
            [e.target.name]: value
        }));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        authService.register(formValues);
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
                            
                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">Вашето име</label>
                                <input type="text" className="form-control" id="firstName" name="firstName" 
                                value={formValues.firstName} 
                                onChange={changeHandler} 
                                />
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">Фамилия</label>
                                <input type="text" className="form-control" id="lastName" name="lastName" value={formValues.lastName} onChange={changeHandler} />
                            </div>
                            <div className="col-6">
                                <label htmlFor="email" className="form-label">Имейл адрес</label>
                                <input type="email" className="form-control" id="email" name="email" value={formValues.email} onChange={changeHandler} />
                            </div>

                            <div className="col-6">
                                <label htmlFor="password" className="form-label">Парола</label>
                                <input type="password" className="form-control" id="password" name="password" value={formValues.password} onChange={changeHandler} />
                            </div>

                            <div className="col-6">
                                <label htmlFor="rePassword" className="form-label">Повторете паролата</label>
                                <input type="password" className="form-control" id="rePassword" name="rePassword" value={formValues.rePassword} onChange={changeHandler} />
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