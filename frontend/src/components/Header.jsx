import React from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast} from 'react-toastify'
import { setUserDetails } from '../store/userSlice';

function Header() {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()

  console.log("user header",user)

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch( setUserDetails(null))
    }

    if(data.error){
      toast.error(data.message)
    }
  }
  return (
    <header className='h-16 shadow-md bg-white'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
             <Logo w={100} h={70}/>
          </Link>
        </div>

        <div className=' hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='search product here...' className='w-full outline-none '/>
          <div className='text-lg min-w-[50px] h-8 bg-red-800 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch/>
          </div>
        </div>

        <div className=' flex items-center gap-7'>

          <div className='relative group flex justify-center'>
          <div className='text-3xl cursor-pointer relative flex justify-center'>
            {
              user?.profilePic ? (
                <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>
              ) : (
                <FaRegCircleUser/>
              )
            }
          </div>

          <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
            pop up
          </div>
          </div>
           
           <div className='text-2xl relative'>
              <span><FaShoppingCart/></span>
              <div className='bg-red-800 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 '>
                <p className='text-sm'>0</p>
              </div> 
           </div>

           <div>
           {
                    user?._id  ? (
                      <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-800 hover:bg-red-700'>Logout</button>
                    )
                    : (
                      <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-800 hover:bg-red-700'>Login</Link>
                    )
                  }
            
           </div>

        </div>
      </div>
    </header>
  )
}

export default Header