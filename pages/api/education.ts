import {  Request, Response } from "express";
import education from "../../models/education";
import Joi from "joi";


const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: false,
  convert: true,
};

export const getEducation = async (req: Request, res: Response) => {
  try {
    console.log(req.user);
    const edu = await education.find({
      userId: req.user._id,
    }).sort({ date: -1 });
    return res.status(200).json({
      data : edu,
      message : "success"
    });
  }
  catch (err : any) {
    return res.status(400).send(err);
  }
}

export const getEducationById = async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    const edu =await education.find({
      where: {
      $and : [
        { userId : req.user._id },
        { _id : id }
      ],}
    });
    return res.status(200).json({
      data : edu,
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

export const addEducation = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      institute: Joi.string().required(),
      feildofstudy: Joi.string().required(),
      degree: Joi.string().required(),
      grade: Joi.string(),
      startDate: Joi.date().required(),
      endDate: Joi.date(),
      description: Joi.string(),
      schoolUrl: Joi.string(),
    });
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      return res.status(400).send(error.details[0].message);
      return false;
    }
    const edu = new education({
      institute: req.body.institute,
      feildofstudy: req.body.feildofstudy,
      degree: req.body.degree,
      grade: req.body.grade,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      schoolUrl: req.body.schoolUrl,
      userId: req.user._id,
    });
    await edu.save();
    return res.status(200).json({
      message: "success",
      data: edu,
    });
  } catch (err : any) {
    return res.status(400).json({
      message: "error",
      error: err.message,
      });
  }
}
export const updateEducation = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      institute: Joi.string().required(),
      feildofstudy: Joi.string().required(),
      degree: Joi.string().required(),
      grade: Joi.string(),
      startDate: Joi.date().required(),
      endDate: Joi.date(),
      description: Joi.string(),
      schoolUrl: Joi.string(),
    });
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      return res.status(400).send(error.details[0].message);
      return false;
    }
    const edu = await education.findOneAndUpdate({
      _id: req.params.id,
      userId: req.user._id,
    }, {
      institute: req.body.institute,
      feildofstudy: req.body.feildofstudy,
      degree: req.body.degree,
      grade: req.body.grade,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      schoolUrl: req.body.schoolUrl,
    });
    return res.status(200).json({
      message: "success",
      data: edu,
    });
  } catch (err : any) {
    return res.status(400).json({
      message: "error",
      });
  }
}

export const deleteEducation = async (req: Request, res: Response) => {
  try {
    const edu = await education.findOneAndDelete({
      $and : [
        { userId : req.user._id },
        { _id : req.params.id }
      ],
    });
    return res.status(200).json({
      message: "success",
      data: edu,
    });
  } catch (err : any) {
    return res.status(400).json({
      message: "error",
      });
  }
}
