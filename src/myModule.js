const message = 'Some message from my module.js';
const name = 'Jeevan';
const location = 'Tirupati';

const getGreeting = (name,course) => {
    return `Hello ${name} welcome to ${course}`
}


export { message, name, getGreeting , location as default };