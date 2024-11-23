"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contentController_1 = require("../controllers/contentController");
const router = express_1.default.Router();
router.get('/', contentController_1.getAllContent); // Fetch all content
router.post('/', contentController_1.createContent); // Create new content
exports.default = router;
