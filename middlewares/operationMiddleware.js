import { error } from "./../logging/logging.js";
import operationSchema from "./../schemas/operationSchema.js";

function validateOperation(req, res, next){
    const operation = req.body;

    const operationValidation = operationSchema.validate(operation, {abortEarly: false});
    
    if (operationValidation.error){
        const validationErros = operationValidation.error.details.map( detail => detail.message);
        console.log(error("Invalid Operation..."), validationErros);

        return res.status(422).send(validationErros);

    }

    next();
};

export default validateOperation;