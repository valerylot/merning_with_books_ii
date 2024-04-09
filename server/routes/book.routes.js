import { Router } from "express";
const router = Router();
import {createBook, getAllBooks, getOneBook, updateOneBook, deleteOneBook} from "../controllers/book.controller.js";

// All routes with the /books path
router.route("/books")
    .get(getAllBooks)
    .post(createBook);
// All routes with the /users/:id path
router.route("/books/:id")
    .get(getOneBook)
    .delete(deleteOneBook)
    .put(updateOneBook);
export default router;