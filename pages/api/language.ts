import {  Request, Response } from "express";
import Joi from "joi";
import language from "../../models/language";


const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
    convert: true,
};

export const createLanguage = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required().min(3).max(255),
            level: Joi.number().required().min(1).max(10),
            proficiency: Joi.string().required(),
        });
        const result = schema.validate(req.body,  options);
        if (result.error) {
            return res.status(400).json({
                message: "error",
                error: result.error.details[0].message,
            });
        } else {
            const lang = new language({
                userId: req.user._id,
                title: req.body.title,
                level: req.body.level,
                proficiency: req.body.proficiency,
            });
            await lang.save();
            return res.status(200).json({
                message: "success",
                data: lang,
            });
        }
    } catch (err:any) {
        console.error(err);
        return res.status(400).json({
            message: "error",
            error: err.message,
        });
    }
}

export const getLanguage = async (req: Request, res: Response) => {
    try {
        const lang = await language.find({
            userId: req.user._id,
        }).sort({ date: -1 });
        return res.status(200).json({
            data : lang,
            message : "success"
        });
    } catch (err:any) {
        console.error(err);
        return res.status(400).json({
            message : "error",
            error : err.message
            
            });
    }
}
export const getLanguageById = async (req: Request, res: Response) => {
    try{
      const id = req.params.id;
      const lang =await language.find({
        where: {
        $and : [
          { userId : req.user._id },
          { _id : id }
        ],}
      });
      return res.status(200).json({
        data : lang,
        message : "success"
      });
    }
    catch (err : any) {
      console.error(err);
      return res.status(400).json({
        message : "error",
        error : err.message
        
        });
    }
  }
export const updateLanguage = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required().min(3).max(255),
            level: Joi.number().required().min(1).max(10),
            proficiency: Joi.string().required(),
        });
        const result = schema.validate(req.body, options);
        if (result.error) {
            return res.status(400).json({
                message: "error",
                error: result.error.details[0].message,
            });
        } else {
            const lang = await language.findOneAndUpdate(
                { _id: req.params.id },
                {
                    title: req.body.title,
                    level: req.body.level,
                    proficiency: req.body.proficiency,
                },
                { new: true }
            );
            return res.status(200).json({
                message: "success",
                data: lang,
            });
        }
    } catch (err:any) {
        console.error(err);
        return res.status(400).json({
            message: "error",
            error: err.message,
        });
    }
}
export const deleteLanguage = async (req: Request, res: Response) => {
    try {
        const lang = await language.findOneAndDelete({
            _id: req.params.id,
        });
        return res.status(200).json({
            message: "success",
            data: lang,
        });
    } catch (err:any) {
        console.error(err);
        return res.status(400).json({
            message: "error",
            error: err.message,
        });
    }
}