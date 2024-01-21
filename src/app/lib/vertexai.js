import { PredictionServiceClient, helpers} from "@google-cloud/aiplatform";

const PROJECT = process.env.PROJECT;
const LOCATION = process.env.LOCATION;
const ENDPOINT = process.env.ENDPOINT;
const MODEL = process.env.MODEL;
const PUBLISHER = process.env.PUBLISHER;

// Specifies the location of the api endpoint
const clientOptions = {
  apiEndpoint: ENDPOINT,
};


// Instantiates a client
const predictionServiceClient = new PredictionServiceClient(clientOptions);

export async function geckoEmbedding(userInput) {
  // Configure the parent resource
  const endpoint = `projects/${PROJECT}/locations/${LOCATION}/publishers/${PUBLISHER}/models/${MODEL}`;
  const instance = {
    content: userInput,
    task_type: "RETRIEVAL_QUERY"
  };
  const instanceValue = helpers.toValue(instance);
  const instances = [instanceValue];

  const parameter = {
    temperature: 0.5,
    maxOutputTokens: 256,
    topP: 0,
    topK: 1,
  };
  const parameters = helpers.toValue(parameter);

  const req  = {
    endpoint,
    instances,
    parameters,
  };

  //get embedding
  const [response] = await predictionServiceClient.predict(req);
  const predictions = response.predictions;
  for (const prediction of predictions) {
   return helpers.fromValue(prediction).embeddings.values
  }
}
