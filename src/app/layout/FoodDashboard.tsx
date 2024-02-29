import { Grid, GridColumn } from "semantic-ui-react";
import FoodDataTable from "./FoodDataTable";
import FoodDetails from "./FoodDetails";
import FoodForm from "./FoodForm";
import { useStore } from "../api/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function FoodDashboard()
{
    const {foodStore} = useStore();
    const {selectedFood, editMode} = foodStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <FoodDataTable />
            </Grid.Column>
            <GridColumn fluid="true" width={6}>
                {selectedFood && !editMode &&
                    <FoodDetails />}
                {editMode && 
                    <FoodForm />}
            </GridColumn>
        </Grid>
    )
})