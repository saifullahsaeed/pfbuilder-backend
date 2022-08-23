import { Request, Response } from "express";
import volunteer from "../../models/volunteer";
import Joi from "joi";
const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: false,
  convert: true,
};

export const getVolunteer = async (req: Request, res: Response) => {
  try {
    const vol = await volunteer
      .find({
        userId: req.user._id,
      })
      .sort({ date: -1 });
    return res.status(200).json({
      data: vol,
      message: "success",
    });
  } catch (err: any) {
    return res.status(400).send(err);
  }
};

export const getVolunteerById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const vol = await volunteer.find({
      where: {
        $and: [{ userId: req.user._id }, { _id: id }],
      },
    });
    return res.status(200).json({
      data: vol,
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

export const addVolunteer = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      volunteerUrl: Joi.string().required(),
    }).options(options);
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    const vol = new volunteer({
      title: req.body.title,
      description: req.body.description,
      volunteerUrl: req.body.volunteerUrl,
      userId: req.user._id,
    });
    await vol.save();
    return res.status(200).json({
      data: vol,
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
export const updateVolunteer = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      volunteerUrl: Joi.string().required(),
    }).options(options);
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    const vol = await volunteer.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      {
        title: req.body.title,
        description: req.body.description,
        volunteerUrl: req.body.volunteerUrl,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      data: vol,
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
export const deleteVolunteer = async (req: Request, res: Response) => {
  try {
    const vol = await volunteer
      .find({
        where: {
          $and: [{ userId: req.user._id }, { _id: req.params.id }],
        },
      })
      .remove();
    return res.status(200).json({
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
