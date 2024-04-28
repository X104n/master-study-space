export const config = { runtime: 'edge' };

export default async function handler(request) {
  if (request.method === 'POST') {
    try {
      const data = await request.json();
      const { message } = data;

      const payload = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        max_tokens: 100
      };

      const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseData = await apiResponse.json();
      if (!apiResponse.ok) {
        return new Response(JSON.stringify({ error: responseData.error.message }), { status: apiResponse.status });
      }

      return new Response(JSON.stringify({ message: responseData.choices[0].message.content }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  } else {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }
}
