<script lang="ts">
	import '../app.css';
</script>

<header>
	<nav>
		<ul>
			<li><a href="#servicios">Servicios</a></li>
			<li><a href="#innovacion">Innovación</a></li>
			<li><a href="#marcas">Marcas</a></li>
			<li><a href="#equipo">Equipo</a></li>
			<li />
		</ul>
	</nav>
</header>

<slot />

<style>
	:root {
		--background-color: rgb(0 0 0);
		--nav-color: rgba(80 80 80 1);
		--nav-color-hover: rgba(255 255 255 1);
	}

	ul {
		list-style-type: none;
	}

	ul a {
		text-decoration: none;
		background: transparent;
	}

	header {
		background-color: var(--background-color);
	}
</style>
