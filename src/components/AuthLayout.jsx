// components/AuthLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../components/Header'

const AuthLayout = () => {
  console.log('AuthLayout rendered');

  return (
    <section className="w-full h-full  px-14 bg-bgDarkBlue">
      <Header />
      <div className='space-x-16 lg:flex'>
        <div className='w-full lg:w-[35%]'>
          <Outlet />
        </div>
        <div className='hidden md:flex lg:w-[65%] relative'>
          <img src="./src/assets/Group 237656.png" alt="" className='w-[250px] h-[100px] absolute top-80 z-10'/>
          <img src="./src/assets/image-uM5ZOTW7R-transformed 2.png" alt="" className='bottom-0 absolute'/>

          <img src="./src/assets/Group 237655.png" alt="" className='w-[100px] h-[80px] absolute right-0 top-60'/>

        </div>
      </div>

    </section>
  );
}

export default AuthLayout;
