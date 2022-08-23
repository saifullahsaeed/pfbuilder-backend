import awards from "../../models/awards";
import { Request, Response } from "express";
import Joi from "joi";

const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: false,
  convert: true,
};

export const getAwards = async (req: Request, res: Response) => {
  try {
    const awardss = await awards
      .find({
        userId: req.user._id,
      })
      .sort({ date: -1 });
    return res.status(200).json({
      data: awardss,
      message: "success",
    });
  } catch (err: any) {
    return res.status(400).send(err);
  }
};

export const getAwardsById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const awardss = await awards.find({
      where: {
        $and: [{ userId: req.user._id }, { _id: id }],
      },
    });
    return res.status(200).json({
      data: awardss,
      message: "success",
    });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({
      message: "error",
      error: err.message,
    });
  }
};

export const createAwards = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required().min(3).max(255),
      issuer: Joi.string().required().min(3).max(255),
      issueDate: Joi.date(),
      description: Joi.string().min(3).max(1055),
      awardUrl: Joi.string().min(3).max(255),
    });
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      return res.status(400).send(error.details[0].message);
      return false;
    }
    value.userId = req.user._id;
    const award = new awards( 
      value );
    await award.save();
    return res.status(200).json({
      data: award,
      message: "success",
    });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({
      message: "error",
      error: err.message,
    });
  }
};

export const updateAwards = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const schema = Joi.object({
      title: Joi.string().required().min(3).max(255),
      issuer: Joi.string().required().min(3).max(255),
      issueDate: Joi.date(),
      description: Joi.string().min(3).max(1055),
      awardUrl: Joi.string().min(3).max(255),
    });
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      return res.status(400).send(error.details[0].message);
      return false;
    }
    const award = await awards.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { $set: value },
      { new: true }
    );
    return res.status(200).json({
      data: award,
      message: "success",
    });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({
      message: "error",
      error: err.message,
    });
  }
};

export const deleteAwards = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const award = await awards.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });
    return res.status(200).json({
      data: award,
      message: "success",
    });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({
      message: "error",
      error: err.message,
    });
  }
};
