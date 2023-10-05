<script>

export default {
	name: 'clink',
	props: ['link', 'nom']
}

</script>

<template>
	<RouterLink :to="link">{{nom}}</RouterLink>
</template>