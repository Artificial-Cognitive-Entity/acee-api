import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw Error("open ai key not defined");
}

const openai = new OpenAI({ apiKey });
export default openai;

