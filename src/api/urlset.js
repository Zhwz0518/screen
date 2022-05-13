module.exports = {
  // 基础环境
  basicURL:
    process.env.NODE_ENV === 'development'
      ? 'http://221.226.107.214:7001'
      : 'http://221.226.107.214:7001',
  LZH:
    process.env.NODE_ENV === 'development'
      ? 'http://192.168.1.187:83'
      : 'http://192.168.1.187:8303',
  ZWL:
    process.env.NODE_ENV === 'development'
      ? 'http://192.168.1.187:83'
      : 'http://192.168.1.105:8301',
  WHL:
    process.env.NODE_ENV === 'development'
      ? 'http://192.168.1.187:83'
      : 'http://192.168.1.105:8302',
  //mock
  mockURL:
    process.env.NODE_ENV === 'development'
      ? 'vab-mock-server'
      : 'vab-mock-server',
  // 上传图片地址
  uploadURL:
    process.env.NODE_ENV === 'development'
      ? 'http://221.226.107.214:7002'
      : 'http://221.226.107.214:7002',
  // 图片访问地址
  imageURL:
    process.env.NODE_ENV === 'development'
      ? 'http://124.71.205.107:8001/api/image?path='
      : 'http://124.71.205.107:8001/api/image?path=',
}
