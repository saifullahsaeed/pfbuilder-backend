import projects from "../../models/projects";
import {  Request, Response } from "express";
import Joi from "joi";

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
    convert: true,
};

export const createProject = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required().min(3).max(255),
            description: Joi.string().required().min(3).max(1055),
            link: Joi.string().required().min(3).max(255),
        });
        const result = schema.validate(req.body,  options);
        if (result.error) {
            return res.status(400).json({
                message: "error",
                error: result.error.details[0].message,
            });
        } else {
            const project = new projects({
                userId: req.user._id,
                title: req.body.title,
                description: req.body.description,
                referenceUrl: req.body.link,
            });
            await project.save();
            return res.status(200).json({
                message: "success",
                data: project,
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

export const getProjects = async (req: Request, res: Response) => {
    try {
        const project = await projects.find({
            userId: req.user._id,
        }).sort({ date: -1 });
        return res.status(200).json({
            data : project,
            message : "success"
        });
    } catch (err:any) {
        console.error(err);
        return res.status(400).json({
            message : "error",
        });
    }
}

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const project = await projects.find({
            where: {
                $and: [
                    { userId: req.user._id },
                    { _id: req.params.id },
                ],
            },
        });
        return res.status(200).json({
            data : project,
            message : "success"
        });
    } catch (err:any) {
        console.error(err);
        return res.status(400).json({
            message : "error",
        });
    }
}

export const updateProject = async (req: Request, res: Response) => {
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
            const project = await projects.findByIdAndUpdate(
                req.params.id,
                {
                    title: req.body.title,
                    description: req.body.description,
                    referenceUrl: req.body.link,
                },
                { new: true },
            );
            return res.status(200).json({
                message: "success",
                data: project,
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

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const project = await projects.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "success",
            data: project,
        });
    } catch (err:any) {
        console.error(err);
        return res.status(400).json({
            message: "error",
            error: err.message,
        });
    }
}

