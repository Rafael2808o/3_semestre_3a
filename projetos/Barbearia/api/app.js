import express from 'express';
import { testarConexao } from './db.js'
import cors from 'cors'
import rotasUsuarios from './src/routes/rotasUsuarios.js';
import rotasServicos from './src/routes/rotasServicos.js';
import rotasAgendamentos from './src/routes/rotasAgendamentos.js';
import documentacao from './config/swagger.js';

const app = express();

app.use(express.json());

// Adicione:

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

dom_id: '#swagger-ui'

})

</script>

</body></html>`);

});


app.use(cors())
app.use('/usuarios', rotasUsuarios);
app.use('/servicos', rotasServicos);
app.use('/agendamentos', rotasAgendamentos);

app.get('/', async (req, res) => {
await testarConexao();
res.redirect('/swagger');
})
const porta = 3000;
app.listen(porta, () => {
console.log(`Servidor rodando em: http://localhost:${porta}`);
});