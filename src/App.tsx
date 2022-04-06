import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import "./styles.css";

export default function App() {
  const { register, handleSubmit, unregister, formState: { errors } } = useForm();
  const [dish, updateDish] = useState<string>('Pizza');
  const errorMsg = {
    req: 'this field is required',
    num: 'should be grater than zero'
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

  function onDishTypeChange(targetValue:string) {
    unregister("Dish");
    updateDish(targetValue);
  }

  console.log("errors", errors);
  
  return (    
    <form onSubmit={onSubmit}>
      <h1>
        Cook Form
      </h1>
      <input type="text" placeholder="Name" {...register("Name", {required: errorMsg.req})} />
      {errors.Name && <div className="error">{errors.Name.message}</div>}

      <input type="number" defaultValue="0" placeholder="preparation_time" {...register("preparation_time",
        { min: {
          value: 1,
          message: errorMsg.num
        },
        required: errorMsg.req
      })} />
      {errors.preparation_time && <div className="error">{errors.preparation_time.message}</div>}

      <select placeholder="Enter your name" {...register("type", {required: errorMsg.req, onChange: (e) => onDishTypeChange(e.target.value)})}>
        <option value="Pizza">Pizza</option>
        <option value="Soup">Soup</option>
        <option value="Sandwich">Sandwich</option>
      </select>

      {returnOptions()}

      <input type="submit" />

    </form>
  );
}