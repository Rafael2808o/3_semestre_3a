import express from 'express';
import { BD, testarConexao } from './db.js';
import rotasUsuarios from './src/routes/rotasUsuarios.js'
import rotasCategorias from './src/routes/rotasCategorias.js'
import rotasSubCategorias from './src/routes/rotasSubCategorias.js'
import rotasTransacoes from './src/routes/rotasTransacoes.js'
import rotasDashboard from './src/routes/rotasDashboard.js'
//usando swagger
import swaggerUi from 'swagger-ui-express';
import documentacao from './config/swagger.js';
import cors from 'cors'

const app = express();

// Middlewares na ordem correta
app.use(express.json());
app.use(cors());
// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao));
app.get('/swagger', (req, res) => {

res.send(`<!DOCTYPE html>

<html><head>

<title>API Ordens de Serviço</title>

<meta charset="utf-8"/>

<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">

</head><body>

<div id="swagger-ui"></div>

<script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>

<script>

SwaggerUIBundle({

spec: ${JSON.stringify(documentacao)},

dom_id: '#swagger-ui'})

</script>

</body></html>`);

});

app.get('/', async (req, res) => {
    res.redirect('/swagger')
})

//Utilizando rotas
app.use(rotasUsuarios);
app.use(rotasCategorias);
app.use(rotasSubCategorias);
app.use(rotasTransacoes);
app.use(rotasDashboard);

export default app;
