
module.exports = {
    path: 'uploader',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Uploader'));
        })
    }
}