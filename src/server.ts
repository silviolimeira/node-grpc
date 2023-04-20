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

const handlers: ChatServiceHandlers = {
    Chat: (call, callback) => {
        const { chatId, message } = call.request;
        console.log(call.request);
        callback(null, {
            id: chatId, answer: {
                id: 1,
                message: message,
                createdAt: new Date().toISOString()
            },
            createdAt: new Date().toISOString(),
        })
    }
}

const server = new grpc.Server();
server.addService(proto.chat_package.ChatService.service, handlers);

server.bindAsync('0.0.0.0:5000', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Server running at http://localhost:5000`);
    server.start();
})


//console.log("Hello World! 1")

