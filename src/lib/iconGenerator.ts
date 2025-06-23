// Client-side API utility for icon generation
export async function generateIconSvg(iconName: string): Promise<{ svg?: string; error?: string }> {
	try {
		const apiKey = import.meta.env.VITE_CHAT_API_KEY;
		
		if (!apiKey) {
			console.error('VITE_CHAT_API_KEY is not configured');
			return { error: 'API key not configured. Please check your environment variables.' };
		}

		const response = await fetch('https://playground.transferscope.org/api-llm/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`
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
			console.error('API Error:', errorData);
			return { error: 'Failed to generate icon' };
		}

		const data = await response.json();
		const svgContent = data.choices[0]?.message?.content;

		if (!svgContent) {
			return { error: 'No SVG content generated' };
		}

		return { svg: svgContent };
	} catch (error) {
		console.error('Error generating icon:', error);
		return { error: 'Internal server error' };
	}
}
