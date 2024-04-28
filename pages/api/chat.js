export const config = {
 runtime: 'edge'
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    const { message } = await req.json();

    const payload = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        max_tokens: 100
    };

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer sk-proj-LqKnmwlhHbEc9ydbfSmfT3BlbkFJnxg64sUBbbr9NBzYZAWA`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    };

    try {
        const apiResponse = await fetch('https://gateway.ai.cloudflare.com/v1/01ac260682ae1dd8a8fe406ff14e5bb4/openaichat/openai/v1/chat/completions', options);
        const data = await apiResponse.json(); // 'https://api.openai.com/v1/chat/completions'

        if (!apiResponse.ok) {
            throw new Error(data.error.message || 'API request failed');
        }

        return new Response(JSON.stringify({ message: data.choices[0].message.content }), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}