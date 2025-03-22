import { User } from '@prisma/client';

export interface NewUserResponse {
  message: String;
  createdUser: User;
}

export interface ErrorResponse {
  error: String;
}