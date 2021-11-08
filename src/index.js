const core = require('@actions/core');
const github = require('@actions/github');

const fs = require('fs');
const path = require('path');

const axios = require('axios');

try {
	(async () => {
		const apiKey = core.getInput('api-key');
		const universeId = core.getInput('universeId');
		const placeId = core.getInput('placeId');
		const filePath = core.getInput('file');
		const shouldPublish = core.getInput('shouldPublish');

		const validPath = fs.existsSync(filePath);

		if (!validPath) {
			return core.setFailed('Invalid file path');
		}

		const extension = path.extname(filePath);
		if (!extension.match(/^((\.rbxl)|(\.rbxlx))$/g)) {
			return core.setFailed('Invalid file type');
		}

		const isXML = extension == '.rbxlx';
		const stream = fs.createReadStream(filePath);

		console.log('Uploading to Roblox')

		const response = await axios({
			method: 'POST',
			url: `https://apis.roblox.com/universes/v1/${universeId}/places/${placeId}/versions?versionType=${shouldPublish ? 'Published' : 'Saved'}`,
			headers: {
				'Content-Type': isXML ? 'application/xml' : 'application/octet-stream',
				'x-api-key': apiKey
			},
			data: stream
		})

		console.log('Uploaded to Roblox. Version:', response.data.versionNumber)

		core.setOutput('version', response.data.versionNumber);
	})()
} catch (error) {
	core.setFailed(error.message);
}