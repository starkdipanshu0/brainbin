import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { sendEmail } from '../utils/sendEmail';


const generateToken = (id: any): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
};

// Generate OTP
const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// Register User with OTP
export const registerUser = async (req: Request, res: Response) : Promise<Response | any>=> {
    const { username, email, password } = req.body;

    try {
        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

        // Create user with OTP
        const user = await User.create({ username, email, password, otp, otpExpires });

        // Send OTP to email
        await sendEmail(
            email,
            'Verify Your Email',
            `Your OTP for email verification is: ${otp}. It is valid for 10 minutes.`
        );

        res.status(201).json({ message: 'User registered. Verify your email to continue.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Verify OTP
export const verifyOTP = async (req: Request, res: Response) : Promise<Response | any>=> {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpires! < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Clear OTP fields and activate user
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully', token: generateToken(user._id) });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Request OTP for Password Reset
export const requestPasswordReset = async (req: Request, res: Response) : Promise<Response | any>=> {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // Send OTP to email
        await sendEmail(
            email,
            'Reset Your Password',
            `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`
        );

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Reset Password
export const resetPassword = async (req: Request, res: Response): Promise<Response | any> => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpires! < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Update password and clear OTP fields
        user.password = newPassword;
        user.otp = undefined;
        user.otpExpires
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

