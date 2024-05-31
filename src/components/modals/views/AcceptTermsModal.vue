<template>
    <div class="modal-content fm-modal-delete">
        <div class="modal-header">
            <h5 class="modal-title">Datenschutz!</h5>
            <button type="button" class="btn-close" aria-label="Close" v-on:click="hideModal"></button>
        </div>
        <div class="modal-body">
            <p>
                Die übergebenen Dokumente dürfen nur zur Erfüllung des vorgenannten Auftrags vewendet werden.
                Jegliche anderweitige Verwendung und Weitergabe an Dritte ist untersagt.
            </p>
            <p>
                Insbesondere dürfen die Dokumente nicht veröffentlicht, nur in begründeten Ausnahmefällen verfielfältigt, kopiert oder fotografiert werden.
            </p>
            <p>
                Die Dokumente sind durch den Empfänger vor dem Zugriff Unberechtigter zu schützen.
                Nach Beendigung des Auftrags müssen digital übergebene Dokumente vollständig gelöscht werden
            </p>
            <p>
                Sämtliche Dateizugriffe werden protokolliert und können im Bedarfsfall nachvollzogen werden.
            </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-light" v-on:click="deny">Abbrechen</button>
            <button type="button" class="btn btn-success" v-on:click="accept">Akzetieren und Dokument ansehen</button>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';

export default {
    name: 'AcceptTermsModal',
    mixins: [modal, translate],
    methods: {
        /**
         * Delete selected directories and files
         */
        accept() {
            this.$store.getters[`fm/modal/modalCallback`]();
            sessionStorage.setItem('hasAcceptedTerms', 'true');
        },

        deny(){
            sessionStorage.removeItem('hasAcceptedTerms');
            this.hideModal();
        }
    },
};
</script>
