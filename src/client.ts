import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { join } from 'path'
import { ProtoGrpcType } from 'rpc/chat';
import { ChatServiceHandlers } from 'rpc/chat_package/ChatService';

const packageDefinition = protoLoader.loadSync(
    join(__dirname, 'chat.proto')
);

const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

console.log(proto);

const client = new proto.chat_package.ChatService(
    'localhost:5000',
    grpc.credentials.createInsecure()
);

client.Chat({ chatId: 1, message: "Hello 1" }, (err, response) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(response);

})