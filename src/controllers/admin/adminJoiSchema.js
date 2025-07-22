import joi from "joi"

// name, password, confirmPassword, email, role check password and confirm password are same 

const adminJoiSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(8).pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$")),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
    role: joi.string().optional(),
});
const loginJoiSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(8).pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$")),
})
const changePasswordJoiSchema = joi.object({
    currentPassword: joi.string().required().min(8).pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$")),
    password: joi.string().required().min(8).pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$")),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
})
export {
    adminJoiSchema,
    loginJoiSchema,
    changePasswordJoiSchema,
}