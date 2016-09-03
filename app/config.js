module.exports = {
  name: 'PB',
  year: new Date().getFullYear(),
  paths: {
    wiki: './posts/wiki',
    blog: './posts/blog',
    other: './posts/others'
  },
  debug: process.env.NODE_ENV !== 'production'
}
