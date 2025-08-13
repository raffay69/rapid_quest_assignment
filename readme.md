# WhatsApp Web Clone with Real-time Updates

## Overview

This project replicates the core functionalities of WhatsApp Web, allowing real-time conversations and status updates using MongoDB Change Streams and Socket.io.

## Features

- **Payload Processor**  
  Reads incoming payloads and stores them in the database in a structured format.  
  Processes status payloads to update message statuses using `message_id`.

- **Frontend**  
  A visually similar clone of WhatsApp Web.  
  Displays all conversations grouped by `wa_id` (renamed to `conversation_id`).

- **Sending Messages**  
  Allows sending new messages that are stored in the appropriate conversation based on `wa_id`.

- **Real-time Updates**  
  Implemented using MongoDB Change Streams to listen for database changes.  
  Changes are emitted to the frontend using Socket.io for real-time UI updates without refreshing.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.io

## How It Works

1. **Message Handling**: Payload processor captures and formats data, storing it into MongoDB.
2. **Status Updates**: Status payloads are used to update existing messages.
3. **Real-time Flow**:
   - MongoDB Change Stream detects new/updated/deleted data.
   - Backend emits events through Socket.io.
   - Frontend listens for these events and updates instantly.

## Note : 
- in the given payload files , the conversation_1_message_1 and conversation_1_status_1 are the same.
- Hence saved the first message with "sent" status
