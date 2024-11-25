const AWSIoTData = require("aws-iot-device-sdk");
const dotenv = require("dotenv");

dotenv.config();

const device = AWSIoTData.device({
  region: process.env.IOT_REGION,
  protocol: "wss",
  accessKeyId: process.env.IOT_ACCESS_ID,
  secretKey: process.env.IOT_SECRET_KEY,
  host: process.env.IOT_ENDPOINT,
});

function subscribeToTopic(topic) {
  device.on("connect", function () {
    console.log("Connected to AWS IoT");
    device.subscribe(topic);
    console.log(`Subscribed to topic: ${topic}`);
  });

  device.on("message", function (topic, payload) {
    console.log("Received message:", topic, payload.toString());
  });

  device.on("error", function (error) {
    console.log("Error:", error);
  });
}

const init = async () => {
  try {
    const serialNumbers = process.env.SERIAL_NUMBERS?.split(",");

    for (const serialNumber of serialNumbers) {
      subscribeToTopic(`${serialNumber}/command/sub`);
      subscribeToTopic(`${serialNumber}/deviceConfig/sub`);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

init();
