// 七牛云文件上传

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

const validateConfig =config => {
	const { uptoken, uploadUrl, domain, name } = config;
	if (!name) {
		throw new Error('bucket name is required');
	}
	else if (!domain) {
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

export class QiniuUpload {
  constructor (config = {}) {
    this._config = validateConfig(config)
  }

  uploadFile (file, options = {}) {
    const { uploadUrl, uptoken } = this._config
    const { key, onProgress } = options
    const formData = new FormData()
    formData.append('token', uptoken)
    formData.append('file', file)
    if (key) {
      formData.append('key', key)
    }
    return fetch(uploadUrl, {
      method: 'POST',
      body: formData
    }, onProgress).then(data => renderResponse(this._config, data))
  }
}

export default function qiniuRequest (config) {
  const qnUpload = new QiniuUpload(config)
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
