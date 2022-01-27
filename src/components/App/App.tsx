import React from 'react';
import style from './app.module.scss';
import {Header} from "./Header/Header";
import {Route, Routes} from "react-router-dom";
import {Home} from "./Home/Home";
import {ProductPage} from "./ProductPage/ProductPage";
import {ProductsByCategory} from "./ProductsByCategory/ProductsByCategory";
import {ProductsPage} from "./ProductsPage/ProductsPage";
import {ProductsBySearch} from "./ProductsBySearch/ProductsBySearch";
import {RegistrationPage} from "./RegistrationPage/RegistrationPage";
import {LoginPage} from "./LoginPage/LoginPage";
import {AdminPage} from "./AdminPage/AdminPage";

class User {
    name: string = "Alex"
    private _age: number
    constructor(name: string, age: number) {
        this.name = name;
        this._age = age;
    }
    protected color: string = "white"
    set age(value: number) {
       if ( value <=0 ) {
           this._age = 1
       } else {
           this._age = value
       }
    }
}
const user = new User("Altrex", 33);
user.name = "Dimon";
user.age = 30;

console.log(user)

class Person extends User {
    getAge() {
        console.log(this.color)
    }
}


export const App = () => {
    return (
        <div className={style.app}>
            <Header/>
            <main className={style.main}>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/registration' element={<RegistrationPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/admin' element={<AdminPage/>}/>
                    <Route path='/products' element={<ProductsPage/>}>
                        <Route path='category' element={<ProductsByCategory/>}/>
                        <Route path='search' element={<ProductsBySearch/>}/>
                    </Route>

                    <Route path='/product' element={<ProductPage/>}/>
                </Routes>
            </main>
        </div>
    );
};

