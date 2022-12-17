import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.startup),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(startup) {
  const capitalizedStartup =
    startup[0].toUpperCase() + startup.slice(1).toLowerCase();
  return `Suggest three names for an Indian tech startup domain that is run by Genz.
  
  Domain: Payment gateway
  Names: Zoomer Pay, Slay Pay, No Cap Payment
  Domain: Clothing
  Names: Drip Check, Bussin Wear, Boujee Clothes 
  Domain: ${capitalizedStartup}
  Names:`;
}
