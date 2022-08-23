import { Request, Response } from "express";
import intrests from "../../models/intrests";
import Joi from "joi";
const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: false,
  convert: true,
};

export const getIntrests = async (req: Request, res: Response) => {
  try {
    const intrest = await intrests
      .find({
        userId: req.user._id,
      })
      .sort({ date: -1 });
    return res.status(200).json({
      data: intrest,
      message: "success",
    });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({
      message: "error",
    });
  }
};
export const getIntrestsById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const intrest = await intrests.find({
      where: {
        $and: [{ userId: req.user._id }, { _id: id }],
      },
    });
    return res.status(200).json({
      data: intrest,
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
export const addIntrests = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
    });
    const { error } = schema.validate(req.body, options);
    if (error) {
      return res.status(400).json({
        message: "error",
        error: error.message,
      });
      return false;

    }
    const intrest = new intrests({
      userId: req.user._id,
      title: req.body.title,
    });
    await intrest.save();
    return res.status(200).json({
      message: "success",
      data: intrest,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({
      message: "error",
      error: err.message,
    });
  }
};

export const updateIntrests = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
        title: Joi.string().required(),
        });
        const { error } = schema.validate(req.body, options);
        if (error) {
          return res.status(400).json({
            message: "error",
            error: error.message,
          });
          return false;
        }
        const intrest = await intrests.findByIdAndUpdate(
            req.params.id,
            {
            title: req.body.title,
            },

            { new: true },
        );

        return res.status(200).json({
        message: "success",
        data: intrest,
        });
    } catch (err: any) {
        console.error(err);
        return res.status(400).json({
        message: "error",
        error: err.message,
        });
    }
    }
    export const deleteIntrests = async (req: Request, res: Response) => {
        try {
            const intrest = await intrests.find({
            where: {
                _id: req.params.id,
                userId: req.user._id,
            },
            }).remove();
            return res.status(200).json({
            message: "success",
            data: intrest,
            });
        } catch (err: any) {
            console.error(err);
            return res.status(400).json({
            message: "error",
            error: err.message,
            });
        }
        }
