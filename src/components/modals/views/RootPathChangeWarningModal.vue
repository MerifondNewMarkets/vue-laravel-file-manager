<template>
    <div class="modal-content fm-modal-delete">
        <div class="modal-header">
            <h5 class="modal-title">Achtung!</h5>
            <button type="button" class="btn-close" aria-label="Close" v-on:click="hideModal"></button>
        </div>
        <div class="modal-body">
            <p>
                <p>Die im Speicherort hinterlegten Dateien werden beim Wechseln des Speicherorts nicht kopiert oder verschoben.</p>
                <p>Laden Sie bitte die benötigten Dateien vor dem Wechsel herunter, und laden Sie diese dann erneut hoch, nachdem der Speicherort gewechselt wurde.</p>
                <p>Der Verweis auf die Datei im Inhaltsverzeichnis wird ebenfalls gelöscht. Das Inhaltsverzeichnis muss nach dem Wechsel des Speicherorts erneut festgelegt werden.</p>
                <p><b>Möchten Sie den Speicherort wechseln?</b></p>
            </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-light" v-on:click="deny">Abbrechen</button>
            <button type="button" class="btn btn-success" v-on:click="accept">Ja, neuen Speicherort festlegen</button>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';

export default {
    name: 'RootPathChangeWarningModal',
    mixins: [modal, translate],
    methods: {
        /**
         * Delete selected directories and files
         */
        accept() {
            this.$store.getters[`fm/modal/modalCallback`]();
            this.hideModal();
        },

        deny(){
            this.hideModal();
        }
    },
};
</script>
