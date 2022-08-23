import skills from "../../models/skills";
import {  Request, Response } from "express";
import Joi from "joi";
const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
    convert: true,
};

export const getSkills = async (req: Request, res: Response) => {
    try {
        const skillss = await skills
            .find({
                userId: req.user._id,
            })
            .sort({ date: -1 });
        return res.status(200).json({
            data: skillss,
            message: "success",
        });
    } catch (err: any) {
        return res.status(400).send(err);
    }
}

export const getSkillsById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const skillss = await skills.find({
            where: {
                $and: [{ userId: req.user._id }, { _id: id }],
            },
        });
        return res.status(200).json({
            data: skillss,
            message: "success",
        });
    } catch (err: any) {
        console.error(err);
        return res.status(400).json({
            message: "error",
            error: err.message,
        });
    }
}

export const createSkills = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required().min(3).max(255),
            level: Joi.number().required().min(1).max(10),
            proficiency: Joi.string(),

        });
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            return res.status(400).json({
                message: "error",
                error: error.details[0].message,
            });
            return false;
        }
        const newSkill = new skills({
            userId: req.user._id,
            title: req.body.title,
            level: req.body.level,
            proficiency: req.body.proficiency,
        });
        await newSkill.save();
        return res.status(200).json({
            data: newSkill,
            message: "success",
        });
        
    } catch (err: any) {
        console.error(err);
        return res.status(400).json({
            message: "error",
            error: err.message,
        });
    }
}

export const updateSkills = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required().min(3).max(255),
            level: Joi.number().required().min(1).max(10),
            proficiency: Joi.string(),
        });
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            return res.status(400).json({
                message: "error",
                error: error.details[0].message,
            });
            return false;
        }
        const id = req.params.id;
        const skill = await skills.findOneAndUpdate({
            _id: id,
            userId: req.user._id,
        }, {
            title: req.body.title,
            level: req.body.level,
            proficiency: req.body.proficiency,
            
        });
        
        return res.status(200).json({
            data: skill,
            message: "success",
        });
    } catch (err: any) {
        console.error(err);
        return res.status(400).json({
            message: "error",
            error: err.message,
        });
    }
}

export const deleteSkills = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const skill = await skills.find({
            where: {
                $and: [{ userId: req.user._id }, { _id: id }],
            },
        }).remove();
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
}



