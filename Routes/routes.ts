import express from "express";
import {
  addEducation,
  getEducation,
  getEducationById,
  updateEducation,
  deleteEducation,
} from "../pages/api/education";
import {
  addPublication,
  getPublication,
  getPublicationById,
  updatePublication,
  deletePublication,
} from "../pages/api/publication";
import {
  addExperience,
  getExperience,
  getExperienceById,
  updateExperience,
  deleteExperience,
} from "../pages/api/experience";
import {
  createSkills,
  getSkills,
  getSkillsById,
  updateSkills,
  deleteSkills,
} from "../pages/api/skills";
import {
  addVolunteer,
  getVolunteer,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
} from "../pages/api/volunteer";
import {
  createAwards,
  getAwards, 
  getAwardsById,
  updateAwards,
  deleteAwards,
} from "../pages/api/awards";
import {
  addPatent,
  getPatent,
  getPatentById,
  updatePatent,
  deletePatent,
} from "../pages/api/patent";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../pages/api/projects";
import {
  createCertification,
  getCertifications,
  getCertificationById,
  updateCertification,
  deleteCertification,
} from "../pages/api/certifications";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../pages/api/courses";
import {
  addIntrests,
  getIntrests,
  getIntrestsById,
  updateIntrests,
  deleteIntrests,
} from "../pages/api/intrests";
import {
  createLanguage,
  getLanguage,
  getLanguageById,
  updateLanguage,
  deleteLanguage,
} from "../pages/api/language";
import {
  addProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  uploadImage,
} from "../pages/api/profile";
import {
  createRefrence,
  getRefrences,
  getRefrenceById,
  updateRefrence,
  deleteRefrence,
} from "../pages/api/refrences";

import { createJSONResume } from "../pages/api/portfolioBuilder/genrateResume";

const router = express.Router();

router
  .post("/education", addEducation)
  .get("/education", getEducation)
  .get("/education/:id", getEducationById)
  .put("/education/:id", updateEducation)
  .delete("/education/:id", deleteEducation);

//publications routes
router
  .post("/publication", addPublication)
  .get("/publication", getPublication)
  .get("/publication/:id", getPublicationById)
  .put("/publication/:id", updatePublication)
  .delete("/publication/:id", deletePublication);
//experience routes
router
  .post("/experience", addExperience)
  .get("/experience", getExperience)
  .get("/experience/:id", getExperienceById)
  .put("/experience/:id", updateExperience)
  .delete("/experience/:id", deleteExperience);
//skills routes
router
  .post("/skill", createSkills)
  .get("/skill", getSkills)
  .get("/skill/:id", getSkillsById)
  .put("/skill/:id", updateSkills)
  .delete("/skill/:id", deleteSkills);
//volunteer routes
router
  .post("/volunteer", addVolunteer)
  .get("/volunteer", getVolunteer)
  .get("/volunteer/:id", getVolunteerById)
  .put("/volunteer/:id", updateVolunteer)
  .delete("/volunteer/:id", deleteVolunteer);

//awards routes
router
  .post("/award", createAwards)
  .get("/award", getAwards)
  .get("/award/:id", getAwardsById)
  .put("/award/:id", updateAwards)
  .delete("/award/:id", deleteAwards);

//patent routes
router
  .post("/patent", addPatent)
  .get("/patent", getPatent)
  .get("/patent/:id", getPatentById)
  .put("/patent/:id", updatePatent)
  .delete("/patent/:id", deletePatent);

//project routes
router
  .post("/project", createProject)
  .get("/project", getProjects)
  .get("/project/:id", getProjectById)
  .put("/project/:id", updateProject)
  .delete("/project/:id", deleteProject);

//certification routes
router
  .post("/certification", createCertification)
  .get("/certification", getCertifications)
  .get("/certification/:id", getCertificationById)
  .put("/certification/:id", updateCertification)
  .delete("/certification/:id", deleteCertification);

//course routes
router
  .post("/course", createCourse)
  .get("/course", getCourses)
  .get("/course/:id", getCourseById)
  .put("/course/:id", updateCourse)
  .delete("/course/:id", deleteCourse);

//intrests routes
router
  .post("/intrests", addIntrests)
  .get("/intrests", getIntrests)
  .get("/intrests/:id", getIntrestsById)
  .put("/intrests/:id", updateIntrests)
  .delete("/intrests/:id", deleteIntrests);

//language routes
router
  .post("/language", createLanguage)
  .get("/language", getLanguage)
  .get("/language/:id", getLanguageById)
  .put("/language/:id", updateLanguage)
  .delete("/language/:id", deleteLanguage);

//profile routes
router
  .post("/profile", addProfile)
  .get("/profile", getProfile)
  .put("/profile", updateProfile)
  .delete("/profile", deleteProfile)
  .post("/profile/upload", uploadImage);

//refrence routes
router
  .post("/refrence", createRefrence)
  .get("/refrence", getRefrences)
  .get("/refrence/:id", getRefrenceById)
  .put("/refrence/:id", updateRefrence)
  .delete("/refrence/:id", deleteRefrence);

