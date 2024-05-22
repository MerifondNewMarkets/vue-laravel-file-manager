<template>
    <div class="fm-content d-flex flex-column">
        <bread-crumb v-bind:manager="manager" />
        <div class="fm-content-body">
            <component
                v-if="viewType === 'table'"
                :is="tableViewType"
                v-bind:manager="manager"
            />
            <grid-view v-else v-bind:manager="manager" />
        </div>
    </div>
</template>

<script>
// Components
import BreadCrumb from './BreadCrumb.vue';
import TableView from './TableView.vue';
import GridView from './GridView.vue';
import TableViewDirectorySelectMode from './TableViewDirectorySelectMode.vue';

export default {
    name: 'Manager',
    components: {
        BreadCrumb,
        TableView,
        TableViewDirectorySelectMode,
        GridView,
    },
    props: {
        manager: { type: String, required: true },
    },
    computed: {
        /**
         * view type - grid or table
         * @returns {any}
         */
        viewType() {
            return this.$store.state.fm[this.manager].viewType;
        },
        tableViewType() {
            return this.$store.getters['fm/settings/isSelectMode'] ? 'TableViewDirectorySelectMode' : 'TableView';
        },
    },
};
</script>

<style lang="scss">
#fm {
    .fm-content {
        padding-left: 1rem;

        .fm-content-body {
            overflow: auto;
        }
    }
}
</style>
