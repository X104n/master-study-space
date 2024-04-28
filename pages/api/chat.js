export const runtime = "edge";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;  // extracts message from the request body
    // payload for OpenAI API request
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: message}], 
      max_tokens: 100
    };
    // request options for the OpenAI API
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };

    try {
      // fetching the OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      // send the response back to the client
      res.status(200).json({ message: data.choices[0].message.content });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}