import { Action } from '@ngrx/store';
import * as ShoppingListActions from './shopping-list.action';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';

export interface AppState {
  shoppingList: State
}

const initialState = {
	ingredients: [
	    new Ingredient('Apples', 5),
    	new Ingredient('Tomatoes', 10),
	]
};

export interface State {
  ingredients: Ingredient[];
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions){
	switch(action.type) {
		case ShoppingListActions.ADD_INGREDIENT:
			return {
				...state,
				ingredients: [...state.ingredients, action.payload]
			}	
		case ShoppingListActions.ADD_INGREDIENTS:
			return {
				...state,
				ingredients: [...state.ingredients, ...action.payload]
			}

		case ShoppingListActions.UPDATE_INGREDIENT:
			const ingredient = state.ingredients[action.payload.index];
			const updateIngredient = {
				...ingredient,
				...action.payload.ingredient
			};
			const ingredients = [...state.ingredients];
			return {
				...state,
				ingredients: ingredients
			};

		case ShoppingListActions.DELETE_INGREDIENT:
			const oldIngredients = [...state.ingredients];
			oldIngredients.splice(action.payload,1);
			return {
				...state,
				ingredients: oldIngredients
			}
		default:
			return state;
	}
	
}