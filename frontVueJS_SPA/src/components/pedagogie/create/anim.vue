<script>
export default {
	name:'animform',
	props: ['data']
}
</script>

<template>
	<div class="form_position">
		<div class="box">
			<div class="field">
				<label class="label">Titre*</label>
				<div class="control">
					<input type="text" name="titre" class="input" v-model="data.titre">
				</div>
			</div>
			<div class="field">
				<label class="label">Lieux à visiter*</label>
				<div class="control">
					<span>Dans l'ordre du premier au dernier lieu</span>
					<input type="text" name="lieu" class="input" v-model="data.lieu">
				</div>
			</div>
			<div class="columns">
				<div class="column is-one-fifth">
					<div class="field is-horizontal">
						<div class="field-label is-normal field_text">
							<label class="label">De</label>
						</div>
						<div class="field-body">
							<div class="field">
								<div class="control">
									<input type="text" name="min" class="input" v-model="data._min">
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="column is-one-fifth">
					<div class="field is-horizontal">
						<div class="field-label is-normal field_text">
							<label class="label">à</label>
						</div>
						<div class="field-body">
							<div class="field">
								<div class="control">
									<input type="text" name="max" class="input" v-model="data._max">
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="column is-one-fifth">
					<div class="field is-horizontal">
						<div class="field-label is-normal field_text">
							<label class="label">personnes*</label>
						</div>
					</div>
				</div>
			</div>
			<div class="field">
				<label class="label">Objectifs*</label>
				<div class="control">
					<textarea name="objectifs" class="textarea" v-model="data.objectifs"></textarea>
				</div>
			</div>
			<div class="columns">
				<div class="column is-half">
					<div class="field">
						<label class="label">Préconisations</label>
						<div class="control">
							<textarea name="preconisations" class="textarea" v-model="data.preconisations"></textarea>
						</div>
					</div>
				</div>
				<div class="column is-half">
					<div class="field">
						<label class="label">Conditions d'annulation</label>
						<div class="control">
							<textarea name="annulation" class="textarea" v-model="data.annulation"></textarea>
						</div>
					</div>
				</div>
			</div>
			<div class="field">
				<label class="label">Préparation/Mise en place</label>
				<div class="control">
					<textarea name="pre_anim" class="textarea" v-model="data.pre_anim"></textarea>
				</div>
			</div>
		</div>
	</div>
</template>