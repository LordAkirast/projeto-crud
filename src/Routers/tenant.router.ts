import { Router } from "express";
import createTenant from "@/controllers/create.controller";

const router = Router();

router.get('/health', (_req, res) => res.send('OK!'))

export default router;