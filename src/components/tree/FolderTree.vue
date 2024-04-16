<template>
    <div class="fm-tree">
        <ul class="fm-tree-branch">
            <li>
                <p
                    v-if="rootItem"
                    class="root-item"
                    :class="{ selected: isDirectorySelected(rootItem.path) }"
                    @click="selectDirectory(rootItem.path)"
                >
                        <i class="bi bi-hdd"></i> {{ rootItemName }}
                </p>
                <branch v-bind:parent-id="parentId" />
            </li>
        </ul>
        <!-- <div class="fm-tree-disk sticky-top"><i class="bi bi-hdd"></i> {{ rootItemName }}</div> -->

    </div>
</template>

<script>
import Branch from './TreeBranch.vue';

export default {
    name: 'FolderTree',
    components: {
        branch: Branch,
    },
    computed: {
        /**
         * Selected Disk
         * @returns {*}
         */
        rootItemName() {
            if (this.$store.getters['fm/settings/rootPath']) {
                return `${this.$store.getters['fm/settings/rootPath']}`.split('/').pop();
            }
            return this.$store.getters['fm/selectedDisk'];
        },
        rootItem() {
            return this.$store.getters['fm/tree/directories'].find((item) => item.path === this.$store.getters['fm/settings/rootPath'])
        },
        parentId() {
            if (this.$store.getters['fm/settings/rootPath']) {
                return this.$store.getters['fm/tree/directories'].find((item) => item.path === this.$store.getters['fm/settings/rootPath'])?.id;
            }
            return this.$store.getters['fm/tree/directories'].find((item) => item.parentId === 0).id;
        },
        rootItemCssClass (item) {
            return this.$store.getters['fm/settings/rootPath'] ? 'fm-tree-disk sticky-top' : 'fm-tree-disk';
        }
    },
    methods: {
        /**
         * Check, is this directory selected?
         * @param path
         * @returns {boolean}
         */
         isDirectorySelected(path) {
            return this.$store.state.fm.left.selectedDirectory === path;
        },
        /**
         * Select directory
         * @param path
         */
        selectDirectory(path) {
            // only if this path not selected
            if (!this.isDirectorySelected(path)) {
                this.$store.dispatch('fm/left/selectDirectory', { path, history: true });
            }
        },
    },
};
</script>

<style lang="scss">
.root-item {
    cursor: pointer;
    &:hover,
    &.selected {
        background-color: #f8f9fa;

    }
}
.fm-tree {
    overflow: auto;
    border-right: 1px solid #6c757d;

    & > .fm-tree-branch {
        padding-left: 0;
    }

    .fm-tree-disk {
        padding: 0.2rem 0.3rem;
        background-color: #cff4fc;
    }

    .fm-tree-disk > i {
        padding-right: 0.4rem;
    }
}
</style>
