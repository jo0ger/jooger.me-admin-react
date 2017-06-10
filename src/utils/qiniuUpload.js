// 七牛云文件上传
import Service from '~service'

const fetch = function fetch(url, options = {}, onProgress) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		xhr.open(options.method || 'get', url)
		Object.keys(options.headers || {}).forEach((key) => {
			xhr.setRequestHeader(key, options.headers[key])
		})
		xhr.onload = (ev) => {
			try { resolve(JSON.parse(ev.target.responseText)) }
			catch (err) { reject(err) }
		}
		xhr.onerror = reject
		if (xhr.upload && onProgress) {
			xhr.upload.onprogress = onProgress
		}
		xhr.send(options.body)
	})
}

const validateConfig = config => {
	const { uptoken, uploadUrl, domain } = config;
	if (!domain) {
		throw new Error('domain is required');
	}
  else if (!uploadUrl) {
    throw new Error('uploadUrl is required')
  }
	else if (!uptoken) {
		throw new Error('uptoken is required');
	}
	return config;
}

const renderResponse = (config, data) => {
  if (data.error) {
    throw new Error(data.error)
  }
  const { domain } = config
  const { hash, key } = data
  return {
    url: `${domain}/${key || hash}`
  }
}

/**
 * config 
 * 	uptoken
 * 	uploadUrl
 */
export class QiniuUpload {

  async uploadFile (file, options = {}) {
    const { key, onProgress } = options
		const { code, data } = await Service.qiniu.getConfig().catch(err => { throw new Error(err) })
		if (code) {
			return
		}
		const config = data
		validateConfig(config)
    const formData = new FormData()
    formData.append('token', config.uptoken)
    formData.append('file', file)
    if (key) {
      formData.append('key', key)
    }
    return fetch(config.uploadUrl, {
      method: 'POST',
      body: formData
    }, onProgress).then(data => renderResponse(config, data))
  }
}

export default function qiniuRequest () {
  const qnUpload = new QiniuUpload()
  return function customRequest (ref) {
    var handleProgress = ref.onProgress
		var onError = ref.onError
		var onSuccess = ref.onSuccess
		var filename = ref.file.name
		var file = ref.file
		qnUpload.uploadFile(file, {
			key: filename,
			onProgress: e => handleProgress({ percent: e.loaded / e.total })
		}).then(onSuccess).catch(onError)
  }
}
