import express from 'express';
import { registerUser, verifyOTP, requestPasswordReset, resetPassword } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser); // Register and send OTP
router.post('/verify-otp', verifyOTP); // Verify OTP for registration
router.post('/request-password-reset', requestPasswordReset); // Request OTP for password reset
router.post('/reset-password', resetPassword); // Reset password with OTP

export default router;
