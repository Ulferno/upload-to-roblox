require('child_process').execSync("cd " + __dirname + " && npm install")

const core = require('@actions/core');
const github = require('@actions/github');

const fs = require('fs');
const path = require('path');
const {performance} = require('perf_hooks');

const axios = require('axios');

try {
	(async () => {
		const apiKey = core.getInput('api-key');
		const universeId = core.getInput('universeId');
		const placeId = core.getInput('placeId');
		const filePath = core.getInput('file');
		const shouldPublish = core.getBooleanInput('shouldPublish');

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

		const config = {
			method: 'POST',
			url: `https://apis.roblox.com/universes/v1/${universeId}/places/${placeId}/versions?versionType=${shouldPublish ? 'Published' : 'Saved'}`,
			headers: {
				'Content-Type': isXML ? 'application/xml' : 'application/octet-stream',
				'x-api-key': apiKey
			},
			data: stream,
			maxContentLength: Infinity,
			maxBodyLength: Infinity,
		}

		const startTime = performance.now()
		const response = await axios(config).catch(err => {
			console.warn("Error while uploading", err)
			console.log("Time to fail:", performance.now() - startTime, "ms")
			console.log("Response from Roblox:", err.response.data);
			
			core.setFailed(err);
		})
		const endTime = performance.now()

		if (response) {		
			console.log("Time to upload:", endTime - startTime, "ms")

			console.log('Uploaded to Roblox. Version:', response.data.versionNumber)

			core.setOutput('version', response.data.versionNumber);
		} else {
			core.setFailed('An unknown error occured');
		}
	})()
} catch (error) {
	core.setFailed(error.message);
}
