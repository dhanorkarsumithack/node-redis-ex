import Redis  from "ioredis";

const redis = new Redis({
    'port':6379,
    'host':'127.0.0.1'
})

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}




const pub = () => {
    const message = JSON.stringify({ message: generateRandomString(10) }); 
    // const message = { message: Math.random() };

    const channel = 'channel1';
    redis.publish(channel, message); 
    console.log("Published %s to %s", message, channel);
};

setInterval(()=>{
  pub();
},1000)