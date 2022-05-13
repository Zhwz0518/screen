/**
 * @description 导出网络配置
 **/
const network = {
  //默认的接口地址 如果是开发环境和生产环境走vab-mock-server，当然你也可以选择自己配置成需要的接口地址
  baseURL:
    // 'http://localhost:8888',

    process.env.NODE_ENV === 'development'
      ? 'http://192.168.1.101:8303'
      : //  ? 'http://192.168.31.37:8888'
        'https://test.njdgsoft.com:8080',
  //配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  //最长请求时间
  requestTimeout: 10000,
  //操作正常code，支持String、Array、int多种类型
  successCode: [200, 0, '200', '0'],
  //数据状态的字段名称
  statusName: 'code',
  //状态信息的字段名称
  messageName: 'msg',
}
module.exports = network
