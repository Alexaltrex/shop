import {Action, applyMiddleware, combineReducers, createStore, Middleware} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {categoryReducer} from "./reducers/category.reducer";
import {appReducer} from "./reducers/app.reducer";
import {basketReducer} from "./reducers/busket.reducer";
import {authReducer} from "./reducers/auth.reducer";

const rootReducer = combineReducers({
    category: categoryReducer,
    basket: basketReducer,
    app: appReducer,
    auth: authReducer,
});

const middleware: Array<Middleware> = [thunkMiddleware];
export const store = createStore(
    rootReducer,
    process.env.NODE_ENV === 'development'
        ? composeWithDevTools(applyMiddleware(...middleware))
        : applyMiddleware(...middleware)
);

//================ TYPE =======================
export type StateType = ReturnType<typeof rootReducer>
export type GetActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, StateType, unknown, A>
