
import experience from "../../models/experience";
import Joi from "joi";
import { Request, Response } from "express";
const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
    convert: true,
};

export const addExperience = async (req: Request, res: Response) => {
    try{
        const schema = Joi.object({
            title: Joi.string().required(),
            company: Joi.string().required(),
            startDate: Joi.date().required(),
            current: Joi.boolean(),
            endDate: Joi.date().required(),
            description: Joi.string(),
            companyUrl: Joi.string(),
            employmentType: Joi.string(),
        });
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            return res.status(400).send(error);
            return false;
        }
        const exp = new experience(
            {
                userId: req.user._id,
                title: value.title,
                company: value.company,
                startDate: value.startDate,
                current: value.current,
                endDate: value.endDate,
                description: value.description,
                companyUrl: value.companyUrl,
                employmentType: value.employmentType,
            }
        );
        await exp.save();
        return res.status(200).json({
            message: "success",
            data: exp,
         });

    }
    catch(err :  any){
        return res.status(500).json({
            error: err.message,
        });
    }
}

export const getExperience = async (req: Request, res: Response) => {
    try{
        const exp = await experience.find({
            userId: req.user._id,
        });
        return res.status(200).json({
            message: "success",
            data: exp,
         });
    }
    catch(err :  any){
        return res.status(500).json({
            error: err.message,
        });
    }
}

export const getExperienceById = async (req: Request, res: Response) => {
    try{
        let id = req.params.id;
        const exp = await experience.findById({where: {
            $and : [
              { userId : req.user._id },
              { _id : id }
            ],}
        });
        return res.status(200).json({
            message: "success",
            data: exp,
         });
    }
    catch(err :  any){
        return res.status(500).json({
            error: err.message,
        });
    }
}

export const updateExperience = async (req: Request, res: Response) => {
    try{
        let id = req.body.id;
        const schema = Joi.object({
            title: Joi.string().required(),
            company: Joi.string().required(),
            startDate: Joi.date().required(),
            current: Joi.boolean(),
            endDate: Joi.date().required(),
            description: Joi.string(),
            companyUrl: Joi.string(),
            employmentType: Joi.string(),
        });
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            return res.status(400).send(error);
            return false;
        }
        const exp = await experience.findByIdAndUpdate(id, {
            title: value.title,
            company: value.company,
            startDate: value.startDate,
            current: value.current,
            endDate: value.endDate,
            description: value.description,
            companyUrl: value.companyUrl,
            employmentType: value.employmentType,
        });
        return res.status(200).json({
            message: "success",
            data: exp,
         });
    }
    catch(err :  any){
        return res.status(500).json({
            error: err.message,
        });
    }
}

export const deleteExperience = async (req: Request, res: Response) => {
    try{
        let id = req.params.id;
        const exp = await experience.findByIdAndDelete({where: {
            $and : [
              { userId : req.user._id },
              { _id : id }
            ],}
          });
        return res.status(200).json({
            message: "success",
            data: exp,
         });
    }
    catch(err :  any){
        return res.status(500).json({
            error: err.message,
        });
    }
}