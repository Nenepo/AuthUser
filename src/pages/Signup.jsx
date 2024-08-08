import  { useState } from 'react';
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

  const validateData = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
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



  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSignup} className="bg-bgLightBlue p-6  shadow-md w-auto max-w-sm space-y-4 rounded-xl ">
          <h2 className="text-xl font-semibold text-start text-blue-950">Signup</h2>


          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Signup</button>
          <button type="button" onClick={handleGoogleSignup} className="w-full bg-red-500 text-white p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
          </button>
          <p className='text-blue-500'>Have an account?<Link to="/login" className='text-blue-900'>sign in</Link></p>
        </form>
      )}
    </div>
  );
}

export default Signup;
