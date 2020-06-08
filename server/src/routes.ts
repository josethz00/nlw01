import express from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';
import multerConfig from './config/multer';


import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post('/points', upload.single('image'), celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2),
        email: Joi.string().required().email().min(10),
        whatsapp: Joi.string().required().min(6).max(20),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required().min(2),
        uf: Joi.string().required().max(2),
        items: Joi.string().required()
    })
}, {abortEarly:false}
), pointsController.create );


routes.get('/points', pointsController.index );
routes.get('/points/:id', pointsController.show );


export default routes;
