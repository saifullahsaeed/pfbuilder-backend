import {  Request, Response } from "express";
import refrences from "../../models/refrences";
import Joi from "joi";

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
    convert: true,
};


export const getRefrences = async (req: Request, res: Response) => {
    try {
        console.log(req.user);
        const ref = await refrences.find({
          userId: req.user._id,
        }).sort({ date: -1 });
        return res.status(200).json({
          data : ref,
          message : "success"
        });
      }
      catch (err : any) {
        return res.status(400).send(err);
      }
}
export const getRefrenceById = async (req: Request, res: Response) => {
    try{
      const id = req.params.id;
      const ref =await refrences.find({
        where: {
        $and : [
          { userId : req.user._id },
          { _id : id }
        ],}
      });
      return res.status(200).json({
        data : ref,
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


export const createRefrence = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object().keys({
            title: Joi.string().required().min(3).max(255),
            referenceUrl: Joi.string().min(3).max(255),
            description: Joi.string().min(3).max(1055),
        });
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            return res.status(400).send(error);
            return false;
        } else {
            const ref = new refrences({
                userId: req.user._id,
                title: value.title,
                referenceUrl: value.referenceUrl,
                description: value.description,
            });
            await ref.save();
            return res.status(200).json({
                data : ref,
                message : "success"
            });
        }
    } catch (err) {
        return res.status(400).send(err);
    }
}
export const updateRefrence = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object().keys({
            title: Joi.string().required().min(3).max(255),
            referenceUrl: Joi.string().min(3).max(255),
            description: Joi.string().min(3).max(1055),
        });
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            return res.status(400).send(error);
            return false;
        } else {
            const ref = await refrences.findOneAndUpdate({
                _id: req.params.id,
                userId: req.user._id,
            }, {
                title: value.title,
                referenceUrl: value.referenceUrl,
                description: value.description,
            }, {
                new: true,
            });
            if (!ref) {
                return res.status(404).send("not found");
            } else {
                return res.status(200).json({
                    data : ref,
                    message : "success"
                });
            }
        }
    } catch (err) {
        return res.status(400).send(err);
    }
}
export const deleteRefrence = async (req: Request, res: Response) => {
    try {
        const ref = await refrences.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (!ref) {
            return res.status(404).send("not found");
        } else {
            return res.status(200).json({
                data : ref,
                message : "success"
            });
        }
    } catch (err) {
        return res.status(400).send(err);
    }
}

  