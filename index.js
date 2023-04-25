const canvas = document.querySelector('canvas')
const c =  canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = .6

class Sprite {
  constructor({ position, velocity }) {
    this.position = position
    this.velocity = velocity
    this.height = 150
    this.lastKey
  }

  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, 50, this.height)
  }

  update() {
    this.draw()
    
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
    } else {
      this.velocity.y += gravity
    }
  }
}

const player = new Sprite(
  {
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 }
  }
)
const player2 = new Sprite(
  {
    position: { x: 400, y: 0 },
    velocity: { x: 0, y: 0 }
  }
)

player.draw()
player2.draw()

const keys ={
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowUp: { pressed: false }
}

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  player2.update()

  // Player movement
  player.velocity.x = 0
  if (keys.a.pressed && player.lastKey == 'a') {
    player.velocity.x = -4
  } else if (keys.d.pressed && player.lastKey == 'd') {
    player.velocity.x = 4
  }

  // Player2 movement
  player2.velocity.x = 0
  if (keys.ArrowLeft.pressed && player2.lastKey == 'ArrowLeft') {
    player2.velocity.x = -4
  } else if (keys.ArrowRight.pressed && player2.lastKey == 'ArrowRight') {
    player2.velocity.x = 4
  }
}

animate()

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true
      player.lastKey = 'd'
      break
    case 'a':
      keys.a.pressed = true
      player.lastKey = 'a'
      break 
    case 'w':
      player.velocity.y = -15
      break
    
    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      player2.lastKey = 'ArrowRight'
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      player2.lastKey = 'ArrowLeft'
      break 
    case 'ArrowUp':
      player2.velocity.y = -15
      break 
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 'w':
      keys.w.pressed = false
      break
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
    case 'ArrowUp':
      keys.ArrowUp.pressed = false
      break
  }
})