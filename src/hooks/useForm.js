import { useState } from "react"

export default function useForm(submitHandler, initValues) {
    const [values, setValues] = useState(initValues);

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        submitHandler(values);
    };

    return {
        values,
        onChange,
        onSubmit,
    }
}