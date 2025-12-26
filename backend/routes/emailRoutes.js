import express from 'express';
import { sendWelcomeEmail } from '../controllers/emailController.js';

const router = express.Router();

// POST /api/email/welcome
router.post('/welcome', sendWelcomeEmail);

export default router;