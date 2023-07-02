<template>

    <h1 class="text-center m-0 p-0 mt-12"> {{ store.state.title }} </h1>
    <v-card
      class="mx-auto"
      max-width="600"
    >
      <v-card-item>
        
        <div class="d-flex justify-end">
        <template v-for="(button, index) in buttons" :key="index">
                <v-btn
                    density="compact"
                    class="text-none ml-2"
                    :color="button.color"
                    v-if="!button.isHide || store.getters.checked.length > 0"
                    size="default"
                    @click="handleClick(button.action)"
                    >
                        {{  button.title  }}

                    <template #append>
                        <v-badge
                            v-if="button.isCount"
                            color="white"
                            :content="button.count === 1 ? store.state.data.length : store.getters.checked.length"
                            inline
                        ></v-badge>
                    </template>

                    <template #prepend>
                        <v-icon v-if="button.isIcon">{{ button.icon }}</v-icon>
                    </template>
                </v-btn>
        </template>
    </div>
  
      </v-card-item>
  
      <v-card-text>

        <v-slide-x-transition
            class="py-0"
            group
            tag="v-list"
        >
        <template 
            v-for="item in store.state.data" 
            :key="item.id"
            
        >
          <v-divider />

          <v-list-item @mouseover="entered = item.id">
            <template #prepend>
                <v-icon 
                    @click="store.dispatch('SELECTED', item.id)" 
                    :color="item.status.done ? 'default' : 'success'"
                >
                    mdi-check-circle
                </v-icon>
            </template>

            <v-list-item-title 
                :class="{'text-decoration-line-through': item.status.done}"
                v-text="item.name"
            />

            <template v-slot:append>
              <v-expand-x-transition>
                <v-icon
                    v-if="item.id === entered"
                    @click="store.dispatch('REMOVED', item.id)"
                    color="error"
                >
                    mdi-trash-can
                </v-icon>
              </v-expand-x-transition>
            </template>
          </v-list-item>
        </template>
      </v-slide-x-transition>
  
      </v-card-text>
  
      <v-divider class="mx-4 mb-1"></v-divider>
  
      <v-card-actions>
        <v-text-field
          v-model="task"
          :label="store.state.label"
          variant="solo"
          @keydown.enter="add"
        >
          <template #append-inner>
            <v-fade-transition>
              <v-btn
                v-show="task"
                icon="mdi-plus-circle"
                color="primary"
                variant="text"
                @click="add"
              ></v-btn>
            </v-fade-transition>
          </template>
        </v-text-field>

      </v-card-actions>
    </v-card>
  </template>

<script setup>
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import buttons from '@/utils/buttons.ts'

    const store = useStore();

    const task = ref('');

    const entered = ref(0)


    const add = () => {
        store.dispatch('ADD_TASK', task.value)
        task.value = ''
    }

    const handleClick = (e) => {
        let data = []
        switch (e) {
            case 3: data = store.getters.checked; break;
            case 4: data = store.state.data; break;
            default: data = []; break;
        }

        store.dispatch('REMOVE_ALL', data)
    }

</script>