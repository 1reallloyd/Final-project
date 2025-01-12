export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (password.length < 6) {
    return {
      isValid: false,
      error: 'Password must be at least 6 characters long'
    };
  }
  
  return { isValid: true };
};