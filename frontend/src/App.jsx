import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common'
import Context from './context'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'

function App() {
  const dispatch = useDispatch()

  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : "include"
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }

    console.log("data-user" ,dataResponse)
  }
  
  useEffect(()=>{
    /**user Details*/
    fetchUserDetails()
  },[])

  return (
    <>
       <Context.Provider value={{
               fetchUserDetails //user detail fetch
       }}>
       <ToastContainer />
      <Header/>
      <main className='min-h-[calc(100vh-110px)]'>
        <Outlet/>
      </main>
      <Footer/>

      </Context.Provider>
    </>
  )
}

export default App
