import Redis  from "ioredis";

const redis = new Redis({
    'port':6379,
    'host':'127.0.0.1'
})


const sub = () => {
    redis.subscribe('channel1', (err, count) => {
        if (err) {
            console.error("Failed to subscribe: %s", err.message);
        } else {
            console.log(`Subscribed successfully to ${count} channels`);
        }
    });

    
};

redis.on("message", (channel, message) => {
    console.log(`Received ${message} from ${channel}`);
});

setInterval(()=>{
    sub();
},1000)
