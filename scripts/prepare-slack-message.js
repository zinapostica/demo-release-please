#!/usr/bin/env node

/**
 * Script to generate Slack payload for release notifications
 * Creates a properly formatted JSON payload for Slack API
 */


// Create the Slack payload
const slackPayload = {
  blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `🚀 New Release: ${process.env.TAG_NAME}`
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Repository:* ${process.env.REPOSITORY}`
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Release Notes:*\n${process.env.RELEASE_BODY}`
      }
    }
  ]
};

// Output the complete JSON payload
console.log(`slack_payload=${JSON.stringify(slackPayload)}`);