import knex from '../database/connection';
import { Request, Response } from 'express';

class ItemsController {

    async index(req:Request, res:Response){

        const items = await knex('items');
        console.log(items)
        const serializedItems = items.map(item=>{
            return {
                id:item.id,
                title: item.title,
                image_url: `http://192.168.0.15:3333/uploads/${item.image}`
            }
        });
        return res.json(serializedItems);
    
    }
}

export default ItemsController;