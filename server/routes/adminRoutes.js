import express from "express";

import {
createAdmin,
getAdmins,
updateAdmin,
deleteAdmin
} from "../controllers/adminController.js";


const router = express.Router();



// Create Admin
router.post(
"/create",
createAdmin
);



// Get All Admins
router.get(
"/all",
getAdmins
);



// Update Admin
router.put(
"/:id",
updateAdmin
);



// Delete Admin
router.delete(
"/:id",
deleteAdmin
);



export default router;