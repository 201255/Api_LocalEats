import { Router } from 'express';
import bodyParser from 'body-parser';
import { loginController } from '../controllers/login.controller.js';

const router = Router();

const jsonParser = bodyParser.json()
 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
 * @openapi
 * '/api/login/login':
 *  post:
 *     tags:
 *     - login
 *     summary: Incio de Sesion
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - pass
 *            properties:
 *              name:
 *                type: string
 *                default: luisCrGo
 *              pass:
 *                type: string
 *                default: 1234
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */


router.post('/login', (req, res) =>loginController.user_login(req, res));

/**
 * @openapi
 * '/api/login/create':
 *  post:
 *     tags:
 *     - login
 *     summary: Crea usuario
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - telefono
 *              - email
 *              - pass
 *            properties:
 *              name:
 *                type: string
 *                default: luisCrGo
 *              telefono:
 *                type: string
 *                default: 9612464778
 *              email:
 *                type: string
 *                default: luis.cruz@gmail.com
 *              pass:
 *                type: string
 *                default: 1234
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.post('/create', (req, res) => loginController.user_create(req, res));

/**
 * @openapi
 * '/api/login/recovery':
 *  put:
 *     tags:
 *     - login
 *     summary: update password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - pass
 *            properties:
 *              name:
 *                type: string
 *                default: luisCrGo
 *              pass:
 *                type: string
 *                default: 1234
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.put("/recovery", (req,res) => loginController.user_update(req,res));


export default router;