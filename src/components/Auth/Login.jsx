import { useState } from "react";
import * as authService from "../../services/authService";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();

    const formInitValues = {
        email: '',
        password: '',
    };


    const [formValues, setFormValues] = useState(formInitValues);

    const changeHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const response = await authService.login(formValues);
        if (response === true) {
            navigate('/');
        }
      
        return response;
    }


    return (
            <>
            <div className="py-5 text-center">
                <h2>Вход</h2>
                <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius magnam exercitationem incidunt eos dolore? Molestias recusandae, expedita quos quod soluta sit qui amet optio reiciendis vitae accusamus delectus eaque iure!</p>
            </div>

            <div className="row g-5">
                <div className="offset-md-2 col-md-7 col-lg-8">
                    <form onSubmit={submitHandler}>
                        <div className="row g-3">
                            
                            <div className="col-6">
                                <label htmlFor="email" className="form-label">Имейл адрес</label>
                                <input type="email" className="form-control" id="email" name="email" value={formValues.email} onChange={changeHandler} />
                            </div>

                            <div className="col-6">
                                <label htmlFor="password" className="form-label">Парола</label>
                                <input type="password" className="form-control" id="password" name="password" value={formValues.password} onChange={changeHandler} />
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

export default Login;