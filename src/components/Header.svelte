<script lang="ts">
	export let page = '/';

    let topSpacing = "pt-7 md:pt-12";
    if (page != "/") topSpacing = "pt-1 md:pt-3";
</script>

<div class={`flex flex-col md:flex-row ${topSpacing}`}>
	<div class={`flex flex-col gap-0 min-w-fit ${page != "/" ? "mt-5" : ""}`}>
		<span class={`font-roboto-slab ${page != '/' ? "text-glyph-muted text-[2.5rem]/10 md:text-[2rem]/10" : "text-glyph text-[2.5rem]/10 md:text-[3rem]/10"}  font-extrabold`}>
			<span data-replace="Shounak Ghosh" class={`my-4 ${page != "/" ? "" : "animate"}`}>
                {#if page === "/"}
				<span class="w-[400px]">shahank</span>
                {/if}

                {#if page !== "/"}
                <a href="/" class="w-[400px]">shahank</a>

                {/if}
			</span>
		</span>
		{#if page == '/'}
			<span class="text-glyph-muted font-lato italic text-[1.25rem]/7 md:text-[1.75rem]/5 py-0.5">
				aspiring fullstack developer.
			</span>
		{/if}
	</div>

	<div class={`flex text-glyph md:w-1/2 md:ml-auto ${page != "/" ? "mb-auto" : ""} mt-5`}>
		<span class="flex md:gap-16 w-full h-fit mt-auto justify-between md:justify-end">
			{#each ['blog', 'projects', 'experiments'] as item}
            {#if item != page}
				<a
					href={`/${item}`}
					class="menu-item text-glyph-more-muted font-lato text-[1.25rem] md:text-[1.5rem] grid items-end justify-center md:justify-end"
				>
					{item}
				</a>
                {/if}
			{/each}
		</span>
	</div>
</div>

<style>
	.animate {
		overflow: hidden;
		position: relative;
		display: inline-block;
	}

	.animate::before,
	.animate::after {
		content: '';
		position: absolute;
		width: 100%;
		left: 0;
	}
	.animate::before {
		/* background-color: #54b3d6; */
		height: 2px;
		bottom: 0;
		transform-origin: 100% 50%;
		transform: scaleX(0);
		transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
	}
	.animate::after {
		content: attr(data-replace);
		height: 100%;
		top: 0;
		transform-origin: 100% 50%;
		transform: translate3d(200%, 0, 0);
		transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
		/* color: #54b3d6; */
		@apply text-glyph-muted;
	}

	.animate:hover::before {
		transform-origin: 0% 50%;
		transform: scaleX(1);
	}
	.animate:hover::after {
		transform: translate3d(0, 0, 0);
	}

	.animate span {
		display: inline-block;
		transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
	}

	.animate:hover span {
		transform: translate3d(-200%, 0, 0);
	}

	.menu-item {
		position: relative;
	}

	.menu-item::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		/* background-color: #54b3d6; */
		@apply bg-glyph-more-muted;
		bottom: 0;
		left: 0;
		transform-origin: right;
		transform: scaleX(0);
		transition: transform 0.3s ease-in-out;
	}

	.menu-item:hover::before {
		transform-origin: left;
		transform: scaleX(1);
	}
</style>
