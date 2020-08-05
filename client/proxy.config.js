module.exports = (remote) => [{
    context: [
        "/api/**",
    ],
    target: remote ? "https://DEV" : "http://localhost",
    changeOrigin: true,
    secure: false,
}];
