export default {
    /**
     * Base URL
     * @param state
     * @returns {null}
     */
    baseUrl(state) {
        return state.baseUrl;
    },

    rootPath(state) {
        return state.rootPath;
    },

    hasWriteAccess(state) {
        return state.hasWriteAccess;
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
