import { Item, ItemDescription, ItemHeader, TableRow, TableCell, Table, TableHeaderCell, Button, ButtonGroup, Segment } from "semantic-ui-react";
import { useStore } from "../api/stores/store";
import LoadingComponent from "./LoadingComponent";

export default function FoodDetails() {
    const {foodStore} = useStore();
    const {selectedFood: food} = foodStore;

    if (!food) return <LoadingComponent />;

    return (
        <Segment>
        <Item.Group >
            <Item>
                <Item.Content>
                    <ItemHeader as='a'>
                        {food.Name} - {food.Grams} Grams
                    </ItemHeader>
                    <ItemDescription>
                        <Table celled padded collapsing >
                            <TableRow >
                                <TableHeaderCell>Calories</TableHeaderCell>
                                <TableHeaderCell>Fat</TableHeaderCell>
                                <TableHeaderCell>Protein</TableHeaderCell>
                                <TableHeaderCell>Carbohydrate</TableHeaderCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{food.Calories}</TableCell>
                                <TableCell>{food.Fat}g</TableCell>
                                <TableCell>{food.Protein}g</TableCell>
                                <TableCell>{food.Carbohydrate}g</TableCell>
                            </TableRow>
                        </Table>
                        <ButtonGroup>
                        <Button onClick={() => foodStore.openForm(food.id)} basic content='Edit' color="blue"/>
                        <Button onClick={foodStore.cancelSelectedFood} basic content='Cancel' color="grey" />
                        </ButtonGroup>
                    </ItemDescription>
                </Item.Content>
            </Item>
        </Item.Group>
        </Segment>
    )

}