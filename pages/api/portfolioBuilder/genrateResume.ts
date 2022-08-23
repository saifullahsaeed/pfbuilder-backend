import awards from "../../../models/awards";
import certifications from "../../../models/certifications";
import education from "../../../models/education";
import experience from "../../../models/experience";
import languages from "../../../models/language";
import projects from "../../../models/projects";
import skills from "../../../models/skills";
import patents from "../../../models/patent";
import courses from "../../../models/courses";
import intrests from "../../../models/intrests";
import profile from "../../../models/profile";
import publications from "../../../models/publications";
import references from "../../../models/refrences";
import volunteer from "../../../models/volunteer";
var pdf = require("pdf-creator-node");
import fs from "fs";
import pug from "pug";
import { Request, Response } from "express";
import path from "path";

let JSONResume : any = {
  basics: {},
  sections: {
    education: {
      length: 0,
      data: [],
    },
    experience: {
      length: 0,
      data: [],
    },
    projects: {
      length: 0,
      data: [],
    },
    publications: {
      length: 0,
      data: [],
    },
    certifications: {
      length: 0,
      data: [],
    },
    courses: {
      length: 0,
      data: [],
    },
    references: {
      length: 0,
      data: [],
    },
    volunteer: {
      length: 0,
      data: [],
    },
    patents: {
      length: 0,
      data: [],
    },
    awards: {
      length: 0,
      data: [],
    },
    languages: {
      length: 0,
      data: [],
    },
    skills: {
      length: 0,
      data: [],
    },
    intrests: {
      length: 0,
      data: [],
    },
  },
};

var options = {
    format: "A4",
    orientation: "portrait",
    border: "0mm",

};

export const createJSONResume = async (req: Request, res: Response) => {
  try {
    let profileObj = await profile.findOne({ userId: req.user._id }).select(['-userId','-_id','-__v','-created_at','-updated_at']);
    let educationObj = await education.find({ userId: req.user._id }).select(['-userId','-_id','-__v','-created_at','-updated_at']);
    let experienceObj = await experience.find({ userId: req.user._id }).select(['-userId','-_id','-__v','-created_at','-updated_at']);
    let awardsObj = await awards.find({ userId: req.user._id }).select(['-userId','-_id','-__v','-created_at','-updated_at']);
    let certificationsObj = await certifications.find({ userId: req.user._id }).select(['-userId','-_id','-__v','-created_at','-updated_at']);
    let languagesObj = await languages.find({ userId: req.user._id }).select(['-userId','-_id','-__v','-created_at','-updated_at']);
    let skillsObj = await skills.find({ userId: req.user._id }).select(['-userId','-_id','-__v','-created_at','-updated_at']);
    let projectsObj = await projects.find({ userId: req.user._id }).select(['-userId','-_id','-__v','-created_at','-updated_at']);
    let patentsObj = await patents.find({ userId: req.user._id }).select(['-userId','-_id','-__v','-created_at','-updated_at']);
    let coursesObj = await courses.find({ userId: req.user._id }).select(['-userId','-_id','-__v','-created_at','-updated_at']);
    let intrestsObj = await intrests.find({ userId: req.user._id }).select(['-userId','-_id','-__v','-created_at','-updated_at']);
    let publicationsObj = await publications.find({ userId: req.user._id }).select(['-userId','-_id','-__v','-created_at','-updated_at']);
    let referencesObj = await references.find({ userId: req.user._id }).select(['-userId','-_id','-__v','-created_at','-updated_at']);
    let volunteerObj = await volunteer.find({ userId: req.user._id }).select(['-userId','-_id','-__v','-created_at','-updated_at']);
    JSONResume.basics = profileObj;
    //send JSON resume
    JSONResume.sections.education.data = educationObj;
    JSONResume.sections.education.length = educationObj.length;
    JSONResume.sections.experience.data = experienceObj;
    JSONResume.sections.experience.length = experienceObj.length;
    JSONResume.sections.awards.data = awardsObj;
    JSONResume.sections.awards.length = awardsObj.length;
    JSONResume.sections.certifications.data = certificationsObj;
    JSONResume.sections.certifications.length = certificationsObj.length;
    JSONResume.sections.languages.data = languagesObj;
    JSONResume.sections.languages.length = languagesObj.length;
    JSONResume.sections.skills.data = skillsObj;
    JSONResume.sections.skills.length = skillsObj.length;
    JSONResume.sections.projects.data = projectsObj;
    JSONResume.sections.projects.length = projectsObj.length;
    JSONResume.sections.patents.data = patentsObj;
    JSONResume.sections.patents.length = patentsObj.length;
    JSONResume.sections.courses.data = coursesObj;
    JSONResume.sections.courses.length = coursesObj.length;
    JSONResume.sections.intrests.data = intrestsObj;
    JSONResume.sections.intrests.length = intrestsObj.length;
    JSONResume.sections.publications.data = publicationsObj;
    JSONResume.sections.publications.length = publicationsObj.length;
    JSONResume.sections.references.data = referencesObj;
    JSONResume.sections.references.length = referencesObj.length;
    JSONResume.sections.volunteer.data = volunteerObj;
    JSONResume.sections.volunteer.length = volunteerObj.length;
    
    //send json resume to ../../../../templates/resume/baisic/srt-resume.pug
    let pugOptions = {
        basedir: path.join(__dirname, "../../../../templates/Resume/basic"),
        pretty: true,
        compileDebug: true,
        debug: true,
    }
    //read the template file
    let template = fs.readFileSync(path.join(__dirname, "../../../../templates/Resume/baisic/srt-resume.pug"), "utf8");
    let rawdata = pug.compile(template, pugOptions);
    console.log(rawdata(JSONResume));
    //get html file from 

        var document = {
            html: rawdata(JSONResume),
            data: {
                resume: JSONResume,
            },
            path:  path.join(__dirname, "../../../../public/resume/"+req.user._id+".pdf"),
            type: "",
          };
            pdf.create(document, options).then((res :any) => {
                console.log(res);
            }).catch((err :any) => {
                console.log(err);
            }).then(() => {
               return res.sendFile(path.join(__dirname, "../../../../public/resume/"+req.user._id+".pdf"));
            }).catch((err :any) => {
                console.log(err);
            });
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({
      message: "error",
      error: err.message,
    });
  }
};
