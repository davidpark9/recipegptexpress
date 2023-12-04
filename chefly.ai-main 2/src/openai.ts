import OpenAI from "openai";

const openAI = new OpenAI ({
 apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
 //@ts-expect-error
 model: "gpt-3.5-turbo",
 dangerouslyAllowBrowser: true
});

export {openAI}
