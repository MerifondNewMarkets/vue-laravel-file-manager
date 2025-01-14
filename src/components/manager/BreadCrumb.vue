<template>
    <div class="fm-breadcrumb">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb" v-bind:class="[manager === activeManager ? 'active-manager' : 'bg-light']">
                <li class="breadcrumb-item" v-on:click="selectMainDirectory">
                    <span class="badge bg-secondary">
                        <i class="bi bi-hdd"></i>
                    </span>
                </li>
                <li
                    class="breadcrumb-item text-truncate"
                    v-for="(item, index) in computedBreadcrumb"
                    v-bind:key="index"
                    v-bind:class="[computedBreadcrumb.length === index + 1 ? 'active' : '']"
                    v-on:click="selectDirectory(index)"
                >
                    <span>{{ item }}</span>
                </li>
            </ol>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'BreadCrumb',
    props: {
        manager: { type: String, required: true },
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
         * Selected Disk for this manager
         * @returns {any}
         */
        selectedDisk() {
            return this.$store.state.fm[this.manager].selectedDisk;
        },

        /**
         * Selected directory for this manager
         * @returns {any}
         */
        selectedDirectory() {
            return this.$store.state.fm[this.manager].selectedDirectory;
        },

        /**
         * Breadcrumb
         * @returns {*}
         */
        computedBreadcrumb() {
            var breadCrumbString = (structuredClone(this.$store.getters[`fm/${this.manager}/breadcrumb`]) || []).join('/');
            if (this.$store.getters[`fm/settings/rootPath`] !== '/') {
                breadCrumbString = breadCrumbString.replace(this.$store.getters[`fm/settings/rootPath`], '');
            }
            return (breadCrumbString ?? '')
                .replace(/^\//,'') // poor mans ltrim('/') works because replace only matches first occurance
                .split('/');
        },
        breadCrumb () {
            return this.$store.getters[`fm/${this.manager}/breadcrumb`];
        }
    },
    methods: {
        /**
         * Load selected directory
         * @param index
         */
        selectDirectory(index) {
            var breadCrumbLength = this.$store.getters[`fm/${this.manager}/breadcrumb`].length;
            var displayedBreadCrumbLength = this.computedBreadcrumb.length;
            var offset = breadCrumbLength - displayedBreadCrumbLength;
            index = offset + index;
            const path = this.breadCrumb.slice(0, index + 1).join('/');

            // only if this path not selected
            if (path !== this.selectedDirectory) {
                // load directory
                this.$store.dispatch(`fm/${this.manager}/selectDirectory`, { path, history: true });
            }
        },

        /**
         * Select main directory
         */
        selectMainDirectory() {
            if (this.selectedDirectory) {
                this.$store.dispatch(`fm/${this.manager}/selectDirectory`, { path: this.$store.state.fm.settings.rootPath, history: true });
            }
        },
    },
};
</script>

<style lang="scss">
#fm {
    .fm-breadcrumb {
        .breadcrumb {
            flex-wrap: nowrap;
            padding: 0.2rem 0.3rem;
            margin-bottom: 0.5rem;

            &.active-manager {
                background-color: #cff4fc;
            }

            .breadcrumb-item:not(.active):hover {
                cursor: pointer;
                font-weight: normal;
                color: #6c757d;
            }
        }
    }
}
</style>
