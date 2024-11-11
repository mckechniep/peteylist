import ToDo from '../models/toDoModel.js';

export const createToDo = async (req, res) => {
    try {
        //destructure title from req.body, extracts title field from request body which is sent from frontend when user submits a new toDo
        const { title } = req.body;
        //create a new ToDo with title (title provided by user in request body)
        const newToDo = new ToDo({ title });
        //save the newToDo to the database
        await newToDo.save();
        //send the newly created toDo back to user as a JSON response, res.json converts objectd to JSON format
        res.status(201).json(newToDo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating to-do', error});
    }
};

export const getToDos = async (req, res) => {
    try {
        const toDos = await ToDo.find();
        res.json(toDos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching toDos', error});
    }
};


export const deleteToDo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedToDo = await ToDo.findByIdAndDelete(id);
    
        if (!deletedToDo) {
            return res.status(404).json({ message: 'To-do item not found' }); 
        }
    
        res.status(200).json({ message: 'To-do item deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting to-do item', error})
    }
};

export const toggleToDoStatus = async (req, res) => {
    try {
        //destructure id from req.params, extracts id from request params which is sent from frontend when user submits a new toDo
        const { id } = req.params;
        const toDo = await ToDo.findById(id);

        if (!toDo) {
            return res.status(404).json({ message: 'To-do item not found'});
        }
        //toggle the complete status
        toDo.complete = !toDo.complete;
        await toDo.save();
        //respond with the updated toDo item
        res.status(200).json(toDo);
    } catch (error) {
        res.status(500).json({ message: 'Error toggling to-do status', error});
    }
};