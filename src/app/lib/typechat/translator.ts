import * as typechat from "typechat";
import { readFileSync } from "fs";
import path from "path";
import { Question } from "./searchSchema";
import { Content } from "./contentSchema";

export default function Translator() {
  const model = typechat.createLanguageModel(process.env);
  const schema = readFileSync(
    path.join(process.cwd(), "/src/app/lib/typechat/searchSchema.ts"),
    "utf8"
  ); //read the schema in
  const translator = typechat.createJsonTranslator<Question>(
    model,
    schema,
    "Question"
  );

  return translator;
}

export function ContentTranslator() {
  const model = typechat.createLanguageModel(process.env);
  const schema = readFileSync(
    path.join(process.cwd(), "/src/app/lib/typechat/contentSchema.ts"),
    "utf8"
  ); //read the schema in
  const translator = typechat.createJsonTranslator<Content>(
    model,
    schema,
    "Content"
  );

  return translator;
}
