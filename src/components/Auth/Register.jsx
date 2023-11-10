const Register = () => {
    return (
            <>
            <div className="py-5 text-center">
                <h2>Регистрация</h2>
                <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius magnam exercitationem incidunt eos dolore? Molestias recusandae, expedita quos quod soluta sit qui amet optio reiciendis vitae accusamus delectus eaque iure!</p>
            </div>

            <div className="row g-5">
                <div className="offset-md-2 col-md-7 col-lg-8">
                    <form>
                        <div className="row g-3">

                           
                                <div className="col-sm-6 form-check">
                                    <input type="radio" className="btn-check" name="options-base" id="type1" autoComplete="off" checked />
                                    <label className="btn w-100" htmlFor="type1">Потребител</label>
                                </div>
                                <div className="col-sm-6 form-check">
                                    <input type="radio" className="btn-check" name="options-base" id="type2" autoComplete="off" />
                                    <label className="btn w-100" htmlFor="type2">Нуждаещ се</label>
                                </div>
                            

                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">Вашето име</label>
                                <input type="text" className="form-control" id="firstName"  value="" />
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">Фамилия</label>
                                <input type="text" className="form-control" id="lastName" value="" />
                            </div>
                            <div className="col-6">
                                <label htmlFor="email" className="form-label">Имейл адрес</label>
                                <input type="email" className="form-control" id="email" value="" />
                            </div>

                            <div className="col-6">
                                <label htmlFor="phoneNumber" className="form-label">Телефон</label>
                                <input type="text" className="form-control" id="phoneNumber" value="" />
                            </div>

                            {/* <div className="col-6">
                                <label htmlFor="location" className="form-label">Населено място</label>
                                <input type="text" className="form-control" id="location" value="" />
                            </div>

                            <div className="col-6">
                                <label htmlFor="imageUrl" className="form-label">Профилна снимка</label>
                                <input type="text" className="form-control" id="imageUrl" value="" />
                            </div> */}

                            <div className="col-6">
                                <label htmlFor="password" className="form-label">Парола</label>
                                <input type="password" className="form-control" id="password" value="" />
                            </div>

                            <div className="col-6">
                                <label htmlFor="rePassword" className="form-label">Повторете паролата</label>
                                <input type="password" className="form-control" id="rePassword" value="" />
                            </div>
                        </div>

                            <hr className="my-4" />

                                <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                            </form>
                        </div>
                </div>
                </>
       
    );
}

export default Register;