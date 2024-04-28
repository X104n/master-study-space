export const runtime = 'edge';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === "POST") {
    const { message } = await request.json();
    const openAIResponse = await fetchOpenAI(message);
    return new Response(JSON.stringify({ message: openAIResponse }), {
      headers: { 'content-type': 'application/json' },
      status: 200
    });
  } else {
    return new Response('Method not allowed', { status: 405 });
  }
}

async function fetchOpenAI(message) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer sk-proj-LqKnmwlhHbEc9ydbfSmfT3BlbkFJnxg64sUBbbr9NBzYZAWA`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      prompt: message,
      max_tokens: 150
    })
  });
  const data = await response.json();
  return data.choices[0].text;
}