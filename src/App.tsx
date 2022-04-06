import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import "./styles.css";

export default function App() {
  const { register, handleSubmit, unregister, formState: { errors } } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log('SUBMIT', data)
  });

  const [selectedDishOptions, updateDish] = useState<string>('');
  

  function returnOptions() {
    console.log('selectedDishOptions', selectedDishOptions);

    if(selectedDishOptions === 'Pizza') {
      return (<input type="text" id="111" key="111" className="one" placeholder="Name2" {...register("Dish.Name1", {})} />)
    } else {
      return (<input type="text" id="222" key="222" className="two" placeholder="Name3" {...register("Dish.Name2", {})} />)
    }
  }

  function onDishTypeChange(targetValue:any) {
    unregister("Dish");
    updateDish(targetValue);
  }
  
  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Name" {...register("Name", {required: 'error message'})} />
      <input type="number" placeholder="preparation_time" {...register("preparation_time",
        { min: {
          value: 3,
          message: 'error message'
        }
      })} />
      <select {...register("type", {required: 'error message', onChange: (e) => onDishTypeChange(e.target.value)})}>
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