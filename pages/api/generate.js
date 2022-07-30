import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.name),
    temperature: 0.9,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
  console.log(completion.data.choices)
}

function generatePrompt(name) {
  const capitalizedName =
    name[0].toUpperCase() + name.slice(1).toLowerCase();
  return `Suggest five names for a person that is a superhero.

Person: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Person: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Person: ${capitalizedName}
Names:`;
}

