import mutations from './mutations';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            // modal window
            showModal: false,

            // modal name
            modalName: null,

            modalCallback: null,

            // main modal block height
            modalBlockHeight: 0,
        };
    },
    mutations,
    getters,
};

