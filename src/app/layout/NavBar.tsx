import { Button, Container, MenuItem, Menu } from "semantic-ui-react";
import { useStore } from "../api/stores/store";


export default function NavBar() {

    const {foodStore} = useStore();

    return (
        <Menu inverted fixed="top">
            <Container>
                <MenuItem header>
                    Meals
                </MenuItem>
                <MenuItem>
                    <Button onClick={() => foodStore.openForm()} positive content='Add Food Item'/>
                </MenuItem>
            </Container>
        </Menu>
    )
}