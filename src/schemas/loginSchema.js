import joi from "joi";

export const loginSchema = joi.object({
    token: joi.string().required(),
    name: joi.string().required()
});