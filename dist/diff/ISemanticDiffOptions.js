"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultDiffOptions = void 0;
exports.defaultDiffOptions = {
    COMPARISON_THRESHOLD: 0.4,
    BASE_WEIGHT: 100,
    CONTENT_WEIGHT: 5,
    POSITION_WEIGHT: 1,
    COMMONALITY_WEIGHT: 4,
    EPSILON_PENALTY: 0.01,
    PATH_COMPARE_RANGE: 5,
    WEIGHT_BOOST_MULTIPLIER: 1,
    USE_CONTENT_HASH_FOR_PATH_COMPARISON: true,
    EXACT_EDIT_SCRIPT: true,
    ATTRIBUTE_GROUP_NAME: '@',
    TEXT_NODE_NAME: 'text()',
    ATTRIBUTE_NAME_PREFIX: '',
    DELTA_TAG: 'delta',
    PRETTY_XML: true
};
//# sourceMappingURL=ISemanticDiffOptions.js.map