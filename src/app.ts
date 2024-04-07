import express, { Express } from 'express';
import cors from 'cors';
import createTenant from './controllers/create.controller';
import updateTenants from './controllers/update.controller';
import deleteTenant from './controllers/delete.controller';
import { readTenants, readTenant } from './controllers/read.controller';
import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.dev'
})


console.log(process.env.NODE_ENV)


const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .post('/create', createTenant)
  .get('/read', readTenants)
  .get('/read/:id', readTenant)
  .patch('/update', updateTenants)
  .delete('/delete', deleteTenant)

export default app;
