import { Router } from 'express';
import { z } from 'zod';
import { registerHandler, loginHandler, getMeHandler } from './auth.controller';
import { validateBody } from '../../middleware/requestValidator';
import { authenticateJWT } from '../../middleware/auth';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

router.post('/register', validateBody(registerSchema), registerHandler);
router.post('/login', validateBody(loginSchema), loginHandler);
router.get('/me', authenticateJWT, getMeHandler);

export default router;
