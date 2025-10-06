import Box from "../../components/example/exmaple.js"

const box1 = new Box("blue", 200);
const box2 = new Box("black", 200);
const box3 = new Box("red", 100);

const container =  document.querySelector("#boxContainer")
// document.querySelector("#boxContainer").append(box1.element)
// document.querySelector("#boxContainer").append(box2.element)
// document.querySelector("#boxContainer").append(box3.element)
box1.render("#boxContainer");
box2.render("#boxContainer");
box3.render("#boxContainer");


console.log("it working bruv")

