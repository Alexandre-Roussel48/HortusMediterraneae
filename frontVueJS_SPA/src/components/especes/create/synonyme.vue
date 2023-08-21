<script>

export default {
	name: 'synform',
	props: ['idx', 'data']
}
</script>

<template>
	<div class="column is-2">
		<div class="columns is-gapless">
			<div class="column is-11">
				<input class="input" type="text" v-model="data.synonyme">
			</div>
			<div class="column is-1">
				<button type="button" @click="$emit('remove-syn')" class="button"><span class="icon">
					<font-awesome-icon :icon="['fas', 'minus']" />
				</span></button>
			</div>
		</div>
	</div>
</template>