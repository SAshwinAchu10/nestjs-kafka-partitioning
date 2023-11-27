const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'test-kafka-server',
  brokers: ['localhost:29092']
})

const producer = kafka.producer()

const run = async () => {
  await producer.connect()
  await producer.send({
    topic: 'topic-test-3',
    messages: [
      { value: 'Hello Partition 0', key: '0', partition: 0 },
      { value: 'Hello Partition 1', key: '1', partition: 1 },
      { value: 'Hello Partition 2', key: '2', partition: 2 },
    ],
  })
  console.log('Sent');
  process.exit();
}

run().catch(console.error)
