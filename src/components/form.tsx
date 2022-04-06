import * as React from 'react'
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Checkbox, Input, Select } from "@mui/material";

interface IFormInput {
    firstName: string;
    lastName: string;
    iceCreamType: {label: string; value: string };
}
  
const form = () => {
    const { control, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} />}
            />
            <input type="submit" />
        </form>
    )
}

export default form