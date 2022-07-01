
import Joi from "joi";

export const modelLogin = Joi.object({
    name: Joi.string()
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required(),
});