import { Router } from 'express';
import bodyParser from 'body-parser';
import { localController } from '../controllers/local.controller.js';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import  verifyToken  from '../middlewares/token.middleware.js'


const router = Router();

const jsonParser = bodyParser.json()
 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets')
},
filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()
    console.log(file.originalname)
    cb(null, `${file.originalname}`)
}
});
const upload = multer({ storage });

// const verifyToken = (req, res, next) => {
//   const token = req.header('auth-token');
//   if (!token) {
//     return res.status(401).json({ error: 'Acceso no autorizado' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'secret');
//     req.user = decoded.sub;
//     next();
//   } catch (error) {
//     // console.log(error);
//     return res.status(401).json({ error: 'Token inválido' });
//   }
// };


/**
 * @openapi
 * '/api/local/createLocal':
 *  post:
 *     tags:
 *     - local
 *     summary: Crea usuario
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - namelocal
 *              - imagen
 *              - genero
 *              - descripcion
 *              - ubicacion
 *              - menu
 *              - userId
 *            properties:
 *              namelocal:
 *                type: string
 *                default: Ciudad Bocado
 *              imagen:
 *                type: string
 *                format: binary                
 *                default: imagen
 *              genero:
 *                type: string
 *                default: luis.cruz@gmail.com
 *              descripcion:
 *                type: string
 *                default: 1234
 *              ubicacion:
 *                type: string
 *                default: Suchiapa, Chis
 *              menu:
 *                type: string
 *                default: 1234
 *              userId:
 *                type: string
 *                default:
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.post('/createLocal',upload.single('imagen'),verifyToken, (req, res) => localController.local_create(req, res));

router.get("/view_img", (req, res) => localController.local_img(req, res));

router.get("/view_ubi_local", (req, res) => localController.view_ubi_local(req, res));


/**
 * @openapi
 * '/api/local/updateLocal':
 *  put:
 *     tags:
 *     - local
 *     summary: actualizar local
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - namelocal
 *              - imagen
 *              - genero
 *              - descripcion
 *              - menu
 *            properties:
 *              namelocal:
 *                type: string
 *                default: Panalito
 *              imagen:
 *                type: string
 *                format: binary                
 *                default: imagen
 *              genero:
 *                type: string
 *                default: luis.cruz@gmail.com
 *              descripcion:
 *                type: string
 *                default: 1234
 *              menu:
 *                type: string
 *                default: 4321
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.put('/updateLocal',upload.single('imagen'), (req, res) => localController.local_update(req, res));

/**
 * @openapi
 * '/api/local/deleteLocal':
 *  delete:
 *     tags:
 *     - local
 *     summary: actualizar local
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - namelocal
 *            properties:
 *              namelocal:
 *                type: string
 *                default: Panalito
 *     responses:
 *      200:
 *        description: delete
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.delete('/deleteLocal',upload.single('imagen'), (req, res) => localController.local_delete(req, res));


/**
 * @openapi
 * '/api/local/viewAll':
 *  get:
 *     tags:
 *     - local
 *     summary: visualizar locales
 *     responses:
 *      200:
 *        description: View
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.get('/viewAll', (req, res) => localController.local_viewAll(req, res));

router.get('/viewUser', (req, res) => localController.local_viewUser(req, res));


export default router;