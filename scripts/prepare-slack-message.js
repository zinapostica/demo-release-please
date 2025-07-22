#!/usr/bin/env node

/**
 * Script to generate Slack payload for release notifications
 * Creates a properly formatted JSON payload for Slack API
 */

function convertToSlackFormat(markdown) {
  let text = markdown;
  
  // Remove the version header line completely (the ## line)
  text = text.replace(/^## \[([^\]]+)\]\([^)]+\) \(([^)]+)\)$/gm, '');
  
  // Convert section headers to bold text
  text = text.replace(/^### (.+)$/gm, '*$1*');
  
  // Convert GitHub links to Slack links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<$2|$1>');
  
  // Convert bullet points (keep as is, Slack supports them)
  text = text.replace(/^\* (.+)$/gm, '• $1');
  
  // Remove extra newlines and clean up
  text = text.replace(/\n\n+/g, '\n\n').trim();
  
  return text;
}

// Convert the release body to Slack-compatible format
const slackFormattedNotes = convertToSlackFormat(process.env.RELEASE_BODY);

// Create the Slack payload
const slackPayload = {
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*🚀 New Release: <${process.env.HTML_URL}|${process.env.TAG_NAME}>* 🚀`
      }
    },
    {
      type: "divider"
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
        text: slackFormattedNotes
      }
    }
  ]
};

// Output the complete JSON payload
console.log(`slack_payload=${JSON.stringify(slackPayload)}`);