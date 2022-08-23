import {  Request, Response } from "express";
import patent from "../../models/patent";
import Joi from "joi";
const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: false,
  convert: true,
};

export const getPatent = async (req: Request, res: Response) => {
    try {
        const pat = await patent
        .find({
            userId: req.user._id,
        })
        .sort({ date: -1 });
        return res.status(200).json({
        data: pat,
        message: "success",
        });
    } catch (err: any) {
        return res.status(400).send(err);
    }
    }

    export const getPatentById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const pat = await patent.find({
                where: {
                    $and: [{ userId: req.user._id }, { _id: id }],
                },
            });
            return res.status(200).json({
            data: pat,
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

    export const addPatent = async (req: Request, res: Response) => {
        try {
            const schema = Joi.object({
                title: Joi.string().required(),
                office: Joi.string().required(),
                patentUrl: Joi.string().required(),
                patentState: Joi.string().required(),
                patentNumber: Joi.string().required(),
                date: Joi.date().required(),
            }).options(options);
            const result = schema.validate(req.body);
            if (result.error) {
                return res.status(400).send(result.error);
            }
            const pat = new patent({
                title: req.body.title,
                office: req.body.office,
                patentUrl: req.body.patentUrl,
                patentState: req.body.patentState,
                patentNumber: req.body.patentNumber,
                date: req.body.date,
            });
            await pat.save();
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
    export const updatePatent = async (req: Request, res: Response) => {
        try {
            const schema = Joi.object({
                title: Joi.string().required(),
                office: Joi.string().required(),
                patentUrl: Joi.string().required(),
                patentState: Joi.string().required(),
                patentNumber: Joi.string().required(),
                date: Joi.date().required(),
            }).options(options);
            const result = schema.validate(req.body);
            if (result.error) {
                return res.status(400).send(result.error);
            }
            const id = req.params.id;
            const pat = await patent.findOneAndUpdate({
                _id: id,
                userId: req.user._id,
            }, {
                title: req.body.title,
                office: req.body.office,
                patentUrl: req.body.patentUrl,
                patentState: req.body.patentState,
                patentNumber: req.body.patentNumber,
                date: req.body.date,
            }, {
                new: true,
            });
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
    export const deletePatent = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const pat = await patent.find({
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
