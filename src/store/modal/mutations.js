export default {
    /**
     * Modal window state
     * @param state
     * @param show
     * @param modalName
     */
    setModalState(state, { show, modalName, callback }) {
        state.showModal = show;
        state.modalName = modalName;
        state.modalCallback = callback;
    },

    /**
     * Clear modal
     * @param state
     */
    clearModal(state) {
        state.showModal = false;
        state.modalName = null;
    },

    /**
     * Main modal block - set height
     * @param state
     * @param height
     */
    setModalBlockHeight(state, height) {
        state.modalBlockHeight = height;
    },
};
