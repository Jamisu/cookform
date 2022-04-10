import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import "./styles.css";

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [dish, updateDish] = useState<string>('');
  const errorMsg = {
    req: 'this field is required',
    num: 'should be grater than zero'
  }

  const onSubmit = handleSubmit((data) => {
    const postData = JSON.stringify(data)

      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: postData
      };
      fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', requestOptions)
          .then(response => response.json())
          .then(ret_data => console.log("returnData", ret_data));
  });

  function returnOptions() {
    const misc = []
    let head = <h2>
                  {dish} Specs
                </h2>

    if(dish === 'sandwich') {
      misc.push(head)
      misc.push(<div>
        <input type="number" placeholder="slices_of_bread" {...register("slices_of_bread", {valueAsNumber: true, required: errorMsg.req})} />
      {errors.slices_of_bread && <div className="error">{errors.slices_of_bread.message}</div>}
      </div>)

    } else if (dish === 'pizza') {
      misc.push(head)
      misc.push(<div>
          <input type="number" placeholder="no_of_slices" {...register("no_of_slices", {valueAsNumber: true, required: errorMsg.req})} />
      {errors.no_of_slices && <div className="error">{errors.no_of_slices.message}</div>}
          <input type="number" placeholder="diameter" {...register("diameter", {valueAsNumber: true, required: errorMsg.req})} />
      {errors.diameter && <div className="error">{errors.diameter.message}</div>}
        </div>)
      
    } else if (dish === 'soup'){
      misc.push(head)
      misc.push(<div>
          <input type="number" placeholder="spiciness_scale" {...register("spiciness_scale", {valueAsNumber: true, required: errorMsg.req})} />
          {errors.spiciness_scale && <div className="error">{errors.name.message}</div>}
        </div>)
    } else {
      return (null)
    }
    return misc
  }

  function onDishTypeChange(targetValue:string) {
    updateDish(targetValue);
  }
  
  return (    
    <form onSubmit={onSubmit}>
      <h1>
        Cook Form
      </h1>
      <input type="text" placeholder="name" {...register("name", {required: errorMsg.req})} />
      {errors.name && <div className="error">{errors.name.message}</div>}

      <input type="time" step="1" placeholder="preparation_time" {...register("preparation_time", {required: errorMsg.req})} />
      {errors.preparation_time && <div className="error">{errors.preparation_time.message}</div>}

      <select placeholder="Dish" {...register("type", {required: errorMsg.req, onChange: (e) => onDishTypeChange(e.target.value)})}>
        <option selected disabled hidden>Dish type...</option>
        <option value="pizza">Pizza</option>
        <option value="soup">Soup</option>
        <option value="sandwich">Sandwich</option>
      </select>

      {returnOptions()}

      <input type="submit" />

    </form>
  );
}