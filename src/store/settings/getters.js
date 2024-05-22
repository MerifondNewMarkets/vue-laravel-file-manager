export default {
    /**
     * Base URL
     * @param state
     * @returns {null}
     */
    baseUrl(state) {
        return state.baseUrl;
    },

    /**
     * The Path to the base directory of the current record.
     * This is used to lock the user in the given subdirectory.
     * Passed in to the root element from where the app is mounted
     * @param {*} state
     * @returns string
     */
    rootPath(state) {
        return state.rootPath;
    },

    /**
     * The Laravel Model Name of the current Record
     * @Todo Check if this is still needed
     * Passed in to the root element from where the app is mounted
     * @param {*} state
     * @returns {string}
     */
    recordType(state) {
        return state.recordType;
    },


    /**
     * The ID of the current record
     * Passed in to the root element from where the app is mounted
     * @Todo Check if this is still needed
     * @param {*} state
     * @returns {string}
     */
    recordId(state) {
        return state.recordId;
    },

    /**
     * Check if the current laravel user has write access
     * Passed in to the root element from where the app is mounted
     * @param {*} state
     * @returns {boolean}
     */
    hasWriteAccess(state) {
        return state.hasWriteAccess;
    },

    /**
     * This is filled with the content index file path of the current record
     * Passed in to the root element from where the app is mounted
     * @param {*} state
     * @returns {string} the path to the content index file
     */
    contentIndex(state) {
        return state.contentIndex;
    },

    /**
     * Is the Vue App used to select a path or to browse files
     * Passed in to the root element from where the app is mounted
     * @param {*} state
     * @returns {boolean}
     */
    isSelectMode(state) {
        return state.isSelectMode;
    },

    /**
     * Headers
     * @param state
     * @return {*}
     */
    headers(state) {
        return state.headers;
    },

    /**
     * Headers has Authorization
     * @param state
     * @return {boolean}
     */
    authHeader(state) {
        return Object.prototype.hasOwnProperty.call(state.headers, 'Authorization');
    },
};
