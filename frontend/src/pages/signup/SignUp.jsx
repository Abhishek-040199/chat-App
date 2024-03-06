import React from 'react'
import GenderCheckbox from './GenderCheckbox'

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Signup
          <span className='text-blue-500'> ChatApp</span>
        </h1>
        <form>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-300'>FullName</span>
            </label>
            <input type='text' placeholder='Enter Full Name' className='w-full input input-bordered h-10 bg-slate-200'/>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-300'>Username</span>
            </label>
            <input type='text' placeholder='Enter Username' className='w-full input input-bordered h-10 bg-slate-200'/>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-300'>Password</span>
            </label>
            <input type='text' placeholder='Enter Password' className='w-full input input-bordered h-10 bg-slate-200'/>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-300'>Confirm Password</span>
            </label>
            <input type='text' placeholder='Confirm Password' className='w-full input input-bordered h-10 bg-slate-200'/>
          </div>
          {/* Input Gender Component */}
          <GenderCheckbox />
          <a href='#' className='text-sm text-gray-400 hover:underline hover:text-blue-400 mt-2 inline-block '>Already have an account?</a>
          <div className='flex flex-col items-center justify-center'>
              <button className='btn btn-block btn-sl mt-2 bg-sky-900 text-slate-50 border-none hover:bg-sky-700' >Signup</button>
 					</div>
        </form>
      </div>
    </div>
  )
}

export default SignUp