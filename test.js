// // console.log(random)
// for (let i = 0; i < 100; i++) {
//     const random = parseInt(Math.random() * 10 + 19);
//     console.log(random)
// }


const hobby = [
    "JavaScript",
    "Reading",
    "Coding",
    "Travelling",
    "Cooking",
    "Painting",
    "Singing and dancing"
]
const randomHobby = Math.floor(Math.random() * (hobby.length - 1));
for (let i = 0; i < hobby.length; i++) {
    console.log(hobby[randomHobby])
}