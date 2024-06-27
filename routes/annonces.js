var express = require('express');
var router = express.Router();
const Annonce = require("../models/Annonce");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');
let bodyParser = require("body-parser");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

router.use(express.static("public"));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
* @swagger
* components:
*   schemas: 
*     Annonce:
*       type: object
*       properties: 
*         id: 
*           type: integer                
*         nom:
*           type: string
*         description: 
*           type: string
*         photo: 
*           type: string
*       required: 
*         - nom
*         - description
*/

router.get('/', (req, res) => {
    res.render('formulaire')
})
/**
* @swagger
* /get/annonces:
*   get:
*     summary: Get ALL Annonces
*     description: Get ALL Personnages
*     responses:
*       200:
*         description: Successful response
*         content: 
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Annonce'
*/
router.get('/get/annonces', async (req, res) => {
  try {
    let annonces = await Annonce.find({})
    res.json({annonces})
  } catch {
    res.json({message: 'Erreur lors du chargement des annonces'})
  }
  });
/**
* @swagger
* /get/{id}:
*   get:
*     summary: Get annonce by ID
*     description: Get annonce by ID
*     parameters: 
*       - in: path
*         name: id
*         required: true
*         description: Numeric ID required
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Get annonce by ID
*         content: 
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Annonce'
*               
*/
router.get('/get/:id', async (req, res) => {
  try {
    let annonces = await Annonce.findById(req.params.id)
    res.json({annonces})
  } catch {
    res.json({message: 'ID non valide, veuillez rééssayer avec un ID valide.'})
  }
});
/**
* @swagger
* /post/annonces:
*   post:
*     summary: Add an annonce
*     description: Add an annonce
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Annonce'
*     responses:
*       200:
*         description: Add an annonce
*         content: 
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties: 
*                   message: 
*                     type: string                  
*/
router.post('/post/annonces', (req, res) => {
  let title = req.body.title
  let description = req.body.description
  let price = req.body.price
  let surface = req.body.surface
  let localisation = {ville: req.body.ville, codePostal: req.body.codePostal}
  if (req.body.balcon === "on") {req.body.balcon = true} else {req.body.balcon = false}
  if (req.body.jardin === "on") {req.body.jardin = true} else {req.body.jardin = false}
  if (req.body.parking === "on") {req.body.parking = true} else {req.body.parking = false}

  let caractéristiques = {chambre: req.body.chambre, salleDeBain: req.body.salleDeBain, balcon: req.body.balcon, jardin: req.body.jardin, parking: req.body.parking}   

  try {
    const monannonce = new Annonce({ titre: title, description: description, prix: price, surface: surface, localisation: localisation, caractéristiques: caractéristiques})
    monannonce.save()
    res.json({ message: 'Annonce ajoutée avec succés.' })
  } catch {
    res.json({ message: 'Annonce non ajoutée. Veuillez rééssayer.' })
  }
})
/**
* @swagger
* /put/{id}:
*   put:
*     summary: Modify an annonce by ID
*     description: Modify an annonce by IS
*     parameters: 
*       - in: path
*         name: id
*         required: true
*         description: Numeric ID required
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Modify an annonce by ID
*         content: 
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties: 
*                   message: 
*                     type: string                  
*/
router.get('/put/:id', async (req, res) => {
  try {
    let annonces = await Annonce.findByIdAndUpdate(req.params.id, {title: 'Nouveau titre'})
    res.json({message: 'Annonce modifiée.'})
  } catch {
    res.json({message: 'ID non valide, veuillez renseigner un ID valide.'})
  }
});

/**
* @swagger
* /delete/{id}:
*   delete:
*     summary: Delete an annonce by ID
*     description: Delete an annonce by ID
*     parameters: 
*       - in: path
*         name: id
*         required: true
*         description: Numeric ID required
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Delete an annonce 
*         content: 
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties: 
*                   message: 
*                     type: string                  
*/
router.delete('/delete/:id', async (req, res) => {
  try {
    await Annonce.findOneAndDelete(req.params.id)
    res.json({message: 'Annonce supprimée'})
  } catch {
    res.json({message: 'ID non valide, veuillez renseigner un ID valable.'})
  }
});

module.exports = router;