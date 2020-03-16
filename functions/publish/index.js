const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  console.log("Received publish command!")
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: 'oQxIc0Tyf0CbfJ3d1SENn_Racbm0',
      page: 'index/index',
      lang: 'zh_CN',
      data: {
        thing3: {
          value: '一年级(3)班'
        },
        date1: {
          value: '2015年01月05日'
        },
        name2: {
          value: 'TIT创意园'
        },
        thing4: {
          value: '广州市新港中路397号'
        },
        thing6: {
          value: '全体同学必做'
        }
      },
      templateId: 'KhaxRzQyVS5rcpNhxGCPqKzYxJdgtZz4nnFQc-9P17U',
      miniprogramState: 'developer'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}