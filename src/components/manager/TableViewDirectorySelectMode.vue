<template>
    <div class="fm-table">
        <table class="table table-sm">
            <thead>
                <tr>
                    <th class="w-65" v-on:click="sortBy('name')">
                        {{ lang.manager.table.name }}
                        <template v-if="sortSettings.field === 'name'">
                            <i class="bi bi-sort-down" v-show="sortSettings.direction === 'down'" />
                            <i class="bi bi-sort-up" v-show="sortSettings.direction === 'up'" />
                        </template>
                    </th>
                    <th class="w-auto" text-align="right">Aktion</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(directory, index) in directories" v-bind:key="`d-${index}`">
                    <tr
                        v-if="isSelectable(directory)"
                        class="flex-row align-items-center"
                        v-bind:class="{ 'table-info': checkSelect('directories', directory.path), 'selectable': isSelectable(directory) }"
                        v-on:click="selectDirectory(directory.path)"
                    >
                        <td
                            class="fm-content-item unselectable align-middle"
                            v-bind:class="acl && directory.acl === 0 ? 'text-hidden' : ''"
                        >
                            <i class="bi bi-folder"></i> {{ directory.basename }}
                        </td>
                        <td class="align-middle">
                            <button
                                class="btn btn-outline-success btn-sm"
                                @click.stop="emitSelect(directory)"
                            >
                                <i class="bi bi-check-square" v-show="sortSettings.direction === 'up'"></i>
                                Auswählen
                            </button>
                        </td>
                    </tr>
                    <tr
                        v-else
                        v-on:click="selectDirectory(directory.path)"
                    >
                        <td
                            class="fm-content-item unselectable"
                            v-bind:class="acl && directory.acl === 0 ? 'text-hidden' : ''"
                            colspan="2"
                        >
                            <i class="bi bi-folder"></i> {{ directory.basename }}
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import translate from '../../mixins/translate';
import helper from '../../mixins/helper';
import managerHelper from './mixins/manager';
import * as bootstrap from 'bootstrap';

export default {
    name: 'table-view-directory-select-mode',
    mixins: [translate, helper, managerHelper],
    props: {
        manager: { type: String, required: true },
    },
    computed: {
        /**
         * Sort settings
         * @returns {*}
         */
        sortSettings() {
            return this.$store.state.fm[this.manager].sort;
        },
        isInSelectMode() {
            return this.$store.getters['fm/settings/isSelectMode']
        },
    },
    methods: {
        /**
         * Sort by field
         * @param field
         */
        sortBy(field) {
            this.$store.dispatch(`fm/${this.manager}/sortBy`, { field, direction: null });
        },
        emitSelect(item) {
            this.$store.dispatch(`fm/${this.$store.state.fm.activeManager}/emitSelect`, { path: item });
        },
        isSelectable (directory) {
            if (directory.isUsedbyConstructionArchive) {
                return false;
            }
            return true;
        },
    },
};
</script>

<style lang="scss">
#fm {
    .fm-table {
        thead th {
            background: white;
            position: sticky;
            top: 0;
            z-index: 10;
            cursor: pointer;
            border-top: none;

            &:hover {
                background-color: #f8f9fa;
            }

            & > i {
                padding-left: 0.5rem;
            }
        }

        td {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        tr:hover {
            background-color: #f8f9fa;
        }

        .w-10 {
            width: 10%;
        }

        .w-65 {
            width: 65%;
        }

        .fm-content-item {
            cursor: pointer;
            max-width: 1px;
        }

        .text-hidden {
            color: #cdcdcd;
        }
        .bl2-unselectable * {
            cursor: not-allowed;
            color: #cdcdcd
        }
    }
}
</style>
