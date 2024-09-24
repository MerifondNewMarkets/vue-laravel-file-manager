<template>
    <transition name="fm-modal">
        <div class="fm-modal modal" :class="modalClass" ref="fmModal" v-on:click="hideModal">
            <div class="modal-dialog" role="document" v-bind:class="modalSize" v-on:click.stop>
                <component v-bind:is="modalName" />
            </div>
        </div>
    </transition>
</template>

<script>
import NewFileModal from './views/NewFileModal.vue';
import NewFolderModal from './views/NewFolderModal.vue';
import UploadModal from './views/UploadModal.vue';
import DeleteModal from './views/DeleteModal.vue';
import ClipboardModal from './views/ClipboardModal.vue';
import StatusModal from './views/StatusModal.vue';
import RenameModal from './views/RenameModal.vue';
import PropertiesModal from './views/PropertiesModal.vue';
import PreviewModal from './views/PreviewModal.vue';
import TextEditModal from './views/TextEditModal.vue';
import AudioPlayerModal from './views/AudioPlayerModal.vue';
import VideoPlayerModal from './views/VideoPlayerModal.vue';
import ZipModal from './views/ZipModal.vue';
import UnzipModal from './views/UnzipModal.vue';
import AboutModal from './views/AboutModal.vue';
import AcceptTermsModal from './views/AcceptTermsModal.vue';
import ViewPdfModal from './views/ViewPdfModal.vue';

export default {
    name: 'ModalBlock',
    components: {
        NewFileModal,
        NewFolderModal,
        UploadModal,
        DeleteModal,
        AcceptTermsModal,
        ViewPdfModal,
        ClipboardModal,
        StatusModal,
        RenameModal,
        PropertiesModal,
        PreviewModal,
        TextEditModal,
        AudioPlayerModal,
        VideoPlayerModal,
        ZipModal,
        UnzipModal,
        AboutModal,
    },
    mounted() {
        // set height
        this.$store.commit('fm/modal/setModalBlockHeight', this.$refs.fmModal.offsetHeight);
    },
    computed: {
        /**
         * Selected modal name
         * @returns {null|*}
         */
        modalName() {
            return this.$store.state.fm.modal.modalName;
        },

        modalClass () {
            return this.modalName.replace(/[^a-z0-9]/g, function(s) {
                var c = s.charCodeAt(0);
                if (c == 32) return '-';
                if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
                return '__' + ('000' + c.toString(16)).slice(-4);
            });
        },


        /**
         * Modal size style
         * @returns {{'modal-lg': boolean, 'modal-sm': boolean}}
         */
        modalSize() {
            return {
                'modal-xl': this.modalName === 'PreviewModal' || this.modalName === 'TextEditModal',
                'modal-lg': this.modalName === 'VideoPlayerModal' || this.modalName === 'ViewPdfModal' || this.modalName === 'AcceptTermsModal',
                'modal-sm': false,
            };
        },
    },
    methods: {
        /**
         * Hide modal window
         */
        hideModal() {
            this.$store.commit('fm/modal/clearModal');
        },
    },
};
</script>

<style lang="scss">
#fm {
    div.fm-modal {
        position: absolute;
        z-index: 9998;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.35);
        display: block;
        transition: opacity 0.4s ease;
        overflow: auto;

        .modal-xl {
            max-width: 96%;
        }
    }

    .fm-modal-enter-active,
    .fm-modal-leave-active {
        transition: opacity 0.5s;
    }

    .fm-modal-enter,
    .fm-modal-leave-to {
        opacity: 0;
    }
}
</style>
