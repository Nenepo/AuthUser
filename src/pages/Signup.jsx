import { useState } from 'react';
import { auth, provider, db } from '../services/config';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import User from '../models/User';
import { handleFirebaseError } from '../utils/errorHandler';
import { Link, useNavigate } from 'react-router-dom';


function Signup() {
 const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    confirmPassword: '',
    password: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateData = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      setError("Invalid email address");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.confirmPassword !== formData.password) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };


  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
   validateData()

    if (!validateData()) {
      setLoading(false);
      return;
    }

    try {
      // Ensure formData values are correctly logged
      console.log('FormData:', formData);

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = new User(userCredential.user.uid, formData.email, formData.username);

      // Log user object before writing to Firebase
      console.log('User:', user);

      // Write user data to Firebase Realtime Database
      await set(ref(db, `users/${user.uid}`), {
        uid: user.uid,
        email: user.email,
        username: user.username, // Ensure correct field here
      });
      navigate("/login")
      console.log('User created:', user);
    } catch (error) {
      handleFirebaseError(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          username: user.username,
        });
      }
      console.log('User signed up:', user);
    } catch (error) {
      handleFirebaseError(error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignup = () => {

  }
  const handleFacebookSignup = () => {

  }
  return (
    <div className=" flex items-center justify-center pb-20">
     
        <form onSubmit={handleSignup} className="bg-bgLightBlue p-8  shadow-md w-auto max-w-sm  rounded-xl ">
          <h2 className="text-xl font-semibold text-start text-blue-950">Signup</h2>
          <p className='text-red-500'>{error}</p>
          <div className='space-y-2 mt-4'>
            <div>
              <label htmlFor="username" className="text-sm text-start text-blue-950">Username</label>
              <input
                type="text"
                id='username'
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-full p-2 border rounded text-sm outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-start text-blue-950">Email</label>

              <input
                type="email"
                id='email'

                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="abcd@email.com"
                className="w-full p-2 border rounded outline-none  text-sm"
                required
              />
            </div>
            <div className='relative'>
              <label htmlFor="password" className="text-sm text-start text-blue-950">Password</label>

              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id='password'

                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full p-2 border rounded text-sm outline-none"
                required
              />
              <button type="button" onClick={togglePassword} className="absolute top-6 inset-y-0 right-0 flex items-center px-2 ">
                {showPassword ? <img className="h-3 w-3" src="/assets/eye-icon-open.png" alt="show-password" /> : <img className="h-3 w-3" src="/assets/eye-icon-closed.png" alt="close-password" />}
              </button>
            </div>

            <div className='relative'>
              <label htmlFor="confirmPassword" className="text-sm text-start text-blue-950">Confirm Password</label>

              <input
                type={showPassword ? 'text' : 'password'}
                id='confirmPassword'

                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="w-full p-2 border rounded text-sm outline-none placeholder:text-sm "
                required
              />
              <button type="button" onClick={togglePassword} className="absolute inset-y-0 top-6 right-0 flex items-center px-2">
                {showPassword ? <img className="h-3 w-3" src="/assets/eye-icon-open.png" alt="show-password" /> : <img className="h-3 w-3" src="/assets/eye-icon-closed.png" alt="close-password" />}
              </button>
            </div>

          </div>
          <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded font-semibold mt-8">Sign up</button>
          <div className='flex justify-between mt-6 mb-6'>
            <button type="button" onClick={handleGoogleSignup} className=" bg-slate-200 text-white py-2 px-6 rounded-full transition-colors duration-500 hover:bg-slate-300">
              <img src="/assets/flat-color-icons_google.png" alt="google" className='w-3 h-3' />
            </button>
            <button type="button" onClick={handleGithubSignup} className=" bg-slate-200 text-white py-2 px-6 rounded-full transition-colors duration-500 hover:bg-slate-300">
              <img src="/assets/akar-icons_github-fill.png" alt="google" className='w-3 h-3' />
            </button>
            <button type="button" onClick={handleFacebookSignup} className=" bg-slate-200 text-white py-2 px-6 rounded-full transition-colors duration-500 hover:bg-slate-300">
              <img src="/assets/bi_facebook.png" alt="google" className='w-3 h-3' />
            </button>
          </div>

          <p className='text-blue-500 text-center text-sm '>Have an account?<Link to="/login" className='text-blue-900 transition-colors duration-500 hover:text-slate-800'> sign in</Link></p>
        </form>
     
    </div>
  );
}

export default Signup;
