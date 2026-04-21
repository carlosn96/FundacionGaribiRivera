export const AUTH_ENDPOINTS = {
  login: 'auth/login',
  verifyEmail: 'auth/verify-email',
  verifyCode: 'auth/verify-code',
  register: 'auth/register',
  me: 'auth/me',
  logout: 'auth/logout',
  forgotPassword: 'auth/forgot-password',
  verifyResetCode: 'auth/verify-reset-code',
  resetPassword: 'auth/reset-password',
  generateBridgeToken: 'auth/generate-bridge-token',
} as const;
