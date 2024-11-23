"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContent = exports.getAllContent = void 0;
const contentModel_1 = __importDefault(require("../models/contentModel")); // Import the Content model
// Get all content
const getAllContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield contentModel_1.default.find().populate('tags').populate('user');
        res.status(200).json(content);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching content', error });
    }
});
exports.getAllContent = getAllContent;
// Create new content
const createContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, title, description, type, tags, user } = req.body;
        const newContent = new contentModel_1.default({ link, title, description, type, tags, user });
        yield newContent.save();
        res.status(201).json(newContent);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating content', error });
    }
});
exports.createContent = createContent;
