import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import {verifyAdmin} from "../utils/verifyToken.js"


const router=express.Router();

//create
router.post("/:hotelid", verifyAdmin , createRoom);
//delete
router.delete("/:hotelId/:id", verifyAdmin,deleteRoom);

//update
router.put("/:id", verifyAdmin ,updateRoom );
router.put("/availability/:id" ,updateRoomAvailability );

//get
router.get("/:id", getRoom);
//getall
router.get("/", getRooms);

export default router