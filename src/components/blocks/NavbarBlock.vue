<template>
    <div class="fm-navbar mb-3">
        <div class="row justify-content-between">
            <div class="col-auto">
                <div class="btn-group" role="group">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        v-on:click="refreshAll()"
                        v-bind:title="lang.btn.refresh"
                    >
                        <i class="bi bi-arrow-repeat"></i>
                    </button>
                </div>
                <div
                    v-if="$store.getters['fm/settings/hasWriteAccess']"
                    class="btn-group"
                    role="group"
                >
                    <button
                        type="button"
                        class="btn btn-secondary"
                        v-on:click="showModal('NewFolderModal')"
                        v-bind:title="lang.btn.folder"
                    >
                        <i class="bi bi-folder"></i>
                    </button>
                    <button
                        type="button"
                        class="btn btn-secondary"
                        disabled
                        v-if="uploading"
                        v-bind:title="lang.btn.upload"
                    >
                        <i class="bi bi-upload"></i>
                    </button>
                    <button
                        type="button"
                        class="btn btn-secondary"
                        v-else
                        v-on:click="showModal('UploadModal')"
                        v-bind:title="lang.btn.upload"
                    >
                        <i class="bi bi-upload"></i>
                    </button>
                    <button
                        type="button"
                        class="btn btn-secondary"
                        v-bind:disabled="!isAnyItemSelected"
                        v-on:click="showModal('DeleteModal')"
                        v-bind:title="lang.btn.delete"
                    >
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <div
                    v-if="$store.getters['fm/settings/hasWriteAccess']"
                    class="btn-group"
                    role="group"
                >
                    <button
                        type="button"
                        class="btn btn-secondary"
                        v-bind:disabled="!isAnyItemSelected"
                        v-bind:title="lang.btn.cut"
                        v-on:click="toClipboard('cut')"
                    >
                        <i class="bi bi-scissors"></i>
                    </button>
                    <button
                        type="button"
                        class="btn btn-secondary"
                        v-bind:disabled="!clipboardType"
                        v-bind:title="lang.btn.paste"
                        v-on:click="paste"
                    >
                        <i class="bi bi-clipboard"></i>
                    </button>
                </div>
            </div>
            <div
                v-if="$store.getters['fm/settings/hasWriteAccess']"
                class="col-auto text-right"
            >
                <div class="btn-group" role="group">
                    <button
                        v-if="isInSelectMode"
                        type="button"
                        class="btn btn-secondary"
                        v-on:click="endSelectMode"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                    <button
                        v-else
                        type="button"
                        class="btn btn-secondary"
                        v-on:click="changeRootPath"
                        v-tooltip="'Speicherort ändern'"
                    >
                        <i class="bi bi-crosshair"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import translate from '../../mixins/translate';
import EventBus from '../../emitter';

export default {
    name: 'NavbarBlock',
    mixins: [translate],
    data() {
        return {
            oldRootPath: '',
            oldDisk: '',
        }
    },
    computed: {
        /**
         * Active manager name
         * @returns {any}
         */
        activeManager() {
            return this.$store.state.fm.activeManager;
        },

        /**
         * Is any files or directories selected?
         * @returns {boolean}
         */
        isAnyItemSelected() {
            return (
                this.$store.state.fm[this.activeManager].selected.files.length > 0 ||
                this.$store.state.fm[this.activeManager].selected.directories.length > 0
            );
        },

        isInSelectMode () {
            return this.$store.getters['fm/settings/isSelectMode'];
            //return this.$store.state.fm[this.activeManager].isSelectMode;
        },

        /**
         * Manager view type - grid or table
         * @returns {any}
         */
        viewType() {
            return this.$store.state.fm[this.activeManager].viewType;
        },

        /**
         * Upload files
         * @returns {boolean}
         */
        uploading() {
            return this.$store.state.fm.messages.actionProgress > 0;
        },

        /**
         * Clipboard - action type
         * @returns {null}
         */
        clipboardType() {
            return this.$store.state.fm.clipboard.type;
        },

        /**
         * Full screen status
         * @returns {any}
         */
        fullScreen() {
            return this.$store.state.fm.fullScreen;
        },

        /**
         * Show or Hide hidden files
         * @returns {boolean}
         */
        hiddenFiles() {
            return this.$store.state.fm.settings.hiddenFiles;
        },
    },
    methods: {
        /**
         * Refresh file manager
         */
        refreshAll() {
            this.$store.dispatch('fm/refreshAll');
        },

        /**
         * Copy
         * @param type
         */
        toClipboard(type) {
            this.$store.dispatch('fm/toClipboard', type);

            // show notification
            if (type === 'cut') {
                EventBus.emit('addNotification', {
                    status: 'success',
                    message: this.lang.notifications.cutToClipboard,
                });
            } else if (type === 'copy') {
                EventBus.emit('addNotification', {
                    status: 'success',
                    message: this.lang.notifications.copyToClipboard,
                });
            }
        },

        /**
         * Paste
         */
        paste() {
            this.$store.dispatch('fm/paste');
        },

        /**
         * Set Hide or Show hidden files
         */
        toggleHidden() {
            this.$store.commit('fm/settings/toggleHiddenFiles');
        },

        /**
         * Show modal window
         * @param modalName
         */
        showModal(modalName) {
            // show selected modal
            this.$store.commit('fm/modal/setModalState', {
                modalName,
                show: true,
            });
        },

        /**
         * Select view type
         * @param type
         */
        selectView(type) {
            if (this.viewType !== type) this.$store.commit(`fm/${this.activeManager}/setView`, type);
        },

        changeRootPath() {
            const cb = () => {
                this.oldRootPath = `${this.$store.getters['fm/settings/rootPath']}`;
                this.$store.commit('fm/settings/manualSettings', {
                    rootPath: '',
                    selectedDisk: 'bauarchive',
                    isSelectMode: true,
                });
                this.$store.dispatch('fm/tree/initTree', { disk: 'bauarchive' });
            }

            this.$store.commit('fm/modal/setModalState', {
                modalName: 'RootPathChangeWarningModal',
                show: true,
                callback: cb,
            });
        },

        endSelectMode() {
            this.$store.commit('fm/settings/manualSettings', {
                rootPath: this.oldRootPath,
                selectedDisk: 'bauarchive',
                isSelectMode: false,
            });

            this.$store.dispatch('fm/tree/initTree', { disk: 'bauarchive', path: this.oldRootPath });

            this.$store.commit('fm/left/setDisk', 'bauarchive');
            this.$store.commit('fm/right/setDisk', 'bauarchive');

            this.$store.dispatch('fm/left/selectDirectory', { path: this.oldRootPath, history: false });
            this.$store.dispatch('fm/right/selectDirectory', { path: this.oldRootPath, history: false });

        },

        /**
         * Full screen toggle
         */
        screenToggle() {
            const fm = document.getElementsByClassName('fm')[0];

            if (!this.fullScreen) {
                if (fm.requestFullscreen) {
                    fm.requestFullscreen();
                } else if (fm.mozRequestFullScreen) {
                    fm.mozRequestFullScreen();
                } else if (fm.webkitRequestFullscreen) {
                    fm.webkitRequestFullscreen();
                } else if (fm.msRequestFullscreen) {
                    fm.msRequestFullscreen();
                }
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }

            this.$store.commit('fm/screenToggle');
        },
    },
};
</script>

<style lang="scss">
#fm {
    .fm-navbar {
        flex: 0 0 auto;

        .col-auto > .btn-group:not(:last-child) {
            margin-right: 0.4rem;
        }
    }
}
</style>
