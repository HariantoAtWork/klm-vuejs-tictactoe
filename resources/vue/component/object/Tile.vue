<template>
	<div class="tile u-box u-box--align-center u-box--justify-center">
		<div 
			class="choice">
			
		    <div v-if="type == 'circle'"     class="circle"><span class="fa fa-circle-o"></span></div>
		    <div v-else-if="type == 'cross'" class="cross"><span class="fa fa-close"></span></div>
		    <div v-else                      class="empty"><span class="fa fa-question"></span></div>
		</div>
	</div>
</template>


<script>
	import './Tile.scss'

	export default {
	    name: 'Tile',
	    props: {
	    	type: {
	    		required: true,
	    		default () {
	    			return null
	    		}
	    	}
	    },
	}
</script>