let messagae : string = "Hello,Hana!";
console.log(messagae);
let answer = "yes | No |maybe"
let userId :string | number
answer = "yes"
userId = 12345
userId =  "userId_101"
function greet(userId: string | number){
    if (typeof userId === 'number') {
        return `Hello, User ID: ${userId}!`;
    } else {
        return `Hello, User: ${userId}!`;
    }
}
console.log(greet(userId));
