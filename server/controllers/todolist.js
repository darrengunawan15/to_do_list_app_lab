import TodolistModel from "../models/todolistModel.js";

// create to-do
export const createTodo = async (req, res) => {
    try {
        // Ensure that the user is authenticated
        const userId = req.user.id; // From the auth middleware

        const { todo_image, todo_name, todo_desc, todo_status } = req.body;

        if (!todo_image || !todo_name || !todo_desc || !todo_status) {
            return res.status(400).json({ message: "Please fill in the required fields." });
        }

        const newTodo = await TodolistModel.create({
            userId, // Associate the todo with the user
            todo_image,
            todo_name,
            todo_desc,
            todo_status,
        });

        res.status(200).json({ message: "Create a to-do list successfully!", newTodo });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// get all to-dos
export const getAllTodos = async (req, res) => {
    try {
        // Get user ID from auth middleware
        const userId = req.user.id;
        
        // Get todos only for the logged-in user
        const todos = await TodolistModel.find({ userId });
        res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update to-do
export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { todo_image, todo_name, todo_desc, todo_status } = req.body;

        const updateData = {
            todo_image,
            todo_name,
            todo_desc,
            todo_status,
        };

        // Find the todo and check ownership
        const todo = await TodolistModel.findOne({ _id: id, userId });
        if (!todo) {
            return res.status(404).json({ message: "To-do not found or you don't have permission to update it." });
        }

        const updatedTodo = await TodolistModel.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({ message: "To-do updated successfully!", updatedTodo });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete to-do
export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Find the todo and check ownership
        const todo = await TodolistModel.findOne({ _id: id, userId });
        if (!todo) {
            return res.status(404).json({ message: "To-do not found or you don't have permission to delete it." });
        }

        const deletedTodo = await TodolistModel.findByIdAndDelete(id);
        res.status(200).json({ message: "To-do deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};