export const registerValidate = (formValues) => {
    const errors = {};

    const { firstName, lastName, email, password, rePassword } = formValues;

    if (!firstName) {
        errors.firstName = "Моля напишете вашето име";
    }
    if (!lastName) {
        errors.lastName = "Моля напишете вашата фамилия";
    }
    if (!email) {
        errors.email = "Моля въведете имейл адрес";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Моля въведете валиден имейл адрес";
    }
    if (!password) {
        errors.password = "Моля въведете парола";
    }
    if (!rePassword) {
        errors.rePassword = "Моля повторете паролата";
    }
    if (password !== rePassword) {
        errors.password = "Паролите не съвпадат";
    }

    return errors;
};