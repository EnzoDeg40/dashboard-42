
<div
	class="p-4 md:py-10 max-w-5xl mx-auto text-center flex flex-col md:flex-row justify-center items-center gap-4"
>
	<a class="scroll" href="/">Read more</a>	
</div>

<style lang="postcss">
	.scroll {
		position: relative;
		display: block;
		font-size: 0.933rem;
		color: rgba(255,255,255,1);
		text-decoration: none;
		padding: 10px 10px 10px 40px;
		&::before {
			display: block;
			position: absolute;
			top:-2px;
			left:0;
			width: 24px;
			height: 40px;
			border: 2px solid rgba(255,255,255,1);
			border-radius: 12px;
			content:"";
		}
		&::after {
			display: block;
			position: absolute;
			top:9px;
			left:11px;
			width: 2px;
			height: 8px;
			background: rgba(255,255,255,1);
			border-radius: 1px;
			content:"";
			animation-name: scroll;
			animation-duration: 2s;
			animation-iteration-count: infinite;
			animation-delay: 2s;
		}
	}

	@keyframes scroll {
		0% { opacity: 1; height: 8px;}
		20% { opacity: 1; height: 8px;}
		30% { transform: translateY(0); opacity: 1; height: 19px;}
		40% { opacity: 1;}
		80% { transform: translateY(19px); opacity: 0; height: 0;}
		81% { transform: translateY(0); opacity: 0; height: 8px;}
		100% { opacity: 1; height: 8px;}
	}
</style>
