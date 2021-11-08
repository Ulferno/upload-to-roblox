const core = require('@actions/core');
const github = require('@actions/github');

const fs = require('fs');
const path = require('path');

try {
	const apiKey = core.getInput('api-key');
	const experienceId = core.getInput('experienceId');
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

	console.log("isXML", isXML)

	core.setOutput("version", 1);
} catch (error) {
	core.setFailed(error.message);
}