import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import "./styles.css";

export default function App() {
  const { register, handleSubmit, unregister, formState: { errors } } = useForm();
  const [dish, updateDish] = useState<string>('');
  const errorMsg = {
    req: 'this field is required',
    num: 'should be grater than one minute'
  }
  const onSubmit = handleSubmit((data) => {
    console.log('SUBMIT', data)
  });

  function returnOptions() {
    if(dish === 'Pizza') {
      return (<input type="text" placeholder="Name2" {...register("Dish.Name1", {})} />)
    } else {
      return (<input type="text" placeholder="Name3" {...register("Dish.Name2", {})} />)
    }
  }

  function onDishTypeChange(targetValue:any) {
    unregister("Dish");
    updateDish(targetValue);
  }
  
  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Name" {...register("Name", {required: errorMsg.req})} />
      <input type="number" placeholder="preparation_time" {...register("preparation_time",
        { min: {
          value: 1,
          message: errorMsg.num
        },
        required: errorMsg.req
      })} />
      <select {...register("type", {required: errorMsg.req, onChange: (e) => onDishTypeChange(e.target.value)})}>
        <option value="">Select...</option>
        <option value="Pizza">Pizza</option>
        <option value="Soup">Soup</option>
        <option value="Sandwich">Sandwich</option>
      </select>
      {returnOptions()}
      <input type="submit" />
    </form>
  );
}