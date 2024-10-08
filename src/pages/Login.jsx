import { useCallback, useState } from 'react';
import { auth, provider } from '../services/config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { handleFirebaseError } from '../utils/errorHandler';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
 const navigate = useNavigate();

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    // setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User logged in successfully');
      navigate("/welcome")


      // Redirect or handle post-login logic here
    } catch (error) {
    const customErrorMessage =  handleFirebaseError(error);
      setError(customErrorMessage);
    } finally {
      // setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User logged in with Google:', user);

      navigate("/welcome")
      // Redirect or handle post-login logic here
    } catch (error) {
      handleFirebaseError(error);
      setError(error.message);
    } finally {
      // setLoading(false);
    }
  };
  const handleGithubLogin = () => {

  }
  const handleFacebookLogin = () => {

  }
  
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className=" w-full    flex items-center justify-center pb-40 mt-24">
  
        <form onSubmit={handleLogin} className="rounded-[40px] p-6 bg-bgLightBlue shadow-xl w-full max-w-sm ">
          <h2 className="text-xl font-semibold text-start text-blue-950">Login</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className='space-y-2 mt-4'>
            <div >
              <label htmlFor="email" className="text-sm text-start text-blue-950">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="abcd@email.com"
                className="w-full p-2 border rounded text-sm outline-none  placeholder:text-sm"
                required
              />
            </div>
            <div className='relative'>
              <label htmlFor="password" className="text-sm text-start text-blue-950">Password</label>

              <input
               type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full p-2 border rounded text-sm outline-none  placeholder:text-sm"
                required
              />
               <button type="button" onClick={togglePassword} className="absolute top-6 inset-y-0 right-0 flex items-center px-2">
                {showPassword ? <img className="h-3 w-3" src="/assets/eye-icon-open.png" alt="show-password" /> : <img className="h-3 w-3" src="/assets/eye-icon-closed.png" alt="close-password" />}
              </button>
            </div>

          </div>
          <div className='mt-4'>
            <a href="#" className="text-sm text-start text-blue-950 ">Forgot password?</a>
          </div>

          <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded font-semibold mt-4">Login</button>
          <p className='text-blue-500 mt-4'>or continue with</p>
          <div className='flex justify-between mt-6 mb-6'>
            <button type="button" onClick={handleGoogleLogin} className=" bg-slate-200 text-white py-2 px-6 rounded-full transition-colors duration-500 hover:bg-slate-300">
              <img src="/assets/flat-color-icons_google.png" alt="google" className='w-3 h-3' />
            </button>
            <button type="button" onClick={handleGithubLogin} className=" bg-slate-200 text-white py-2 px-6 rounded-full transition-colors duration-500 hover:bg-slate-300">
              <img src="/assets/akar-icons_github-fill.png" alt="google" className='w-3 h-3' />
            </button>
            <button type="button" onClick={handleFacebookLogin} className=" bg-slate-200 text-white py-2 px-6 rounded-full transition-colors duration-500 hover:bg-slate-300">
              <img src="/assets/bi_facebook.png" alt="google" className='w-3 h-3' />
            </button>
          </div>

          <p className='text-blue-500 text-center text-sm '>Don't have an account? <Link to="/signup" className='text-blue-900 transition-colors duration-500 hover:text-slate-800'>Register for free</Link></p>
        </form>
   
    </div>
  );
}

export default Login;
