import paho.mqtt.client as mqtt
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import os

# Set up AWS IoT connection
aws_client = AWSIoTMQTTClient("bridge-client")
aws_client.configureEndpoint("a3renj0pxty5ve-ats.iot.us-east-1.amazonaws.com", 8883)
aws_client.configureCredentials("./certs/AmazonRootCA1.pem", "./certs/private.pem.key", "./certs/certificate.pem")
aws_client.connect()

# Handle messages from all chargers
def on_message(client, userdata, msg):
    topic_parts = msg.topic.split("/")  # {charger_id}/in
    if len(topic_parts) >= 2:
        charger_id = topic_parts[0]
        aws_topic = f"{charger_id}/in"
        print(f"Forwarding to AWS topic: {aws_topic}")
        print(f"Forwarding to AWS topic: {msg.payload.decode()}")
        aws_client.publish(aws_topic, msg.payload.decode(), 1)

# Local Mosquitto broker setup
local_mqtt = mqtt.Client()
local_mqtt.username_pw_set("charger", "password")
local_mqtt.connect("localhost", 1883, 60)
local_mqtt.subscribe("+/in")
local_mqtt.on_message = on_message
local_mqtt.loop_forever()