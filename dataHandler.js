const { Octokit } = require("@octokit/rest");
const JiraApi = require('jira-client');
require('dotenv').config();
const { response } = require("express");
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  baseUrl: "https://api.github.com",
  log: {
    debug: () => {},
    info: () => {},
    warn: console.warn,
    error: console.error,
  },
  request: {
    agent: undefined,
    fetch: undefined,
    timeout: 0,
  },
});

const jiraTitles = [
  "Create a public repository under your GitHub account",
  "Create a new script file, and import it into index.html and add a console log",
  "JavaScript: Variables",
  "JavaScript: Event Listeners - Add Toggle Button Inside of Modal",
  "JavaScript: Functions - Write a function to toggle hidden class on modal",
];
const jiraLinks = [
  "https://totalwine.atlassian.net/browse/TT-2",
  "https://totalwine.atlassian.net/browse/TT-16",
  "https://totalwine.atlassian.net/browse/TT-17",
  "https://totalwine.atlassian.net/browse/TT-18",
  "https://totalwine.atlassian.net/browse/TT-19",
];
const jiraTemplate = { icon: "bi bi-check-circle-fill" };
const errorJiraTemplate = { icon: "bi bi-x-circle" };
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function getIcon() {
  let rNum = getRandomInt(3);
  return rNum >= 1 ? jiraTemplate : errorJiraTemplate;
}
class DataHandler {
  constructor(links, titles) {
    this.links = links;
    this.titles = titles;
    this.jirasObject = [];
    this.createJiraObject();
    this.fetchGitHubData();
  }
  createJiraObject() {
    for (let i = 0; i < this.titles.length; i++) {
      let icon = getIcon();
      this.jirasObject.push({
        link: this.links[i],
        title: this.titles[i],
        ...icon,
      });
    }
  }

  fetchGitHubData() {
    let jirasArray =[];
    return new Promise((resolve) => {

      const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
      });
      octokit.rest.repos.listCommits({
        owner: "mamutjan0909",
        repo: "engineering-training",
      })
      .then((response) => {
        for (let index = 0; index < 20; index++) {
        console.log("Commit Message: ", response.data[index].commit.message);
        const regex = /([A-Z][A-Z0-9]+-[0-9]+)/g;
const jiraNumber = response.data[index].commit.message.match(regex);
console.log(jiraNumber[0]);
if (jiraNumber != null && jiraNumber[0] && jirasArray.indexOf(jiraNumber[0]) == -1) {
  jirasArray.push(jiraNumber[0]);
}
        }
        console.log(jirasArray);
      });
      resolve();
    });
  }   
}

var jira = new JiraApi({
  protocol: "https",
  host: "totalwine.atlassian.net",
  username: process.env.JIRA_USERNAME,
  password: process.env.JIRA_TOKEN,
  apiVersion: "2",
  strictSSL: false,
});

jira
  .findIssue("TT-152")
  .then(function (issue) {
    console.log("Status: " + issue.fields.status.name);
  })
  .catch(function (err) {
    console.error(err);
  });

const dataHandler = new DataHandler(jiraLinks, jiraTitles);

module.exports = dataHandler;
