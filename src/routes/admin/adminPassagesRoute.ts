import { Router } from 'express'
import { findAllPassages, findOnePassages } from '../../controllers/admin/adminPassageController'

const route = Router()

route.get('/', findAllPassages)
route.get('/:id', findOnePassages)


export default route