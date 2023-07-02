import { createStore } from "vuex";

interface status {
    done: boolean
}
interface data {
    id: number,
    name: string,
    status: status
}

const store = createStore({
  state() {
    return {
        title: 'Vue ToDo List',
        footer_text: 'This application uses browser\'s Local Storage to store data',
        label: 'New Task',
        data: [
            {
                id: 1,
                name: 'Do something awesome',
                status: {done: false}
            },
                {
                id: 2,
                name: 'Buy toilet paper',
                status: {done: false}
            },
                {
                id: 3,
                name: 'Learn Vue',
                status: {done: false}
            },
        ],
        selected: [],
        new_id: 0
    };
  },

  getters: {
    checked(state) {
        return state.data.filter(x => x.status.done)
    }
  },

  actions: {
    LOAD({state}) {
        window.localStorage.setItem('todo', JSON.stringify(state.data))

        let id:number = state.new_id
        if(state.data !== undefined && state.data.length > 0) {
            const new_data = [...state.data]
            const last_index = new_data.pop()
            id = last_index?.id || 0
        }

        state.new_id = id + 1
        
    },
    ADD_TASK({state, dispatch}, name: string) {
        state.data.push({
            id: state.new_id,
            name,
            status: {done: false}
        });

        dispatch('LOAD')
    },
    SELECTED({state, dispatch}, id: number) {
        const data = state.data.find((x) => x.id === id)
        console.log(data)
        if(data !== undefined) data.status.done = !data.status.done

        dispatch('LOAD')
    },
    REMOVED({state, dispatch}, id:number) {
        state.data = state.data.filter((x) => x.id !== id)

        dispatch('LOAD')
    },
    REMOVE_ALL({state, dispatch}, items:Array<data>) {
        for(const item of items) state.data = state.data.filter((x) => x.id !== item.id)
    }
  }

});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});