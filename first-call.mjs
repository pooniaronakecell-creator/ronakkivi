import { SarvamAIClient } from 'sarvamai';

const client = new SarvamAIClient({ apiSubscriptionKey: process.env.SARVAM_API_KEY });
try {
  const response = await client.chat.completions({
    model: 'sarvam-105b',
    messages: [{ role: 'user', content: 'Extract the services, quantities and unit rates from this quotation request: Sharma ji ke liye teen AC servicing, har ek 600 rupees, installation 1500. Material extra. Do not invent the material price. Reply briefly.' }],
    max_tokens: 2500,
    reasoning_effort: 'low',
  });
  const answer = response.choices?.[0]?.message?.content;
  if (!answer) throw new Error('Empty answer');
  console.log(answer);
} catch (error) {
  console.error('Sarvam call failed. HTTP status:', error.statusCode ?? 'network error');
  process.exitCode = 1;
}
