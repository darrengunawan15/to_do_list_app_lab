import express from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todolist.js";
import { auth } from "../middleware/auth.js"; 

const router = express.Router()

/**
 * @openapi
 * /get_all:
 *   get:
 *     tags:
 *       - Todo
 *     summary: Get all todo list for the logged-in user (requires auth)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *       '403':
 *         description: Requested resource is forbidden
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.get("/get_all", auth, getAllTodos)

/**
 * @openapi
 * /add_todo:
 *   post:
 *     tags:
 *       - Todo
 *     summary: Add a new todo list (requires auth)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       '200':
 *         description: Add todo successfully
 *       '403':
 *         description: Unauthorized - token missing or invalid
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/add_todo", auth, createTodo)

/**
 * @openapi
 * /update_todo/{id}:
 *   patch:
 *     tags:
 *       - Todo
 *     summary: Update todo list (requires auth)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: todo ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       '200':
 *         description: Todo list updated
 *       '403':
 *         description: Unauthorized - token missing or invalid
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal server error
 */
router.patch("/update_todo/:id", auth, updateTodo)

/**
 * @openapi
 * /delete_todo/{id}:
 *   delete:
 *     tags:
 *       - Todo
 *     summary: Delete a todo (requires auth)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Todo ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Todo deleted
 *       '403':
 *         description: Unauthorized - token missing or invalid
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal server error
 */
router.delete("/delete_todo/:id", auth, deleteTodo)

export default router