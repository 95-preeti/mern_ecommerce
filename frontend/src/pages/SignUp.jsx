import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { Link } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';

function SignUp() {
    const [data,setData] =useState({
        email: "",
        password : "",
        name : "",
        confirmPassword: "",
        profilePic: "",
    })
      
    const handleOnChange = (e) => {
        const {name, value } = e.target

        setData((preve)=>{
            return{
                 ...preve,
                 [name] : value
            }
        })
    }
 
    const handleUploadPic = async(e) => {
      const file = e.target.files[0]

      const imagePic = await imageTobase64(file)
      console.log("imagePic",imagePic)
      setData((preve) =>{
        return{
            ...preve,
            profilePic : imagePic
        }
      })

    }

    const handleSubmit = (e) =>{
        e.preventDefault()
    }

    console.log("data login",data)

  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>
              
              <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-md'>
                  <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full '>
                    <div>
                    <img src={data.profilePic || loginIcons} alt="login icons" />
                    </div>
                    <form>
                      <label>
                      <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                        Upload Photo
                        </div>
                        <input type='file' className='hidden' onChange={handleUploadPic}/>
                      </label>
                       
                    </form>
                  </div>
                   
                   <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                   <div className='grid'>
                        <label>Name : </label>
                        <div className='bg-slate-200 p-2'>
                            <input 
                            type="text" 
                            placeholder='enter your name' 
                            name="name"
                            value={data.name}
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>
                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-200 p-2'>
                            <input 
                            type="email" 
                            placeholder='enter email' 
                            name="email"
                            value={data.email}
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>
                    <div>
                        <label>Password : </label>
                        <div className='bg-slate-200 p-2 flex'>
                            <input 
                            type="password" 
                            placeholder='enter password' 
                            value={data.password}
                            name="password"
                            onChange={handleOnChange}
                            required 
                            className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>

                    <div>
                        <label>Confirm Password : </label>
                        <div className='bg-slate-200 p-2 flex'>
                            <input 
                            type= "password" 
                            placeholder='enter confirm password' 
                            value={data.confirmPassword}
                            name="confirmPassword"
                            onChange={handleOnChange} 
                            required
                            className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>

                    <button className='bg-red-800 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
                   </form>

                     <p className='my-5'>Already have account ? <Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>


              </div>


        </div>
    </section>
  )
}

export default SignUp