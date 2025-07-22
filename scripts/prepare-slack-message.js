#!/usr/bin/env node

/**
 * Script to generate Slack payload for release notifications
 * Creates a properly formatted JSON payload for Slack API
 */

function convertToSlackFormat(markdown) {
  let text = markdown;
  
  // Convert GitHub headers to bold text with clickable links
  text = text.replace(/^## \[([^\]]+)\]\([^)]+\) \(([^)]+)\)$/gm, '*$1 ($2)* - <${process.env.HTML_URL}|View Release>');
  text = text.replace(/^### (.+)$/gm, '*$1*');
  
  // Convert GitHub links to Slack links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<$2|$1>');
  
  // Convert bullet points (keep as is, Slack supports them)
  text = text.replace(/^\* (.+)$/gm, '• $1');
  
  return text.trim();
}

// Convert the release body to Slack-compatible format
const slackFormattedNotes = convertToSlackFormat(process.env.RELEASE_BODY);

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
        text: `*Release Notes:*\n${slackFormattedNotes}`
      }
    }
  ]
};

// Output the complete JSON payload
console.log(`slack_payload=${JSON.stringify(slackPayload)}`);