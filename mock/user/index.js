const { Router } = require('express')
const Mock = require('mockjs')
const router = new Router()
const userInfo = () => {
  return Mock.mock({
    code: 200,
    data: {
      id: '@id',
      displayName: '@cname',
      token: '@uuid',
      avatar: '@img(48x48, @color)',
      'role|1': [
        0,
        1,
        2
      ]
    }
  })
}
router
  .post('/api/user/login', (req, res) => {
    // 这里应该去判断req.body
    res.json(userInfo())
  })

module.exports = router