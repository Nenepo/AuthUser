import { useState } from 'react';
import { auth, provider } from '../services/config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { handleFirebaseError } from '../utils/errorHandler';
import { Link } from 'react-router-dom';

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User logged in successfully');
      // Redirect or handle post-login logic here
    } catch (error) {
      handleFirebaseError(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User logged in with Google:', user);
      // Redirect or handle post-login logic here
    } catch (error) {
      handleFirebaseError(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full   flex items-center justify-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleLogin} className="rounded-[40px] p-6 bg-bgLightBlue shadow-xl w-full max-w-sm space-y-4">
          <h2 className="text-xl font-semibold">Login</h2>
          {error && <p className="text-red-500">{error}</p>}
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
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
          <p className='text-blue-500'>or continue with</p>
          <div>
            <button type="button" onClick={handleGoogleLogin} className="w-full bg-red-500 text-white p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
            </button>
          </div>

          <p className='text-blue-500'>Don't have an account?<Link to="/signup" className='text-blue-900'>Register for free</Link></p>
        </form>
      )}
    </div>
  );
}

export default Login;
