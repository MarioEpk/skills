const path = require('path');

module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "mocha": true
    },
    "globals": {
        fetch: "off",
    },
    "settings": {
        "propWrapperFunctions": ["forbidExtraProps", "exact", "Object.freeze"],
        "import/resolver": {
            "node": {
                "paths": [path.resolve(__dirname, "src")]
            }
        }
    },
    "rules": {
        "no-mixed-operators": [2, { "allowSamePrecedence": true }],
        "react/no-did-mount-set-state": 0, // necessary for server-rendering
        // indents
        "indent": ["error", 4, {
            "SwitchCase": 1,
            "VariableDeclarator": 1,
            "outerIIFEBody": 1
        }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],

        "max-len": ["error", 200],
        // quotes should be project specific
        "quotes": 0,

        "no-console": ["error", {"allow": ["error"]}],
        "import/no-named-as-default": 0,
        // weird behavior
        "import/no-extraneous-dependencies": 0,
        "react/jsx-filename-extension": ["warn", {"extensions": [".js", ".jsx"]}],
        // too much edge cases https://github.com/eslint/eslint/issues/2023
        "new-cap": 0,
        // no need for radix for decimal numbers
        "radix": ["error", "as-needed"],
        // no spaces inside {}
        "object-curly-spacing": ["error", "never"],
        "object-curly-newline": ["error", { "consistent": true }],
        // parentheses around => params
        "arrow-parens": ["error", "always"],
        // due to package conventions and constants which sometimes contain only NAME
        "import/prefer-default-export": "off",
        // we want onClick handlers even for divs
        "jsx-a11y/no-static-element-interactions": "off",
        // imports first, but not relative after absolute
        "import/imports-first": ["error", "absolute-first"],
        // too much problems
        "react/forbid-prop-types": "off",
        // nonsense
        "jsx-a11y/aria-role": "off",
        // we cover this by git
        "linebreak-style": "off",
        // we prefer top-down approach
        "no-use-before-define": "off",
        // broken https://github.com/yannickcr/eslint-plugin-react/issues/1389
        "react/no-typos": "off",
        // React router https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/339
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ ],
            "specialLink": [ "to", "hrefLeft", "hrefRight" ],
            "aspects": [ "noHref", "invalidHref", "preferButton" ]
        }],
        // is already disabled in eslint-config-moro
        "no-else-return": ["off"],
        "react/jsx-props-no-spreading": ["off"],

        /* WARNINGS */
        "react/jsx-key": "warn"
    }
};
