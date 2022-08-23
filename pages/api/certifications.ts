import {  Request, Response } from "express";
import certifications from "../../models/certifications";
import Joi from "joi";

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
    convert: true,
};

export const createCertification = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required().min(3).max(255),
            description: Joi.string().min(3).max(1055),
            issuer: Joi.string().min(3).max(255).required(),
            issueDate: Joi.date().required(),
            expiryDate: Joi.date(),
            expireable: Joi.boolean(),
            certificateUrl: Joi.string().min(3).max(255),
        });
        const result = schema.validate(req.body, options);
        if (result.error) {
            return res.status(400).send(result.error);
        } else {
            result.value.userId = req.user._id;
            const cert = await certifications.create(result.value);
            return res.status(200).json({
                data : cert,
                message : "success"
            });
        }
    } catch (err:any) {
        console.error(err);
        return res.status(400).json({
            message : "error",
            error : err.message
            
            });
    }
}
export const getCertifications = async (req: Request, res: Response) => {
    try {
        const cert = await certifications.find({
          userId: req.user._id,
        }).sort({ date: -1 });
        return res.status(200).json({
          data : cert,
          message : "success"
        });
      }
      catch (err : any) {
        return res.status(400).send(err);
      }
}
export const getCertificationById = async (req: Request, res: Response) => {
    try{
      const id = req.params.id;
      const cert =await certifications.find({
        where: {
        $and : [
          { userId : req.user._id },
          { _id : id }
        ],}
      });
      return res.status(200).json({
        data : cert,
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
export const updateCertification = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required().min(3).max(255),
            description: Joi.string().min(3).max(1055),
            issuer: Joi.string().min(3).max(255).required(),
            issueDate: Joi.date().required(),
            expiryDate: Joi.date(),
            expireable: Joi.boolean(),
            certificateUrl: Joi.string().min(3).max(255),
        });
        const result = schema.validate(req.body, options);
        if (result.error) {
            return res.status(400).send(result.error);
        }
        else {
            const cert = await certifications.findOneAndUpdate({
                _id: req.params.id,
                userId: req.user._id,
            }, result.value, { new: true });
            return res.status(200).json({
                data : cert,
                message : "success"
            });
        }
    } catch (err:any) {
        console.error(err);
        return res.status(400).json({
            message : "error",
            error : err.message
            
            });
    }
}
export const deleteCertification = async (req: Request, res: Response) => {
    try {
        const cert = await certifications.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });
        return res.status(200).json({
            data : cert,
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
