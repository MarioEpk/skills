module.exports = {
    presets: [
        ["@babel/env", {
            useBuiltIns: "entry",
            corejs: "3",
            targets: [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 edge version",
                "last 1 opera version",
                "last 1 safari version",
            ],
            modules: false,
        }],
        "@babel/react",
    ],
    plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
    ],
    env: {
        development: {
            presets: [["@babel/preset-react", {development: true}]],
        },
        production: {
            plugins: [
                ["transform-react-remove-prop-types", {
                    removeImport: true,
                    additionalLibraries: ["react-immutable-proptypes"],
                }],
                "@babel/plugin-transform-react-constant-elements",
            ],
        },
        test: {
            presets: [
                "@babel/env",
            ],
            plugins: [
                ["@babel/plugin-transform-runtime", {
                    regenerator: true,
                }],
                ["module-resolver", {
                    root: ["src"],
                }],
            ],

        },
    },
};
