/*
  Basic Request:

  curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
     "model": "gpt-3.5-turbo",
     "messages": [{"role": "user", "content": "Say this is a test!"}],
     "temperature": 0.7
   }'
*/
import * as dotenv from "dotenv";
dotenv.config();

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const callAPI = async () => {
  const response = await openai.createCompletion({
    model: "text-davinci-001",
    prompt:
      "Write a tagline for an ice cream shop.\n\nWe make the creamiest, most delicious ice cream around!",
    temperature: 0.4,
    max_tokens: 64,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(response);
};

console.log("calling API");
callAPI();
