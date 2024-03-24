import express, { Express } from 'express';
import cors from 'cors';
import createTenant from './controllers/create.controller';
import readTenants from './controllers/read.controller';
import updateTenants from './controllers/update.controller';
import deleteTenant from './controllers/delete.controller';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .post('/create', createTenant)
  .get('/read', readTenants)
  .patch('/update', updateTenants)
  .delete('/delete', deleteTenant)

app.listen(4000, () => console.log('Servidor rodando na porta 4000'))

