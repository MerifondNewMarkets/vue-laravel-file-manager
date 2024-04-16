<template>
    <div class="fm-tree">
        <div class="fm-tree-disk sticky-top"><i class="bi bi-hdd"></i> {{ rootItem }}</div>
        <branch v-bind:parent-id="parentId" />
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
        rootItem() {
            if (this.$store.getters['fm/settings/rootPath']) {
                return this.$store.getters['fm/settings/rootPath'];
            }
            return this.$store.getters['fm/selectedDisk'];
        },
        parentId() {
            if (this.$store.getters['fm/settings/rootPath']) {
                return this.$store.getters['fm/tree/directories'].find((item) => item.path === this.$store.getters['fm/settings/rootPath'])?.id;
            }
            return 0;
        },
    },
};
</script>

<style lang="scss">
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
