import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import "./styles.css";

export default function App() {
  const { register, handleSubmit, unregister, formState: { errors } } = useForm();
  const [dish, updateDish] = useState<string>('');
  const errorMsg = {
    req: 'this field is required',
    num: 'should be grater than zero'
  }
  /* TYPES:
error msg
data - onSubmit

  */
  const onSubmit = handleSubmit((data) => {
    console.log('SUBMIT', data)
  });

  function returnOptions() {
    const misc = []
    let head = <h2>
                  {dish} Specs
                </h2>

    if(dish === 'Sandwich') {
      misc.push(head)
      misc.push(<div>
        <input type="text" placeholder="slices_of_bread" {...register("Dish.slices_of_bread", {})} />
      </div>)

    } else if (dish === 'Pizza') {
      misc.push(head)
      misc.push(<div>
          <input type="text" placeholder="no_of_slices" {...register("Dish.no_of_slices", {})} />
          <input type="text" placeholder="diameter" {...register("Dish.diameter", {})} />
        </div>)
      
    } else if (dish === 'Soup'){
      misc.push(head)
      misc.push(<div>
          <input type="text" placeholder="spiciness_scale" {...register("Dish.spiciness_scale", {})} />
        </div>)
    } else {
      return (null)
    }
    return misc
  }

  function onDishTypeChange(targetValue:string) {
    unregister("Dish");
    updateDish(targetValue);
  }
  
  return (    
    <form onSubmit={onSubmit}>
      <h1>
        Cook Form
      </h1>
      <input type="text" placeholder="name" {...register("name", {required: errorMsg.req})} />
      {errors.name && <div className="error">{errors.name.message}</div>}

      <input type="number" defaultValue="0" placeholder="preparation_time" {...register("preparation_time",
        { min: {
          value: 1,
          message: errorMsg.num
        },
        required: errorMsg.req
      })} />
      {errors.preparation_time && <div className="error">{errors.preparation_time.message}</div>}

      <select placeholder="Dish" {...register("type", {required: errorMsg.req, onChange: (e) => onDishTypeChange(e.target.value)})}>
        <option selected disabled hidden>Dish type...</option>
        <option value="Pizza">Pizza</option>
        <option value="Soup">Soup</option>
        <option value="Sandwich">Sandwich</option>
      </select>

      {returnOptions()}

      <input type="submit" />

    </form>
  );
}