<template>
    <div class="modal-content fm-modal-delete">
        <div class="modal-header pdf-modal-header">
            <h5 class="modal-title">{{ filename }}</h5>
            <button type="button" class="btn-close" aria-label="Close" v-on:click="hideModal"></button>
        </div>
        <div class="modal-body pdf-modal-body" >
            <div id="pdf-wrapper">
                <vue-pdf-app
                    style="height: 70vh;"
                    :pdf="pdfSrc"
                    @pages-rendered="pagesRendered"
                    :config="pdfConfig"
                    theme="light"
                />
            </div>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';
import GET from '../../../http/get';
import VuePdfApp from "vue3-pdf-app";
// import this to use default icons for buttons
import "vue3-pdf-app/dist/icons/main.css";

export default {
    name: 'ViewPdfModal',
    components: {
        VuePdfApp,
    },
    mixins: [modal, translate],
    data() {
        return {
            pdfSrc: '',
            pdfConfig: {
                toolbar: false,
                secondaryToolbar: false,
            }
        };
    },
    mounted() {
        GET.getFileArrayBuffer(this.disk, this.path).then((response) => {
            const blob = new Blob([response.data], { type: 'application/pdf' });
            this.pdfSrc = URL.createObjectURL(blob);
        });
    },
    computed: {
        selectedItems() {
            return this.$store.getters['fm/selectedItems'];
        },
        path() {
            return this.selectedItems[0].path;
        },
        disk () {
            return this.$store.getters['fm/selectedDisk'];
        },
        filename () {
            return this.path.split('/').pop();
        }
    },
    methods: {
        /**
         * This hack is needed to prevent downloading with str + s and printing with str + p
         * @param pdfShizzle -> the pdf library
         */
        pagesRendered (pdfShizzle) {
            pdfShizzle.unbindWindowEvents();
        }

    },
};
</script>
<style lang="scss">
@import 'vue3-pdf-app/dist/icons/main';
.pdf-app {
    .toolbarField {
        margin: 4px 0 4px 0 !important;
        font-size: 12px !important;
        line-height: 14px !important;
        background-color: #3f4b5b !important;
        color: #d9d9d9 !important;
    }
    .splitToolbarButton {
        margin: 0 !important
    }
}
.pdf-modal-body,
.pdf-modal-header {
    padding: .5rem .7rem !important;
}
</style>