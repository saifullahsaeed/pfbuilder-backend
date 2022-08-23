import { Express, Router, Request, Response } from "express";
import publications from "../../models/publications";
import Joi from "joi";
const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
    convert: true,
  };

export const addPublication = async (req: Request, res: Response) => {
    try{
        const schema = Joi.object({
            title: Joi.string().required(),
            publisher: Joi.string().required(),
            publicationDate: Joi.date().required(),
            description: Joi.string(),
            url: Joi.string(),
          });
          const { error, value } = schema.validate(req.body, options);
          if (error) {
            console.log(error);
            return res.status(400).send(error);
            return false;
          }
          const pub = new publications(
            {
                title: req.body.title,
                publisher: req.body.publisher,
                publicationDate: req.body.publicationDate,
                description: req.body.description,
                url: req.body.url,
            }
          );
          await pub.save();
        return res.status(200).json({
            message: "success",
            data: pub,
         });

    }
    catch(err :  any){
      console.error(err);
        return res.status(500).json({
            error: err.message,
        });
    }
}

export const getPublication = async (req: Request, res: Response) => {
    try{
        const pub = await publications.find({
            userId: req.user._id,
        });
        return res.status(200).json({
            message: "success",
            data: pub,
         });
    }
    catch(err :  any){
        return res.status(500).json({
            error: err.message,
        });
    }
}

export const getPublicationById = async (req: Request, res: Response) => {
    try{
        let id = req.params.id;
        const pub = await publications.findById({where: {
            $and : [
              { userId : req.user._id },
              { _id : id }
            ],}
          });
        return res.status(200).json({
            message: "success",
            data: pub,
         });
    }
    catch(err :  any){
        return res.status(500).json({
            error: err.message,
        });
    }
}

export const updatePublication = async (req: Request, res: Response) => {
    try{
        let id = req.body.id;
        const schema = Joi.object({
            id: Joi.string().required(),
            title: Joi.string().required(),
            publisher: Joi.string().required(),
            publicationDate: Joi.date().required(),
            description: Joi.string(),
            url: Joi.string(),
          });
          const { error, value } = schema.validate(req.body, options);
          if (error) {
            console.log(error);
            return res.status(400).send(error);
            return false;
          }
        const pub = await publications.findByIdAndUpdate({where: {
            $and : [
              { userId : req.user._id },
              { _id : id }
            ],}
          }, {
            title: req.body.title,
            publisher: req.body.publisher,
            publicationDate: req.body.publicationDate,
            description: req.body.description,
            url: req.body.url,
          }, { new: true });
        return res.status(200).json({
            message: "success",
            data: pub,
         });
    }
    catch(err :  any){
      console.log(err);
        return res.status(500).json({
            error: err.message,
        });
    }
}

export const deletePublication = async (req: Request, res: Response) => {
    try{
        let id = req.params.id;
        const pub = await publications.findByIdAndDelete({where: {
            $and : [
              { userId : req.user._id },
              { _id : id }
            ],}
          });
        return res.status(200).json({
            message: "success",
            data: pub,
         });
    }
    catch(err :  any){
        return res.status(500).json({
            error: err.message,
        });
    }
}
