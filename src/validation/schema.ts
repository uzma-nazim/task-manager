import Joi, { type Schema } from 'joi'

export const checklistItemSchema = Joi.object({
  text: Joi.string().required().min(1).max(200).messages({
    'string.empty': 'Checklist item cannot be empty',
    'string.min': 'Checklist item must be at least 1 character long',
    'string.max': 'Checklist item must be less than 200 characters',
  }),
  completed: Joi.boolean().required(),
  _id: Joi.string().optional().allow(''),
})

export const todoSchema = Joi.object({
  title: Joi.string().required().min(1).max(100).messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 1 character long',
    'string.max': 'Title must be less than 100 characters',
  }),
  checklistItems: Joi.array()
    .items(
      Joi.string().required().min(1).max(200).messages({
        'string.empty': 'Checklist item cannot be empty',
        'string.min': 'Checklist item must be at least 1 character long',
        'string.max': 'Checklist item must be less than 200 characters',
      }),
    )
    .min(1)
    .max(5)
    .required()
    .messages({
      'array.min': 'At least 1 checklist item is required',
      'array.max': 'Maximum 5 checklist items allowed',
      'array.base': 'Checklist items must be an array',
    }),
})
export const todoUpdateSchema = Joi.object({
  title: Joi.string().required().min(1).max(100).messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 1 character long',
    'string.max': 'Title must be less than 100 characters',
  }),
  checklistItems: Joi.array()
    .items(
      checklistItemSchema,
    )
    .min(1)
    .max(5)
    .required()
    .messages({
      'array.min': 'At least 1 checklist item is required',
      'array.max': 'Maximum 5 checklist items allowed',
      'array.base': 'Checklist items must be an array',
    }),
})

export type ValidationError = {
  [key: string]: string | string[]
}

export const validateTodo = (data:any ,schema:Schema): {errors?:ValidationError, value?:any} | null => {
  const { error , value } = schema.validate(data, { abortEarly: false })
  if (!error) return {value}
  

  const errors: ValidationError = {}
  error.details.forEach((detail) => { 
    const key = detail.path[0]
    errors[key] = detail.message
  })

  return {errors}
}
