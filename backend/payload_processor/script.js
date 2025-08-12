import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { messageModel } from "../models/message.model.js";
import mongoose from "mongoose";
import "dotenv/config";

async function payloadProcessor() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Whatsapp",
    });
    console.log("DB connected");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const payloadFolder = path.resolve(__dirname, "payloads");

    const payloadFiles = fs.readdirSync(payloadFolder);

    for (let file of payloadFiles) {
      const filePath = path.resolve(payloadFolder, file);
      const fileData = JSON.parse(fs.readFileSync(filePath));
      const value = fileData.metaData?.entry?.[0]?.changes?.[0]?.value;

      if (value?.messages?.length > 0) {
        console.log("this is a message file");

        const message = value.messages[0];
        const contact = value.contacts[0];
        const display_number = value.metadata.display_phone_number;

        // if "from" and "display_number" are same - outbound , else - inbound
        const direction =
          message.from === display_number ? "outbound" : "inbound";

        await messageModel.create({
          message_id: message.id,
          conversation_id: contact.wa_id,
          customer_name: contact.profile.name,
          direction: direction,
          content: message.text?.body,
          timestamp: new Date(Number(message.timestamp) * 1000),
        });

        console.log("added in DB");
      } else if (value?.statuses?.length > 0) {
        console.log("this is a status file");

        const status = value.statuses[0];

        await messageModel.updateOne(
          { message_id: status.id },
          { status: status.status }
        );
        console.log("statuses updated");
      }
    }
    await mongoose.disconnect();
    console.log("DB disconnected");
  } catch (e) {
    console.log(e.message);
  }
}

payloadProcessor();
