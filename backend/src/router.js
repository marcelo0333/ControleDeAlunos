import express from 'express';
import { prisma }  from './lib/db.js';

const router = express.Router();

router.get('/',  async (req, res) => {
    prisma.user.findMany()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'An error occurred while fetching users.' });
        });
});

export default router;