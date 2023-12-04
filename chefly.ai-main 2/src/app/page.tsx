"use client";
import styles from "./page.module.css";
//NDA
import { openAI } from "@/openai";
import { ReactEventHandler, useEffect, useState } from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <GPTForm
      />
    </main>
  );
}



function GPTForm(props) {

  const [GPTResponse, setGPTResponse] = useState("");
 
  const [userPrompt, setUserPrompt] = useState("");

  async function fetchRecipe(ingredients: string){
    
    const completions = await openAI.chat.completions.create({
      messages: [{ role: "user", content: getRecipePrompt(ingredients) }],
      model: "gpt-3.5-turbo",
    });
  
    const result = completions.choices[0].message.content;
    console.log(result)
    setGPTResponse(result as string) 
  }

  const handleSubmit: ReactEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log('called')
    debounce(fetchRecipe, 2000)(userPrompt) 
  }



  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setUserPrompt(e.target.value);

  };

  return (
    <>
     <pre>{GPTResponse}</pre>
      <form onSubmit={handleSubmit}>
        <textarea value={userPrompt} onChange={handleInputChange} />
        <button type="submit" >Submit</button>
      </form>
    </>
  );
}

const getRecipePrompt = (ingredients: string) => {
  const newLine = "\n";
  const ingredientsArray = ingredients.split(newLine);

  return `Hello,
  Can you give me a list of atleast five step by step recipes that can be made with the following list of ingredients:
  ${ingredientsArray.join("")}
  If any ingredients for the recipes you are about to suggest, please mention it.
  In your response use this format, and nothing but this format:
  1. name of first recipe:
    step 1.
    step 2.
    step 3.
    ...
    step 10. and so on
  `;
};

function debounce(func: any, timeOut: number) {
  let timer: NodeJS.Timeout | null;
 
  //@ts-ignore
  return function (...args) {
    //@ts-expect-error
    const context = this;
    console.log(args, 'here')
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      //@ts-ignore
      func.apply(context,args)
    }, timeOut);
  };
 
}

