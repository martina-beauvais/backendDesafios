module.exports = {
    apps: [
        {
            name: 'Server 1',
            script: 'server.js',
            env: {
                PORT: 8081
            }
        },
        {
            name: 'Server 2',
            script: 'server.js',
            env: {
                PORT: 8082
            }
        },
        {
            name: 'Server 3',
            script: 'server.js',
            exec_mode: 'cluster',
            instances: 2
        }
    ]
}