<template>
    <div class="modal-content fm-modal-delete">
        <div class="modal-header">
            <h5 class="modal-title">Bestätigen</h5>
            <button type="button" class="btn-close" aria-label="Close" v-on:click="hideModal"></button>
        </div>
        <div class="modal-body">
            <p>
               Soll der Pfad "{{ selectedItemPath }}" als Speicherort gesetzt werden?
            </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-light" v-on:click="deny">Abbrechen</button>
            <button type="button" class="btn btn-success" v-on:click="accept">Bestätigen</button>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';

export default {
    name: 'SetRootPathConfirmModal',
    mixins: [modal, translate],
    computed: {
        /**
         * Files and folders for deleting
         * @returns {*}
         */
        selectedItems() {
            return this.$store.getters[`fm/modal/modalData`].selectedItems;
        },
        selectedItemPath () {
            return this.$store.getters[`fm/modal/modalData`].selectedItems?.path;
        }
    },
    methods: {
        /**
         * Delete selected directories and files
         */
        accept() {
            this.$store.getters[`fm/modal/modalCallback`]();
            this.hideModal();
        },

        deny(){
            sessionStorage.removeItem('hasAcceptedTerms');
            this.hideModal();
        }
    },
};
</script>
