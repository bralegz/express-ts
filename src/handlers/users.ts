import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { CreateUserQueryParams } from "../types/query-params";
import { NewUserResponse, ErrorResponse } from "../types/response";
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { User } from '@prisma/client';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function getUsers(req: Request, res: Response<User[] | ErrorResponse>) {

  try {
    const users = await prisma.user.findMany();

    res.send(users);

  } catch (error) {

    if (error instanceof Error) {
      console.log(error.message);

      res.status(500).send({
        error: 'There was an error fetching the users'
      });

    } else {
      console.log(String(error));
    }

  } finally {
    prisma.$disconnect();
  }

}

export function getUserById(req: Request, res: Response) {
  res.send({});
}

export async function createUser(req: Request<{}, {}, CreateUserDto, CreateUserQueryParams>, res: Response<NewUserResponse | ErrorResponse>) { 

  try {

    const { name, email } = req.body;


    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        posts: {
          create: { title: 'Hello World' }
        },
        profile: {
          create: { bio: 'I like turtles' }
        }
      }
    });

    res.status(201).send({
      message: 'User created successfully',
      createdUser
    });
    
  } catch (error) {

    if (error instanceof Error) {
      console.log(error.message);

      res.status(500).send({
        error: 'There was an error creating the user'
      });

    } else {
      console.log(String(error));
    }

  } finally {
    await prisma.$disconnect();

  }
}