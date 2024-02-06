import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function (req, res) {
  if (req.body.openaiApiKey) {
    configuration.apiKey = req.body.openaiApiKey;
    console.log(configuration.apiKey);
    return;
  }
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: 'user', content: generatePrompt(req.body.startup) }],
    temperature: 0.6,
  });
  console.log(completion.choices[0].message.content);
  res.status(200).json({ result: completion.choices[0].message.content });
}

function generatePrompt(startup) {
  const capitalizedStartup =
    startup[0].toUpperCase() + startup.slice(1).toLowerCase();
  return `Suggest three names for an Indian tech startup domain that is run by Genz.
  
  Domain: Payment gateway
  Names: Zoomer Pay, Slay Pay, No Cap Payment
  Domain: Clothing brands
  Names: Drip Check, Bussin Wear, Boujee Clothes 
  Domain: ${capitalizedStartup}
  Names:`;
}
