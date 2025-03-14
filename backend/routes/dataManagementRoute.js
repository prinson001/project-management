const express = require("express");
const multer = require("multer");

// Define storage
const storage = multer.memoryStorage(); // Store file in memory buffer

const upload = multer({ storage: storage });
const router = express.Router();
const {
  getData,
  getSetting,
  getFilteredData,
  getUsers,
} = require("../controllers/dataManagementController");
const {
  addInitiative,
  updateInitiative,
  deleteInitiative,
} = require("../controllers/initiativeController");

const {
  addPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

const {
  addProgram,
  updateProgram,
  deleteProgram,
} = require("../controllers/programController");

const {
  createDocumentTemplate,
  getCurrentPhaseDocuments,
} = require("../controllers/documentTemplateController");

const {
  addProject,
  updateProject,
  deleteProject,
  getProjectById,
  updateProjectApprovalbyDeputy,
  upsertSchedulePlan
} = require("../controllers/projectController");

const {
  getPhaseDurations,
  getPhaseDurationsByBudget,
} = require("../database/dbConfig");

router.post("/setting", getSetting);
router.post("/data", getData);
router.post("/filtereddata", getFilteredData);

router.post("/addInitiative", addInitiative);
router.post("/updateInitiative", updateInitiative);
router.post("/deleteInitiative", deleteInitiative);

router.post("/addPortfolio", addPortfolio);
router.post("/updatePortfolio", updatePortfolio);
router.post("/deletePortfolio", deletePortfolio);

router.post("/addProgram", addProgram);
router.post("/updateProgram", updateProgram);
router.post("/deleteProgram", deleteProgram);

router.post(
  "/addDocumentTemplate",
  upload.single("file"),
  createDocumentTemplate
);
router.post("/getCurrentPhaseDocumentTemplates", getCurrentPhaseDocuments);

router.get("/users", getUsers);

router.post("/addProject", addProject);
router.post("/updateProject", updateProject);
router.post("/deleteProject", deleteProject);
router.post("/getProject", getProjectById);

router.post("/getPhaseDurationsByBudget", getPhaseDurationsByBudget);
router.post("/updateProjectApproval", updateProjectApprovalbyDeputy);

router.post("/upsertSchedulePlan",upsertSchedulePlan);

module.exports = router;
