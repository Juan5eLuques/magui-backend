import express from "express";
import ServerError from "../helpers/serverError.helper.js";
import worksectionRepository from "../repositories/worksection.repository.js";
import workSectionController from "../controllers/worksection.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";
import Worksection from "../models/worksection.model.js";
import { workSectionMiddleware } from "../middleware/worksection.middleware.js";

/* 

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Solo el Director puede asignar o crear secciones

router.post('/', protect(['director']), (req, res) => {
  res.json(
    { message: "Sección asignada por el Director de forma exitosa."

     });
});

// El Docente puede visualizar y editar su sección correspondiente

router.get('/mis-alumnos', protect(['docente']), (req, res) => {
  res.json({ 
    message: "Muestra cantidad de niños y asistencia de la sección asignada al docente." 
  });
});

module.exports = router;

*/

const worksection_router = express.Router();

worksection_router.post(
  "/",
  authMiddleware,
  workSectionController.post,
); /* workSectionController.create  */

worksection_router.get(
  "/",
  authMiddleware,
  workSectionController.getAllByUserId,
);

/*  
worksection_router.delete('/:worksection_id', authMiddleware, workSectionMiddleware , workSectionController.deletebyId);

worksection_router.put('/:worksection_id', authMiddleware, workSectionMiddleware , workSectionController.updateById)
*/

export default worksection_router;
