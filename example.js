const { TrashGuy } = require("./src/trashguy")
const s = new TrashGuy('A B C')
for (const pos of s){
    console.log(pos)
}
