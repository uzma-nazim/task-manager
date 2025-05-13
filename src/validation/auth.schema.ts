import Joi from 'joi';

// Schema for signup form validation
export const signUpSchema = Joi.object({
  username: Joi.string().required().min(3).max(50).messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be less than 50 characters',
  }),
  password: Joi.string().required().min(6).max(30).messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
    'string.max': 'Password must be less than 30 characters',
  }),
});

// Schema for login form validation
export const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': 'Username is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});
 