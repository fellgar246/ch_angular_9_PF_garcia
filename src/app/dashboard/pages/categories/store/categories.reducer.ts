import { createFeature, createReducer, on } from '@ngrx/store';
import { CategoriesActions } from './categories.actions';
import { Category } from '../models';

const CATEGORIES_MOCK: Category[] = [
  {
    "name": "Frontend",
    "description": "lorem ipsum",
    "id": 1
  },
  {
    "id": 2,
    "name": "Backend",
    "description": "lorem ipsum"
  },
  {
    "id": 3,
    "name": "Bases de Datos",
    "description": "lorem ipsum"
  }
]


export const categoriesFeatureKey = 'categories';

export interface State {
  categories: Category[],
  categoryDetail: Category | null
}

export const initialState: State = {
  categories: [],
  categoryDetail: null
};

export const reducer = createReducer(
  initialState,
  on(CategoriesActions.loadCategories, state => {
    return {
      ...state,
      categories: CATEGORIES_MOCK,
    }
  }),

  on(CategoriesActions.loadCategoryDetail, (state, action) => {
    return {
      ...state,
      categoryDetail: CATEGORIES_MOCK.find((c) => c.id == action.category) || null,
    }
  })
);

export const categoriesFeature = createFeature({
  name: categoriesFeatureKey,
  reducer,
});

