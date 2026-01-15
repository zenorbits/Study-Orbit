import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMode } from '../redux/features/toggleThemeSlice'


const ParentAuthPage = () => {
    const selector = useSelector((state) => state.toggleTheme.value);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(selector=== 'Dark'){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }
    },[selector])
    
    return (
        <div>
            <button
                onClick={() => {
                    dispatch(toggleMode())
                    console.log(selector)
                }}
                className="absolute top-4 right-4 px-4 py-2 rounded-lg dark:bg-emerald-400 dark:hover:bg-emerald-500  bg-sky-500 text-white font-semibold hover:bg-sky-600 transition duration-200"
            >
                {selector === 'Dark' ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
            </button>

            <Routes>
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </div>
    )
}

export default ParentAuthPage