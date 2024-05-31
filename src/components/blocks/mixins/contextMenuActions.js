import HTTP from '../../../http/get';

/**
 * Context menu actions
 * {name}Action
 */
export default {
    methods: {
        /**
         * Add to cart
         */
        addToCartAction() {
            this.$store.dispatch(`fm/${this.$store.state.fm.activeManager}/addToCart`, {
                files: this.selectedItems,
                recordId: this.$store.getters[`fm/settings/recordId`],
                recordType: this.$store.getters[`fm/settings/recordType`],
            });
        },

        /**
         * Mark item as Content Index
         */
        setAsContentIndexAction() {
            this.$store.dispatch(`fm/${this.$store.state.fm.activeManager}/setAsContentIndex`, {
                file: this.selectedItems[0],
            });
        },

        /**
         * Open folder
         */
        openAction() {
            // select directory
            this.$store.dispatch(`fm/${this.$store.state.fm.activeManager}/selectDirectory`, {
                path: this.selectedItems[0].path,
                history: true,
            });
        },

        /**
         * Play music or video
         */
        audioPlayAction() {
            // show player modal
            this.$store.commit('fm/modal/setModalState', {
                modalName: 'AudioPlayerModal',
                show: true,
            });
        },

        /**
         * Play music or video
         */
        videoPlayAction() {
            // show player modal
            this.$store.commit('fm/modal/setModalState', {
                modalName: 'VideoPlayerModal',
                show: true,
            });
        },

        /**
         * View file
         */
        viewAction() {
            const item = this.selectedItems[0];
            const extension = item.extension.toLowerCase();

            // show image
            const cb = () => {
                if (this.$store.state.fm.settings.imageExtensions.includes(extension)) {
                    // show image
                    this.$store.commit('fm/modal/setModalState', {
                        modalName: 'PreviewModal',
                        show: true,
                        callback: cb
                    });
                } else if (extension === 'pdf') {
                    // show pdf document
                    this.$store.dispatch('fm/openPDF', {
                        disk: this.selectedDisk,
                        path: item.path,
                    });
                }
                livewire.emit('viewedFile', item.path);
            }
            if (!sessionStorage.getItem('hasAcceptedTerms') || sessionStorage.getItem('hasAcceptedTerms') !== 'true') {
                this.$store.commit('fm/modal/setModalState', {
                    modalName: 'AcceptTermsModal',
                    show: true,
                    callback: cb,
                });
                return;
            }
            cb();

        },



        viewContentIndexAction() {
            const item = this.selectedItems[0];
            // if item is not contentindex return
            if (item.path !== this.$store.getters['fm/settings/contentIndex']) {
                return;
            }
            const extension = item.extension.toLowerCase();
            // show, play..
            if (this.$store.state.fm.settings.imageExtensions.includes(extension)) {
                // show image
                this.$store.commit('fm/modal/setModalState', {
                    modalName: 'PreviewModal',
                    show: true,
                });
            } else if (extension === 'pdf') {
                // show pdf document
                this.$store.dispatch('fm/openPDF', {
                    disk: this.selectedDisk,
                    path: item.path,
                });
            }
        },

        /**
         * Edit file
         */
        editAction() {
            // show text file
            this.$store.commit('fm/modal/setModalState', {
                modalName: 'TextEditModal',
                show: true,
            });
        },

        /**
         * Select file
         */
        selectAction() {
            // file callback
            this.$store
                .dispatch('fm/url', {
                    disk: this.selectedDisk,
                    path: this.selectedItems[0].path,
                })
                .then((response) => {
                    if (response.data.result.status === 'success') {
                        this.$store.state.fm.fileCallback(response.data.url);
                    }
                });
        },

        /**
         * Download file
         */
        downloadAction() {
            const tempLink = document.createElement('a');
            tempLink.style.display = 'none';
            tempLink.setAttribute('download', this.selectedItems[0].basename);

            // download file with authorization
            if (this.$store.getters['fm/settings/authHeader']) {
                HTTP.download(this.selectedDisk, this.selectedItems[0].path).then((response) => {
                    tempLink.href = window.URL.createObjectURL(new Blob([response.data]));
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                });
            } else {
                tempLink.href = `${this.$store.getters['fm/settings/baseUrl']}download?disk=${
                    this.selectedDisk
                }&path=${encodeURIComponent(this.selectedItems[0].path)}`;
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
            }
        },

        /**
         * Copy selected items
         */
        copyAction() {
            // add selected items to the clipboard
            this.$store.dispatch('fm/toClipboard', 'copy');
        },

        /**
         * Cut selected items
         */
        cutAction() {
            // add selected items to the clipboard
            this.$store.dispatch('fm/toClipboard', 'cut');
        },

        /**
         * Rename selected item
         */
        renameAction() {
            // show modal - rename
            this.$store.commit('fm/modal/setModalState', {
                modalName: 'RenameModal',
                show: true,
            });
        },

        /**
         * Paste copied or cut items
         */
        pasteAction() {
            // paste items in the selected folder
            this.$store.dispatch('fm/paste');
        },

        /**
         * Zip selected files
         */
        zipAction() {
            // show modal - Zip
            this.$store.commit('fm/modal/setModalState', {
                modalName: 'ZipModal',
                show: true,
            });
        },

        /**
         * Unzip selected archive
         */
        unzipAction() {
            // show modal - Unzip
            this.$store.commit('fm/modal/setModalState', {
                modalName: 'UnzipModal',
                show: true,
            });
        },

        /**
         * Delete selected items
         */
        deleteAction() {
            // show modal - delete
            this.$store.commit('fm/modal/setModalState', {
                modalName: 'DeleteModal',
                show: true,
            });
        },

        /**
         * Show properties for selected items
         */
        propertiesAction() {
            // show modal - properties
            this.$store.commit('fm/modal/setModalState', {
                modalName: 'PropertiesModal',
                show: true,
            });
        },
    },
};
