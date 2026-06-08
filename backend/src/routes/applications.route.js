import express from "express";
import  {createApplicationService, 
    getApplicationService, 
    updateApplicationService,
    summaryService}  from "../services/applications.service.js";

const router=express.Router();

router.post("/", createApplicationService);
router.get("/", getApplicationService);
router.put("/:id", updateApplicationService);
router.get("/summary", summaryService);

export default router;

