import express from 'express'
import supabase from '../supabase';

import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Email, password, and username are required' });
  }

  try {
    // Step 1: Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error || !data.user) {
      return res.status(400).json({ error: error?.message || 'Failed to create user' });
    }

    const userId = data.user.id;

    // Step 2: Create user in Prisma DB
    const user = await prisma.user.create({
      data: {
        id: userId,
        email,
        username,
      },
    });

    res.status(201).json({ user });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;