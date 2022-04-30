const Canvas = require("canvas")
const Discord = require("discord.js")
const background = "https://i.pinimg.com/736x/c0/27/f2/c027f251134cfe057a5b9019e0bfc444.jpg"

const dim = {
    height: 600,
    width: 870,
    margin: 10
}

const av = {
    size: 256,
    x: 80,
    y: 100
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size:av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    // draw in the background
    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg, 50, 56)

    // draw black tinted box 
    ctx.fillStyle = "rgba(0,0,0,0.5)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    // write in text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    // draw in Welcome
    ctx.font = "40px Roboto"
    ctx.fillText("Welcome", dim.width/2, dim.margin + 80)

    //draw in the username
    ctx.font = "50px Roboto"
    ctx.fillText(username + "#" + discrim, dim.width/2, dim.height - dim.margin - 175)

    // draw in to the server
    ctx.font = "30px Roboto"
    ctx.fillText("to the server", dim.width / 2, dim.height - dim.margin - 50)


    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = generateImage