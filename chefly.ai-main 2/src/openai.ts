import OpenAI from "openai";

const openAI = new OpenAI ({
 apiKey: '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',
 //@ts-expect-error
 model: "gpt-3.5-turbo",
 dangerouslyAllowBrowser: true
});

export {openAI}
