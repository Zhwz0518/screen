const accessTokens = {
  admin: 'admin-accessToken',
  editor: 'editor-accessToken',
  test: 'test-accessToken',
}

module.exports = [
  {
    url: 'api/login',
    type: 'post',
    response(config) {
      const { username } = config.body
      const accessToken = accessTokens[username]
      if (!accessToken) {
        return {
          code: 500,
          msg: '帐户或密码不正确',
        }
      }
      return {
        code: 200,
        msg: 'success',
        data: { accessToken },
      }
    },
  },
  {
    url: 'api/userInfo',
    type: 'post',
    response(config) {
      const { accessToken } = config.body
      let roles = ['admin']
      let ability = ['READ']
      let username = 'admin'
      if ('admin-accessToken' === accessToken) {
        roles = ['admin']
        ability = ['READ', 'WRITE', 'DELETE']
        username = 'admin'
      }
      if ('editor-accessToken' === accessToken) {
        roles = ['editor']
        ability = ['READ', 'WRITE']
        username = 'editor'
      }
      if ('test-accessToken' === accessToken) {
        roles = ['admin', 'editor']
        ability = ['READ']
        username = 'test'
      }
      return {
        code: 200,
        msg: 'success',
        data: {
          roles,
          ability,
          username,
          'avatar|1': [
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          ],
        },
      }
    },
  },
  {
    url: 'api/logout',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
]
