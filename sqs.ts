import { SQS, SQSClient } from '@aws-sdk/client-sqs';

// const s2 = new SQSClient({
//     region: 'eu-west-1'
// });
// s2.send(...);

const sqs = new SQS({
    region: 'eu-west-1'
});
const QueueUrl = 'https://sqs.eu-west-1.amazonaws.com/605889970968/mh-test';

(async () => { 
    // const res = await sqs.createQueue({
    //     QueueName: 'mh-test'
    // });
    // console.log(res);
    
    console.time('send');
    const sent = await sqs.sendMessage({
        QueueUrl,
        MessageBody: 'Hello world!'
    })
    console.log('sent', sent);
    console.timeEnd('send');

    console.time('recv');
    const msg = await sqs.receiveMessage({
        QueueUrl,
        WaitTimeSeconds: 3,
        MaxNumberOfMessages: 3,
    });
    console.timeEnd('recv');

    for (const m of (msg.Messages || [])) {
        console.log('message', m);

        console.log('deleted', await sqs.deleteMessage({
            QueueUrl,
            ReceiptHandle: m.ReceiptHandle
        }));
    }

})();
