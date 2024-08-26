export function handleFirebaseError(error) {
  const errorCode = error.code;
  let errorMessage = 'An unknown error occurred';

  switch (errorCode) {
    case 'auth/invalid-email':
      errorMessage = 'The email address is invalid.';
      break;
    case 'auth/user-disabled':
      errorMessage = 'The user account has been disabled.';
      break;
    case 'auth/user-not-found':
      errorMessage = 'No user found with this email.';
      break;
    case 'auth/wrong-password':
      errorMessage = 'The password is incorrect.';
      break;
    case 'auth/network-request-failed':
      errorMessage = 'Network error. Please try again later.';
      break;
    // Add other error codes and messages as needed
    default:
      errorMessage = 'your email or password is incorrect. Please try again.';
  }

  return errorMessage;
}
