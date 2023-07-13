import { Router } from 'express';
import { dataEnv } from '../config/envData.js';
import { getLogin } from '../models/login.js';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const user_login = async (req, res) => {
    const user = await getLogin.findOne({ where: { name: req.body.name } });
    if (user) {
        const validPassword = bcryptjs.compareSync(req.body.pass, user.pass);
        
            if (validPassword) {
                const token = jwt.sign({
                    sub: user. name,
                }, 'secret', { expiresIn: '30m' }, dataEnv.parsed.JWT_TOKEN_SECRET, { algorithm: 'HS256' })
                user.token = token;

                res.header('auth-token', token).json({
                    error: null,
                    data: { token,name: user.name, validate: user.validate }
                });

            }
            else {
                return res.status(400).json({ error: 'contraseña no válida' })
            }
        
    }
    else {
        return res.status(400).json({ error: 'Usuario no encontrado' });
    }


};

const user_create = async (req,res) => {
    const name = req.body.name;
    const pass = req.body.pass;
    const telefono = req.body.telefono;
    const email = req.body.email;


    getLogin.create ({
        name,
        telefono,
        email,
        pass,
    },
    {fields: ["name", "telefono","email","pass"]})
    .then(login => {
        res.send(login);
    })
    .catch((err)=> {
        console.log(err);
    })

};

const user_update = (req, res) => {
    const name = req.body.name
    getLogin.findOne({ where: { name: name } })
        .then(login => {
            login.update({ pass: bcryptjs.hashSync(req.body.pass, 10) })
            res.status(200).json({ err: 'contraseña Actualizada' })
        })
        .catch((err) => {
            res.status(400).json({ err: 'contraseña No Actualizado' })
        });
};

export const loginController = {user_login,user_create,user_update};