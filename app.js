const mongoose = require('mongoose');

// checks to see if the server is connected
mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB').then(
  () => { 
     console.log("Connected to DB!");
 },
  err => { 
    console.log(err);
 }
);

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "please check entry no name specified"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
})


// these objects abide to the fruit schema from above plus what is the directory name
const Fruit = mongoose.model("Fruit", fruitSchema)


// new fruit instance
const fruit = new Fruit ({
    name: "Apple",
    rating: 8.5,
    review: "most are awesome!"
})

// fruit.save();

const humanSchema = new mongoose.Schema({
    name: String,
    age: Number,
    occupation: String,
    favouriteFruit: fruitSchema
})

const Human = mongoose.model("Human", humanSchema)

const pineapple = new Fruit ({
    name: "Pineapple",
    score: 9,
    review: "Miya loves sour ;)"
})

// pineapple.save();

const human = new Human ({
    name: "Miya",
    age: 19,
    occupation: "babegy",
    favouriteFruit: pineapple
})

human.save();


// const kiwi = new Fruit ({
//     name: "Kiwi",
//     score: 9,
//     review: "i love sour"
// })

// const orange = new Fruit ({
//     name: "Orange",
//     score: 9.3,
//     review: "i love sour and sweet"
// })

// const watermelon = new Fruit ({
//     name: "Watermelon",
//     score: 10,
//     review: "top d o g"
// })

// Fruit.insertMany([kiwi, orange, watermelon], function(err){
//     if (err) {
//         console.log("err");
//     } else {
//         console.log("success")
//     }
// })

// Human.deleteMany({name: "John"}, function(err){
//     if (err) {
//     console.log(err);
// } else {
//     console.log("succesful removal of john :)");
// }
// })

Fruit.find(function(err, fruits){
    if (err) {
        console.log("err");
    } else {
        mongoose.connection.close();

        for (let i = 0; i < fruits.length; i++) {
            console.log(fruits[i].name);
        }
    }
})
