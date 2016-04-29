
module.exports = {
    path: 'monitor',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Monitor'));
        })
    }
}