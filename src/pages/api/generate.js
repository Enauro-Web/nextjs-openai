import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: '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'
});

if (!configuration.apiKey) throw new Error("OPENAI_API_KEY is not defined");

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  console.log(req.body);

  if(!req.body || req.body.length === 0) res.status(400).error(new Error("Prompt is required!"))

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${req.body}`,
      temperature: 1,
      max_tokens: 256,
    });
    // console.log(response.data.choices)
    res.status(200).json(response.data.choices[0].text);
  } catch (error) {
    res.status(500).json({ error });
  }
}
