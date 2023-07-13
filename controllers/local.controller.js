import { Router } from 'express';
import { dataEnv } from '../config/envData.js';
import { getLocal } from '../models/local.js';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import fs from 'fs';
import {fileURLToPath} from 'url';
import path from "path";

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const local_create = async (req, res) => {
    const namelocal = req.body.namelocal;
    const imagen = req.file.originalname;
    const genero = req.body.genero;
    const descripcion = req.body.descripcion;
    const menu = req.body.menu;
    const userId = req.body.userId;
  
    const existingLocal = await getLocal.findOne({ where: { namelocal: namelocal } });
    if (existingLocal) {
      return res.status(400).json({ error: 'El namelocal ya está en uso' });
    }
  
    getLocal
      .create({
        namelocal,
        imagen,
        genero,
        descripcion,
        menu,
        userId
      })
      .then((contenido) => {
        res.send(contenido);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error al crear el registro' });
      });
  };
  

const local_img = (function (req,res)  {
    let img1 = req.query.img1;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    let reqP = path.join(__dirname, "../")
    console.log("data"+reqP)
    let img =reqP+`//assets//${img1}`;

    fs.access(img, fs.constants.F_OK, err => {
        console.log(`${img} ${err ? "no existe" : "existe"} `)
    });

    fs.readFile(img, function(err,data){
        if(err){
            res.writeHead(404, {'Content-Type' : 'text/plane'});
            return res.end('404 not found')
        }else{
            res.writeHead(200, {'Content-Type' : 'image/jpeg'});
            res.write(data);
            return res.end();
        }
    })
});

const local_update = async (req,res) => {
    const { namelocal, genero, descripcion, menu } = req.body;
    const { id } = req.body;
  
    getLocal.findOne({ where: { namelocal: namelocal } })
      .then(local => {
        if (!local) {
          return res.status(404).send('Local not found');
        }
  
        local.update({
          namelocal: namelocal || local.namelocal,
          imagen: req.file ? req.file.originalname : local.imagen,
          genero: genero || local.genero,
          descripcion: descripcion || local.descripcion,
          menu: menu || local.menu
        })
          .then(updatedLocal => {
            res.send(updatedLocal);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send('Error updating local');
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Error updating local');
      });
}

const local_delete = async (req,res) => {
    const namelocal = req.body.namelocal;
    getLocal.destroy({where: {namelocal:namelocal}})
    .then((r) => {
        res.status(200).json({ message: "Registro Eliminado" });
    })
    .catch((err) => {
        res.status(400).json({ err: 'Error al eliminar' });    
    });
}

const local_viewAll = async (req,res) => {
  getLocal.findAll({ attributes: ["namelocal", "imagen", "genero","descripcion","menu"]})
  
  .then(local => {
      res.send(local)
  })
  .catch(err => {
      res.status(400).json({ err: 'Error al hacer la consulta' });    
  })

}

const local_viewUser = async (req,res) => {
  getLocal.findAll({ where: { userId: req.query.userId },
    attributes: ["namelocal", "imagen", "genero","descripcion","menu"] })

.then(local => {
    res.send(local)
})
.catch(err => {
    res.status(400).json({ err: 'Error al hacer la consulta' });    
})

}

export const localController = {local_create,local_img,local_update,local_delete,local_viewAll,local_viewUser};