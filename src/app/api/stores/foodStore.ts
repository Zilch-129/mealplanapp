import { makeAutoObservable, runInAction } from "mobx"
import { Food } from "../../../models/Food"
import agent from "../agent";
import { v4 as uuid} from 'uuid'

export default class FoodStore
{
    foods: Food[] = [];
    foodRegistry = new Map<string, Food>();
    selectedFood: Food | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor()
    {
        makeAutoObservable(this)
    }

    loadFoods = async () =>
    {
        try {
            const foods = await agent.Foods.list();
            foods.forEach(food => {
                this.foodRegistry.set(food.id, food);
                this.foods = foods
            })
            this.setLoadingInitial(false);
        }
        catch (error)
        {
            console.log(error)
            {
                this.setLoadingInitial(false);
            }
        }
    }

    setLoadingInitial = (state: boolean) =>
    {
        this.loadingInitial = state;
    }

    selectFood = (id: string) => {
        this.selectedFood = this.foodRegistry.get(id);
    }

    cancelSelectedFood = () => {
        this.selectedFood = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectFood(id) : this.cancelSelectedFood();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createFood = async (food: Food) => {
        this.loading = true;
        food.id = uuid();
        try {
            await agent.Foods.create(food);
            runInAction(() => {
                this.foodRegistry.set(food.id, food);
                this.selectedFood = food;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateFood = async (food: Food) => {
        this.loading = true;
        try {
            await agent.Foods.update(food);
            runInAction(() => {
                this.foodRegistry.set(food.id, food);
                this.selectedFood = food;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteFood = async (id: string) => {
        this.loading = true;
        try {
            await agent.Foods.delete(id);
            runInAction(() => {
                this.foodRegistry.delete(id);
                if(this.selectedFood?.id === id) this.cancelSelectedFood();
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}

