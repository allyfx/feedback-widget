import express from 'express';

import { ensureAuthenticate } from './utils/ensureAuthenticate';

import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { CheckFeedbackUseCase } from './use-cases/check-feedback-use-case';
import { ListAllFeedbacksUseCase } from './use-cases/list-all-feedbacks-use-case';
import { SendUserEmailUseCase } from './use-cases/send-user-email-use-case';

import { PrismaUsersRepository } from './repositories/prisma/prisma-users-repository';
import { CreateUserUseCase } from './use-cases/create-user-use-case';
import { AuthenticateUserUseCase } from './use-cases/authenticate-user-use-case';

const routes = express.Router();

// PUBLIC ROUTES

routes.post('/user/create', async (req, res) => {
  const { email, password } = req.body;

  const prismaUsersRepository = new PrismaUsersRepository();
  
  const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

  await createUserUseCase.execute({
    email,
    password
  });

  return res.status(201).send();
});

routes.post('/session', async (req, res) => {
  const { email, password } = req.body;

  const prismaUsersRepository = new PrismaUsersRepository();
  
  const authenticateUserUseCase = new AuthenticateUserUseCase(prismaUsersRepository);

  const response = await authenticateUserUseCase.execute({
    email,
    password,
  });

  return res.status(200).json(response);
});

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot, userEmail } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
    userEmail
  });
  
  return res.status(201).send();
});

// AUTHENTICATED ROUTES
routes.patch('/check-feedback/:id', ensureAuthenticate, async (req, res) => {
  const id = req.params.id;
  const { checked } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  const checkFeedbackUseCase = new CheckFeedbackUseCase(prismaFeedbacksRepository);

  await checkFeedbackUseCase.execute({
    id,
    checked,
  });

  return res.status(204).send();
});

routes.get('/feedbacks', ensureAuthenticate, async (req, res) => {
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  const listAllFeeedbacksUseCase = new ListAllFeedbacksUseCase(prismaFeedbacksRepository);

  const feedbacks = await listAllFeeedbacksUseCase.execute();

  return res.status(200).json({
    feedbacks,
  });
});

routes.post('/feedbacks/send-user-email/:id', async (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const sendUserEmailUseCase = new SendUserEmailUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);

  await sendUserEmailUseCase.execute({
    feedbackId: id,
    comment,
  });

  return res.status(200).send();
});

export { routes };
