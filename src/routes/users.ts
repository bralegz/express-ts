import { Router } from "express";
import { createUser, getUserById, getUsers } from "../handlers/users";

const router = Router();

// api/users

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

export default router;