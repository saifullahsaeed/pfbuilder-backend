
import { Request, Response } from "express";

import profile from "../../models/profile";
import Joi from "joi";
const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
    convert: true,
};

export const addProfile = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string(),
            country: Joi.string(),
            zipcode: Joi.string(),
            description: Joi.string(),
            links: Joi.array(),
        });
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            return res.status(400).send(error);
            return false;
        }
        //if profile with userId exists, update it, else create new profile
        const profileExists = await profile.findOne({ userId: req.user._id });
        if (profileExists) {
            await profile.findOneAndUpdate(
                { userId: req.user._id },
                { $set: value },
                { new: true }
            );
            return res.status(200).send("Profile updated");
        } else {
        const exp = new profile(
            {
                userId: req.user._id,
                name: value.name,
                email: value.email,
                phone: value.phone,
                address: value.address,
                city: value.city,
                country: value.country,
                zipcode: value.zipcode,
                description: value.description,
                links: value.links,
            }

        );
        await exp.save();
        return res.status(200).json({
            message: "success",
            data: exp,
        });}
    } catch (err : any) {
        console.error(err);
        return res.status(500).json({
            error: err.message,
        });
    }
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        const exp = await profile.find({
            userId: req.user._id,
        });
        return res.status(200).json({
            message: "success",
            data: exp,
        });
    } catch (err : any) {
        return res.status(500).json({
            error: err.message,
        });
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string(),
            country: Joi.string(),
            zipcode: Joi.string(),
            description: Joi.string(),
            links: Joi.array(),
        });
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            return res.status(400).send(error);
            return false;
        }
        const exp = await profile.findOneAndUpdate({
            userId: req.user._id,
        }, {
            name: value.name,
            email: value.email,
            phone: value.phone,
            address: value.address,
            city: value.city,
            country: value.country,
            zipcode: value.zipcode,
            description: value.description,
            links: value.links,
        }, {
            new: true,
        });
        return res.status(200).json({
            message: "success",
            data: exp,
        });
    } catch (err : any) {
        return res.status(500).json({
            error: err.message,
        });
    }
}

export const deleteProfile = async (req: Request, res: Response) => {
    try {
        const exp = await profile.findOneAndDelete({
            userId: req.user._id,
        });
        return res.status(200).json({
            message: "success",
            data: exp,
        });
    } catch (err : any) {
        return res.status(500).json({
            error: err.message,
        });
    }
}

//up;load image
export const uploadImage = async (req: Request, res: Response) => {
    try {

    } catch (err : any) {
        console.log(err);
        return res.status(500).json({
            error: err.message,
        });
    }
}


