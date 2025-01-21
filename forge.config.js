module.exports = {
    publishers: [
      {
        name: '@electron-forge/publisher-github',
        config: {
          repository: {
            owner: 'Barmaglote',
            name: 'electron-angular'
          },
          prerelease: false,
          draft: true
        }
      }
    ]
  }