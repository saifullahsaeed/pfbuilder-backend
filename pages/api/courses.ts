import {  Request, Response } from "express";
import courses from "../../models/courses";
import Joi from "joi";
const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: false,
  convert: true,
};

export const createCourse = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
        title: Joi.string().required().min(3).max(255),
        description: Joi.string().required().min(3).max(1055),
        link: Joi.string().required().min(3).max(255),
        });
        const result = schema.validate(req.body, options);
        if (result.error) {
            console.log(result.error);
        return res.status(400).json({
            message: "error",
            error: result.error.details[0].message,
        });
        } else {
        const course = new courses({
            userId: req.user._id,
            title: req.body.title,
            description: req.body.description,
            courseUrl: req.body.link,
        });
        await course.save();
        return res.status(200).json({
            message: "success",
            data: course,
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

    export const getCourses = async (req: Request, res: Response) => {
        try {
            const course = await courses.find({
                userId: req.user._id,
            }).sort({ date: -1 });
            return res.status(200).json({
                data : course,
                message : "success"
            });
        } catch (err:any) {
            console.error(err);
            return res.status(400).json({
                message : "error",
            });
        }
    }
export const getCourseById = async (req: Request, res: Response) => {
    try {
        const course = await courses.find({
            where: {
                _id: req.params.id,
                userId: req.user._id,
            },
        });
        return res.status(200).json({
            data : course,
            message : "success"
        });
    } catch (err:any) {
        console.error(err);
        return res.status(400).json({
            message : "error",
        });
    }
}
export const updateCourse = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
        title: Joi.string().required().min(3).max(255),
        description: Joi.string().required().min(3).max(1055),
        link: Joi.string().required().min(3).max(255),
        });
        const result = schema.validate(req.body, options);
        if (result.error) {
        return res.status(400).json({
            message: "error",
            error: result.error.details[0].message,
        });
        } else {
        const course = await courses.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            {
            title: req.body.title,
            description: req.body.description,
            courseUrl: req.body.link,
            },
            { new: true },
        );
        return res.status(200).json({
            message: "success",
            data: course,
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
export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const course = await courses.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });
        return res.status(200).json({
            message: "success",
            data: course,
        });
    } catch (err:any) {
        console.error(err);
        return res.status(400).json({
        message: "error",
        error: err.message,
        });
    }
}



