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

	console.log(filePath)
	console.log(path.basename(filePath), path.extname(filePath))

	core.setOutput("version", 1);

	const payload = JSON.stringify(github.context.payload, undefined, 2)
	console.log(`The event payload: ${payload}`);
} catch (error) {
	core.setFailed(error.message);
}