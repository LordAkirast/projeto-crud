import express, { Express } from 'express';
import cors from 'cors';
import createTenant from './controllers/create.controller';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .post('/create', createTenant)

app.listen(4000, () => console.log('Servidor rodando na porta 4000'))

