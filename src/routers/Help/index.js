
module.exports = {
    path: 'help',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Help'));
        })
    }
}