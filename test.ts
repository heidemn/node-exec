#!/usr/bin/env -S npx ts-node@10.4.0
// npx ts-node-dev test.ts

import * as crypto from "crypto";
//import * as SQS from 'aws-sdk/clients/sqs';
import { SQS, SQSClient } from "@aws-sdk/client-sqs";

const sqs = new SQS({
});
const sqs2 = new SQSClient({
});

const x = 42;
console.log("It works!", crypto.randomUUID());

(async () => {
    console.log(1);
    await sqs.receiveMessage({
        QueueUrl: "43434",
        AttributeNames: [],
        MaxNumberOfMessages: 42,
        MessageAttributeNames: [],
    }).catch(e => console.error(e));
    console.log(2);
})();

