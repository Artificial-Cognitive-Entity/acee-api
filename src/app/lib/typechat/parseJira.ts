import { ContentTranslator } from "./translator";

export async function parseJira(content: string) {

    
  let response: any = await ContentTranslator().translate(content);
  //response went through, embedd the description field
  const parsedInput = JSON.parse(JSON.stringify(response.data, undefined, 3)); // turn it into a JSON object

  console.log("INSIDE TRANSLATOR")
  console.log(content)
  console.log(parsedInput.result[0])
  return parsedInput.result[0];
}
