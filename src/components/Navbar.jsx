import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios'
import useDataStore from '../DataStore/DataStore'

const Navbar = () => {
    const state = useSelector(state => state.handleCart)
    const {setData} = useDataStore()
    const submitHandler = async (e)=>{
        e.preventDefault();
        if(!e.target.searchInput.value){
            return toast.error("Input dal lawde!!");
        }
        console.log(e.target.searchInput.value);
        const userPreferences = e.target.searchInput.value
        try {
            const resposeData = await axios.post("http://127.0.0.1:5000/recommend", {userPreferences});
            console.log(resposeData.data);
            const productData = JSON.parse(resposeData.data.recommendations.replace("```json","").replace("```","").trim())
            console.log(productData);
            setData(productData);
        } catch (error) {
            console.log(error);
            
            toast.error("Search not for you !!");
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="d-flex justify-content-between w-100">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">E-Section</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="searchbar ">
                        <form class="d-flex" onSubmit={submitHandler} role="search">
                            <input class="form-control me-2" type="search" placeholder="Search for products..." aria-label="Search" name='searchInput'/>
                            <button class="btn btn-outline-primary" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="buttons text-center">
                        <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart </NavLink>
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar