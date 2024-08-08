import { useState } from 'react';
import { auth, provider, db } from '../services/config';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import User from '../models/User';
import { handleFirebaseError } from '../utils/errorHandler';
import { Link } from 'react-router-dom';


function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    confirmPassword: '',
    password: '',
    email: ''
  });
  console.log(formData)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateData = (name, value) => {
    if (name === "email" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      setError("Invalid email address");
    } else if (name === "password" && value.length < 6) {
      setError("Password must be at least 6 characters long");
    } else if (name === "confirmPassword" && value !== formInput.password) {
      setError("Passwords do not match");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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

      // Validate the username
      if (!user.username) {
        setError('Username cannot be empty');
        setLoading(false);
        return;
      }

      // Log user object before writing to Firebase
      console.log('User:', user);

      // Write user data to Firebase Realtime Database
      await set(ref(db, `users/${user.uid}`), {
        uid: user.uid,
        email: user.email,
        username: user.username, // Ensure correct field here
      });

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
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSignup} className="bg-bgLightBlue p-6  shadow-md w-auto max-w-sm  rounded-xl ">
          <h2 className="text-xl font-semibold text-start text-blue-950">Signup</h2>
          <div className='space-y-2 mt-4'>
            <div>
              <label htmlFor="username" className="text-sm text-start text-blue-950">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-start text-blue-950">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="abcd@email.com"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-start text-blue-950">Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-sm text-start text-blue-950">Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="w-full p-2 border rounded placeholder:text-sm "
                required
              />
            </div>

          </div>
          <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded font-semibold mt-8">Sign up</button>
          <div className='flex justify-between mt-6 mb-6'>
            <button type="button" onClick={handleGoogleSignup} className=" bg-slate-200 text-white py-2 px-6 rounded-full ">
              <img src="../src/assets/flat-color-icons_google.png" alt="google" className='w-3 h-3' />
            </button>
            <button type="button" onClick={handleGithubSignup} className=" bg-slate-200 text-white py-2 px-6 rounded-full ">
              <img src="../src/assets/akar-icons_github-fill.png" alt="google" className='w-3 h-3' />
            </button>
            <button type="button" onClick={handleFacebookSignup} className=" bg-slate-200 text-white py-2 px-6 rounded-full ">
              <img src="../src/assets/bi_facebook.png" alt="google" className='w-3 h-3' />
            </button>
          </div>

          <p className='text-blue-500 text-center text-sm '>Have an account?<Link to="/login" className='text-blue-900'>sign in</Link></p>
        </form>
      )}
    </div>
  );
}

export default Signup;
