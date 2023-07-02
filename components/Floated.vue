<template>
    <div class="floated">
        <v-slide-x-transition>
            <div v-if="open">
                {{ store.state.footer_text }}
            </div>
        </v-slide-x-transition>

        <v-btn 
            class="mx-4 float-right"
            icon="mdi-close"
            density="compact"
            color="black"
            @click="handleClick"
        />
        
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useStore } from 'vuex'

    const open = ref(false)
    const store = useStore()

    const color = ref('transparent')

    const handleClick = () => {
        color.value = 'transparent'
        
        open.value = !open.value
        if(open.value) color.value = 'green'
        
    }
    
</script>

<style>
    .floated {
        display: flex;
        background: v-bind('color');
        color: white;
        border-radius: 5px;
        width: 32%;
        justify-content: right;
        align-self: end;
        padding: 2px;
        margin-right: 5px;
        margin-bottom: 24px;
    }
</style>