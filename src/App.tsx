import React from 'react';
import { useForm } from 'react-hook-form';

import "./styles.css";

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = handleSubmit((data) => {
    selectedDishOptions = data.type;
    console.log(selectedDishOptions)
  });

  let selectedDishOptions = ''

  function returnOptions() {
    if(selectedDishOptions === 'Pizza') {
      return (<input type="text" placeholder="Name2" {...register("Name2", {})} />)
    } else {
      return (<input type="text" placeholder="Name3" {...register("Name3", {})} />)
    }
  }
  //console.log('errors', errors);
  
  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Name" {...register("Name", {required: 'error message'})} />
      <input type="number" placeholder="preparation_time" {...register("preparation_time", {required: 'error message'})} />
      <select {...register("type", {required: 'error message'})}>
        <option value="Pizza" selected>Pizza</option>
        <option value="Soup"> Soup</option>
        <option value="Sandwich"> Sandwich</option>
      </select>
      {returnOptions()}
      <input type="submit" />
    </form>
  );
}

