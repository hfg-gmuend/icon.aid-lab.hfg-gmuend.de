<script lang="ts">
import '../app.css';
import { generateIconSvg } from '$lib/iconGenerator';
import { base } from '$app/paths';
	
	let iconName = '';
	let generatedSvg = '';
	let isLoading = false;
	let error = '';

	async function generateIcon() {
		if (!iconName.trim()) {
			error = 'Please enter an icon name';
			return;
		}

		isLoading = true;
		error = '';
		generatedSvg = '';

		try {
			const result = await generateIconSvg(iconName.trim());

			if (result.svg) {
				generatedSvg = result.svg;
			} else {
				error = result.error || 'Error generating icon';
			}
		} catch (err) {
			error = 'Network error while generating icon';
			console.error('Error:', err);
		} finally {
			isLoading = false;
		}
	}

	//Initalisierung Test Commit

	function downloadSvg() {
		if (!generatedSvg) return;

		const blob = new Blob([generatedSvg], { type: 'image/svg+xml' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${iconName.replace(/\s+/g, '-').toLowerCase()}-icon.svg`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			generateIcon();
		}
	}
</script>

<div class="cyber-grid"></div>

<div class="page-wrapper">
	<main class="container">
	<div class="header">
		<h1 class="title cyber-glow">
			<span class="accent-text">HfG AI-</span>Icon
		</h1>
		<p class="subtitle">
			AI-powered SVG Icon Generation for the Future
		</p>
	</div>

	<div class="generator-panel glass-panel fade-in">
		<div class="input-section">
			<div class="input-group">
				<label for="icon-input" class="input-label">Enter Icon Name</label>
				<input
					id="icon-input"
					type="text"
					bind:value={iconName}
					placeholder="e.g. home, user, search, arrow..."
					class="cyber-input"
					onkeydown={handleKeydown}
					disabled={isLoading}
				/>
			</div>
			
			<button
				class="cyber-button generate-btn {isLoading ? 'loading' : ''}"
				onclick={generateIcon}
				disabled={isLoading}
			>
				{#if isLoading}
					<span class="loading-animation"></span>
					Generating Icon...
				{:else}
					Generate Icon
				{/if}
			</button>
		</div>

		{#if error}
			<div class="error-message fade-in">
				<span class="error-icon">⚠️</span>
				{error}
			</div>
		{/if}

		{#if generatedSvg}
			<div class="output-section fade-in">
				<h3 class="output-title">Generated Icon</h3>
				
				<div class="icon-preview cyber-glow">
					<div class="icon-display">
						{@html generatedSvg}
					</div>
				</div>

				<div class="actions">
					<button class="cyber-button download-btn" onclick={downloadSvg}>
						Download SVG
					</button>
				</div>

				<div class="code-section">
					<h4 class="code-title">SVG Code</h4>
					<div class="code-block">
						<pre><code>{generatedSvg}</code></pre>
					</div>
				</div>
			</div>
		{/if}
	</div>
</main>

<footer class="credits-footer">
   <a href="https://aid-lab.hfg-gmuend.de/" target="_blank" rel="noopener noreferrer">
	   <img 
		   src="{base}/bottom-credits.png"
		   alt="Credits" 
		   class="credits-image"
	   />
   </a>
</footer>
</div>

<style>
	.page-wrapper {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.container {
		flex: 1;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 800px;
		margin: 0 auto;
	}

	.header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.title {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 4rem;
		font-weight: 700;
		margin-bottom: 1rem;
		background: linear-gradient(135deg, var(--text-primary), var(--accent));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		position: relative;
	}

	.accent-text {
		color: var(--accent);
		text-shadow: 0 0 20px var(--accent-glow);
	}

	.subtitle {
		font-size: 1.2rem;
		color: var(--text-secondary);
		font-weight: 300;
	}

	.generator-panel {
		width: 100%;
		max-width: 600px;
	}

	.input-section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.input-label {
		font-weight: 500;
		color: var(--text-secondary);
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.cyber-input {
		width: 100%;
		font-size: 1.1rem;
	}

	.generate-btn {
		width: 100%;
		font-size: 1.1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		background: linear-gradient(135deg, var(--accent), #e6d624);
		border: none;
		color: var(--bg-primary);
		font-weight: 600;
	}

	.generate-btn:hover {
		transform: translateY(-3px);
		box-shadow: 0 15px 40px rgba(252, 234, 43, 0.4);
	}

	.generate-btn.loading {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.error-message {
		background: rgba(255, 0, 0, 0.1);
		border: 1px solid rgba(255, 0, 0, 0.3);
		color: #ff6b6b;
		padding: 1rem;
		border-radius: 8px;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 2rem;
	}

	.output-section {
		border-top: 1px solid var(--border);
		padding-top: 2rem;
	}

	.output-title {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
		color: var(--accent);
		font-weight: 600;
	}

	.icon-preview {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 3rem;
		margin-bottom: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.icon-display {
		background: white;
		border-radius: 8px;
		padding: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.icon-display :global(svg) {
		width: 64px;
		height: 64px;
	}

	.actions {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.download-btn {
		background: linear-gradient(135deg, var(--accent), #e6d624);
		color: var(--bg-primary);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
	}

	.download-btn:hover {
		box-shadow: 0 10px 30px rgba(252, 234, 43, 0.3);
	}

	.code-section {
		margin-top: 2rem;
	}

	.code-title {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 1.1rem;
		margin-bottom: 1rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.code-block {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1rem;
		overflow-x: auto;
	}

	.code-block pre {
		margin: 0;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.85rem;
		line-height: 1.4;
	}

	.code-block code {
		color: var(--text-secondary);
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.title {
			font-size: 2.5rem;
		}

		.subtitle {
			font-size: 1rem;
		}

		.input-section {
			gap: 1rem;
		}

		.icon-preview {
			padding: 2rem;
		}

		.icon-display :global(svg) {
			width: 48px;
			height: 48px;
		}

		.credits-footer {
			padding: 1.5rem 1rem;
		}

		.credits-image {
			max-width: 100%;
			height: auto;
		}
	}

	/* Footer Styles */
	.credits-footer {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		margin-top: 4rem;
		background: rgba(255, 255, 255, 1);
		border-top: 1px solid var(--border);
	}

	.credits-footer a {
		display: block;
		max-width: 600px;
		width: 100%;
		text-decoration: none;
	}

	.credits-image {
		max-width: 100%;
		width: 100%;
		height: auto;
		border-radius: 12px;
	}

	.credits-footer a:hover .credits-image {
		transform: translateY(-2px);
	}
</style>
