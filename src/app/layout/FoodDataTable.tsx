import { Button, ButtonGroup, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../api/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function FoodDataTable()
{
    const { foodStore } = useStore();
    const { deleteFood, foods: food, loading } = foodStore;
    const [target, setTarget] = useState('');

    function handleFoodDelete(e: SyntheticEvent<HTMLButtonElement>, id: string)
    {
        setTarget(e.currentTarget.name);
        deleteFood(id);
    }

    return (
        <Table celled>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Grams</TableHeaderCell>
                    <TableHeaderCell>Calories</TableHeaderCell>
                    <TableHeaderCell>Fat</TableHeaderCell>
                    <TableHeaderCell>Protein</TableHeaderCell>
                    <TableHeaderCell>Carbohydrate</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Object.entries(food).map(([id, food]) => (
                    <TableRow key={food.id}>
                        <TableCell>{food.Name}</TableCell>
                        <TableCell>{food.Grams}</TableCell>
                        <TableCell>{food.Calories}</TableCell>
                        <TableCell>{food.Fat}g</TableCell>
                        <TableCell>{food.Protein}g</TableCell>
                        <TableCell>{food.Carbohydrate}g</TableCell>
                        <TableCell>
                            <ButtonGroup>
                                <Button onClick={() => foodStore.selectFood(food.id)} content='View' color="blue" />
                                <Button loading={loading && target === food.id} onClick={(e) => handleFoodDelete(e, food.id)} content='Delete' color="red" />
                            </ButtonGroup>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
})