const core = require('@actions/core');
const github = require('@actions/github');

try {
	core.setOutput("version", 1);

	const payload = JSON.stringify(github.context.payload, undefined, 2)
	console.log(`The event payload: ${payload}`);
} catch (error) {
	core.setFailed(error.message);
}