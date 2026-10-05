import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
export default ai;
//# sourceMappingURL=gemini.js.map