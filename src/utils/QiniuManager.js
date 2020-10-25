const qiniu = require('qiniu')

class QiniuManager {
  constructor (accessKey, secretKey, bucket) {
    this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    this.bucket = bucket

    this.config = new qiniu.conf.Config()
    this.config.zone = qiniu.zone.Zone_z0
    this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config);
  }

  uploadFile(key, localFilePath) {
    const options = {
      scope: this.bucket + ':' + key,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(this.mac)
    const formUploader = new qiniu.form_up.FormUploader(this.config)
    const putExtra = new qiniu.form_up.PutExtra()
    // 文件上传
    return new Promise((resolve, reject) => {
      formUploader.putFile(uploadToken, key, localFilePath, putExtra, this.handleCallback(resolve, reject));
    })
  }
  deleteFile (key) {
    this.bucketManager.delete(this.bucket, key, this.handleCallback(resolve, reject))
  }
  getBucketDomain () {
    const reqURL = `http://qpi.qiniu.com/v6/domain/list?tbl=${this.bucket}`
    const createToken = qiniu.util.generateAccessToken(this.mac, reqURL)
    return new Promise((resolve, reject) => {
      qiniu.rpc.postWithoutForm(reqURL, createToken, this.handleCallback(resolve, reject))
    })
  }
  generateDownloadLink(key) {
    const domainPromise = this.publicBucketDomain ? Promise.resolve([this.publicBucketDomain]) : this.getBucketDomain()
    return domainPromise.then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const pattern = /^https?/
        this.publicBucketDomain = pattern.test(data[0]) ? data[0] : `http://${data[0]}`
        return this.bucketManager.publicDownloadUrl(this.publicBucketDomain, key)
      } else {
        throw Error('域名未找到，请查看存储空间是否已经过期')
      }
    })
  }
  handleCallback(resolve, reject) {
    return (respErr, respBody, respInfo) => {
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode == 200) {
        resolve(respBody)
      } else {
        reject({
          statusCode: respInfo.statusCode,
          body: respBody
        })
      }
    }
    
  }
}

module.exports = QiniuManager