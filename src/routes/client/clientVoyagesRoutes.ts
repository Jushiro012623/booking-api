import { Router } from 'express';
import { findAllVoyages } from '../../controllers/client/clientVoyageController'
import { findOnePassages } from 'src/controllers/admin/adminPassageController';

const route = Router();

route.get('/', findAllVoyages)

export default route