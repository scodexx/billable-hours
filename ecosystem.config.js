module.exports = {
    apps: [{
        name: 'billable-hours',
        script: 'npm',
        args: 'start:server',
        env: {
            NODE_ENV: 'production',
        },
    }],
};