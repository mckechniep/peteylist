import express from 'express';

const router = express.Router();

import { createToDo, getToDos, deleteToDo, toggleToDoStatus} from '../controllers/toDoController.js';


//routes for todos
router.get('/todos', getToDos);
router.post('/todo/new', createToDo);
router.delete('/todo/delete/:id', deleteToDo);
router.patch('/todo/toggleStatus/:id', toggleToDoStatus);

export default router;