router.get("/resume", createJSONResume);

export default router;

/*
//urls for all the api's
//http://localhost:3000/api/education
    data: {
        "school": "University of California, Los Angeles",
        "degree": "Bachelor of Science",
        "fieldofstudy": "Computer Science",
        "from": "September 2014",
        "to": "May 2018",
        "current": false,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo. Cras neque metus, consequat ut ullamcorper quis, cursus quis neque. Nam aliquam, neque quis vehicula viverra, massa tellus consequat libero, eu vulputate tellus eros non erat. "
    }

//http://localhost:3000/api/publication
    data: {
        "name": "Publication Name",
        "publisher": "Publisher",
        "releaseDate": "Release Date",
        "url": "http://www.google.com",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo. Cras neque metus, consequat ut ullamcorper quis, cursus quis neque. Nam aliquam, neque quis vehicula viverra, massa tellus consequat libero, eu vulputate tellus eros non erat. "
    }
//http://localhost:3000/api/experience
    data: {
        "title": "Software Engineer",
        "company": "Google",
        "startDate": "12-12-2014",
        "endDate": "12-12-2015",
        "current": false,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo. Cras neque metus, consequat ut ullamcorper quis, cursus quis neque. Nam aliquam, neque quis vehicula viverra, massa tellus consequat libero, eu vulputate tellus eros non erat. "
        "companyUrl": "http://www.google.com",
        "employmentType": "Full Time"
    }
//http://localhost:3000/api/skill
    data: {
        "title": "Software Engineer",
        "level": 9,
        "proficiency": "Expert"
    }
//http://localhost:3000/api/volunteer
    data: {
        "title": "Software Engineer",
        "discription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo. Cras neque metus, consequat ut ullamcorper quis, cursus quis neque. Nam aliquam, neque quis vehicula viverra, massa tellus consequat libero, eu vulputate tellus eros non erat. ",
        "volunteerUrl": "http://www.google.com"
    }
//http://localhost:3000/api/award
    data: {
        "title": "Software Engineer",
        "issuer": "Google",
        "issueDate": "12-12-2014",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo. Cras neque metus, consequat ut ullamcorper quis, cursus quis neque. Nam aliquam, neque quis vehicula viverra, massa tellus consequat libero, eu vulputate tellus eros non erat. ",
        "awardUrl": "http://www.google.com"
    }
//http://localhost:3000/api/patent
    data: {
        "title": "Software Engineer",
        "office": "Google",
        "patentNumber": "1564541231654654",
        "date": "12-12-2014",
        "patentUrl": "http://www.google.com",
        "patentState": "Active"
    }

//http://localhost:3000/api/project
    data: {
        "title": "Example Project",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo. Cras neque metus, consequat ut ullamcorper quis, cursus quis neque. Nam aliquam, neque quis vehicula viverra, massa tellus consequat libero, eu vulputate tellus eros non erat. ",
        "link": "http://www.google.com"
    }

//http://localhost:3000/api/certification
    data: {
        "title": "Software Engineer",
        "issuer": "Google",
        "issueDate": "12-12-2014",
        "expiryDate": "12-12-2015",
        "expireable": true,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo. Cras neque metus, consequat ut ullamcorper quis, cursus quis neque. Nam aliquam, neque quis vehicula viverra, massa tellus consequat libero, eu vulputate tellus eros non erat. ",
        "certificationUrl": "http://www.google.com"
    }

//http://localhost:3000/api/course
    data: {
        "title": "Software Engineer",
        "discription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo. Cras neque metus, consequat ut ullamcorper quis, cursus quis neque. Nam aliquam, neque quis vehicula viverra, massa tellus consequat libero, eu vulputate tellus eros non erat. ",
        "link": "http://www.google.com"
    }
//http://localhost:3000/api/intrests
    data: {
        "title": "Software Engineer"
    }
//http://localhost:3000/api/language
    data: {
        "title": "English",
        "proficiency": "Expert",
        "level": 9
    }

//http://localhost:3000/api/profile
    data: {
        "name": "John Doe",
        "email": "johndoe@google.com",
        "phone": "1234567890",
        "address": "123 Main Street, Anytown, USA",
        "city": "Anytown",
        "country": "USA",
        "zipCode": "12345",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo. Cras neque metus, consequat ut ullamcorper quis, cursus quis neque. Nam aliquam, neque quis vehicula viverra, massa tellus consequat libero, eu vulputate tellus eros non erat. ",
        "links" : [
            "http://www.google.com/johndoe",
            "https://www.linkedin.com/johndoe",
            "https://www.facebook.com/johndoe"
        ]
    }
//http://localhost:3000/api/refrence
    data: {
        "title": "Reasercher at Google",
        "discription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo. Cras neque metus, consequat ut ullamcorper quis, cursus quis neque. Nam aliquam, neque quis vehicula viverra, massa tellus consequat libero, eu vulputate tellus eros non erat. ",
        "referenceUrl" : "http://www.google.com"
    }
*/
