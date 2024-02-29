import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useState } from "react";
import { useStore } from "../api/stores/store";
import { observer } from "mobx-react-lite";



export default observer(function FoodForm()
{
  const {foodStore} = useStore();
  const {selectedFood, closeForm, createFood, updateFood, loading}  = foodStore;

  const initialState = selectedFood ?? {
    id: '',
    Name: '',
    Grams: '',
    Calories: '',
    Fat: '',
    Protein: '',
    Carbohydrate: '',
  }
  const [food, setFood] = useState(initialState);

  function handleSubmit()
  {
    food.id ? updateFood(food) : createFood(food);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>)
  {
    const { name, value } = event.target;
    setFood({ ...food, [name]: value })
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input label="Name" value={food.Name} name='Name' onChange={handleInputChange} />
        <Form.Input label='Grams' value={food.Grams} name='Grams' onChange={handleInputChange} />
        <Form.Input label='Calories' value={food.Calories} name='Calories' onChange={handleInputChange} />
        <Form.Input label='Fat' value={food.Fat} name='Fat' onChange={handleInputChange} />
        <Form.Input label='Protein' value={food.Protein} name='Protein' onChange={handleInputChange} />
        <Form.Input label='Carbohydrate' value={food.Carbohydrate} name='Carbohydrate' onChange={handleInputChange} />
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button onClick={closeForm} floated="right" type="button" content="Cancel"/>
      </Form>
    </Segment>

  )
})