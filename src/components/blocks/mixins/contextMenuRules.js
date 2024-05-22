/**
 * Rules for context menu items (show/hide)
 * {name}Rule
 */
export default {
    methods: {
        /**
         * Open - menu item status - show or hide
         * @returns {boolean}
         */
        openRule() {
            return !this.multiSelect && this.firstItemType === 'dir';
        },

        /**
         * Open - menu item status - show or hide
         * @returns {boolean}
         */
        addToCartRule() {
            return true;
        },

        setAsContentIndexRule() {
            return this.$store.getters['fm/settings/hasWriteAccess'] &&
                this.selectedItems.length === 1 &&
                this.selectedItems[0].type === 'file' &&
                this.selectedItems[0].path !== this.$store.getters['fm/settings/contentIndex'];
        },

        viewContentIndexRule () {
            return this.selectedItems.length === 1 &&
                this.selectedItems[0].type === 'file' &&
                this.selectedItems[0].path === this.$store.getters['fm/settings/contentIndex'];
        },

        /**
         * Play audio - menu item status - show or hide
         * @returns {boolean}
         */
        audioPlayRule() {
            return (
                this.selectedItems.every((elem) => elem.type === 'file') &&
                this.selectedItems.every((elem) => this.canAudioPlay(elem.extension))
            );
        },

        /**
         * Play video - menu item status - show or hide
         * @returns {boolean}
         */
        videoPlayRule() {
            return !this.multiSelect && this.canVideoPlay(this.selectedItems[0].extension);
        },

        /**
         * View - menu item status - show or hide
         * @returns {boolean|*}
         */
        viewRule() {
            return !this.multiSelect && this.firstItemType === 'file' && this.canView(this.selectedItems[0].extension);
        },

        /**
         * Edit - menu item status - show or hide
         * @returns {boolean|*}
         */
        editRule() {
            if (!this.$store.getters['fm/settings/hasWriteAccess']) return false;
            return !this.multiSelect && this.firstItemType === 'file' && this.canEdit(this.selectedItems[0].extension);
        },

        /**
         * Select - menu item status - show or hide
         * @returns {boolean|null}
         */
        selectRule() {
            return !this.multiSelect && this.firstItemType === 'file' && this.$store.state.fm.fileCallback;
        },

        /**
         * Download - menu item status - show or hide
         * @returns {boolean}
         */
        downloadRule() {
            return !this.multiSelect && this.firstItemType === 'file';
        },

        /**
         * Copy - menu item status - show or hide
         * @returns {boolean}
         */
        copyRule() {
            if (!this.$store.getters['fm/settings/hasWriteAccess']) return false;
            return true;
        },

        /**
         * Cut - menu item status - show or hide
         * @returns {boolean}
         */
        cutRule() {
            if (!this.$store.getters['fm/settings/hasWriteAccess']) return false;
            return true;
        },

        /**
         * Rename - menu item status - show or hide
         * @returns {boolean}
         */
        renameRule() {
            if (!this.$store.getters['fm/settings/hasWriteAccess']) return false;
            return !this.multiSelect;
        },

        /**
         * Paste - menu item status - show or hide
         * @returns {boolean}
         */
        pasteRule() {
            if (!this.$store.getters['fm/settings/hasWriteAccess']) return false;
            return !!this.$store.state.fm.clipboard.type;
        },

        /**
         * Zip - menu item status - show or hide
         * @returns {boolean}
         */
        zipRule() {
            if (!this.$store.getters['fm/settings/hasWriteAccess']) return false;
            return this.selectedDiskDriver === 'local';
        },

        /**
         * Unzip - menu item status - show or hide
         * @returns {boolean}
         */
        unzipRule() {
            if (!this.$store.getters['fm/settings/hasWriteAccess']) return false;
            return (
                this.selectedDiskDriver === 'local' &&
                !this.multiSelect &&
                this.firstItemType === 'file' &&
                this.isZip(this.selectedItems[0].extension)
            );
        },

        /**
         * Delete - menu item status - show or hide
         * @returns {boolean}
         */
        deleteRule() {
            if (!this.$store.getters['fm/settings/hasWriteAccess']) return false;
            return true;
        },

        /**
         * Properties - menu item status - show or hide
         * @returns {boolean}
         */
        propertiesRule() {
            return !this.multiSelect;
        },
    },
};
