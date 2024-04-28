// This line needs to be included for the cloudflare deployment to work.
// If we deploy using Vercel, this line should be removed.
export const runtime = 'edge';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {message} = req.body;
        const payload = {
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: message}],
            max_tokens: 100
        };
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', options);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error.message);
            }

            res.statusCode = 200;
            res.json({message: data.choices[0].message.content});
        } catch (error) {
            console.error('Error fetching data from backend:', error.message || error);
            res.statusCode = 500;
            res.json({error: 'Internal Server Error', details: error.message});
        }

    } else {
        res.statusCode = 405;
        res.json({error: 'Method not allowed'});
    }
}