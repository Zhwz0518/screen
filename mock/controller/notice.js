const data = [
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
    notice: '1',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
    notice: '2',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/0/15640_100.gif',
    notice: '2',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/9/15919_100.gif',
    notice: '3',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
    notice: '4',
  },
]
module.exports = [
  {
    url: '/notice/getList',
    type: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data,
      }
    },
  },
]
