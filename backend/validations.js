import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Невергый формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5}),
]

export const registerValidation = [
    body('email', 'Невергый формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5}),
    body('fullName', 'Укажите Имя').isLength({ min: 3}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3}).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 5}).isString(),
    body('tegs', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]