import axios from "axios";

export const Chatbot = async (question) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer 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",
        },
    };
    const data = {
        model: "text-davinci-003",
        prompt: question,
        temperature: 0,
        max_tokens: 4000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
    };
    const result = await axios.post(
        "https://api.openai.com/v1/completions",
        data,
        config
    );
    return JSON.parse(result.request["response"]).choices[0].text;
};
