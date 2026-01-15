import express from 'express'
import movieImages from '../uploads/movieImages.js'
import {getAllData, getDataById, createNewData, updateDataById, deleteDataById} from '../controller/crudControllers.js'
const route = express.Router()


//Create fields with images(Middleware)
route.post('/create',movieImages.single('Poster'), createNewData)
//Read
route.get('/', getAllData)
route.get('/read/:id', getDataById)
//Update fields with images(Middleware)
route.put('/update/:id',movieImages.single('Poster'), updateDataById)
//Delete
route.delete('/delete/:id', deleteDataById)


export default route