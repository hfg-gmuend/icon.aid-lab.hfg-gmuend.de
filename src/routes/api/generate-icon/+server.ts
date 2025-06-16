import { json } from '@sveltejs/kit';
import { VITE_CHAT_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { iconName } = await request.json();

		if (!iconName) {
			return json({ error: 'Icon name is required' }, { status: 400 });
		}

		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${VITE_CHAT_API_KEY}`
			},
			body: JSON.stringify({
				model: 'gpt-4.1',
				messages: [
					{
						role: 'system',
						content: `You are an expert SVG icon designer. Create clean, minimalist, black and white SVG icons. 
						The icons should be:
						- 24x24 viewBox
						- Use only black (#000000) and white (#ffffff) colors
						- White should be the active/fill color 
						- Black should be the background or stroke color
						- Modern, minimalist design
						- Perfect for UI/UX
						- Return ONLY the SVG code, no explanations`
					},
					{
						role: 'user',
						content: `Create an SVG icon for: ${iconName}`
					}
				],
				max_tokens: 1000,
				temperature: 0.7
			})
		});

		if (!response.ok) {
			const errorData = await response.text();
			console.error('OpenAI API Error:', errorData);
			return json({ error: 'Failed to generate icon' }, { status: 500 });
		}

		const data = await response.json();
		const svgContent = data.choices[0]?.message?.content;

		if (!svgContent) {
			return json({ error: 'No SVG content generated' }, { status: 500 });
		}

		return json({ svg: svgContent });
	} catch (error) {
		console.error('Error generating icon:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
