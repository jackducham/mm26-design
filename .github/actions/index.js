const core = require('@actions/core');
const github = require('@actions/github');

// try {
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }

async function run() {
	try {
		const myToken = core.getInput('myToken');
		const pToken = core.getInput('pToken');
		const octokit = new github.GitHub(myToken);
		const octokit_p = new github.GitHub(pToken);
		const label = core.getInput('label');

		octokit.issues.addLabels({
			owner: github.context.payload.repository.owner.login,
			repo: github.context.payload.repository.name,
			issue_number: github.context.payload.issue.number,
			labels: [label]
		}).catch(function (rejection) {
			console.log(rejection);
		});

		octokit_p.projects.createCard({
			column_id: 6571174,
			content_id: github.context.payload.issue.number,
			content_type: "Issue"
		}).catch(function (rejection) {
			console.log(rejection);
		});
	}
	catch (error) {
		core.setFailed(error.message);
	}
}

run()