import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    return res.json({ msg: 'GET carts' });
});

router.post('/', (req, res) => {
    return res.json({ msg: 'POST carts' });
});

router.put('/', (req, res) => {
    return res.json({ msg: 'PUT carts' });
});

router.delete('/', (req, res) => {
    return res.json({ msg: 'DELETE carts' });
});

export default router;