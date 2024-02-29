import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import FoodDashboard from './FoodDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../api/stores/store';
import { observer } from 'mobx-react-lite';

function App()
{
  const {foodStore} = useStore();

  useEffect(() =>
  {
    foodStore.loadFoods();
  }, [foodStore]);

    if (foodStore.loadingInitial) return <LoadingComponent content='Loading App' />

    return (
      <>
        <NavBar />
        <Container style={{ marginTop: '7em' }}>
          <FoodDashboard />
        </Container>
      </>

    )
}


export default observer(App);
