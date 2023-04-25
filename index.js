const canvas = document.querySelector('canvas')
const c =  canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = .6

class Sprite {
  constructor({ position, velocity, color = 'blue', offset }) {
    this.position = position
    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.lastKey
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 100,
      height: 50
    }
    this.color = color
    this.isAttacking
  }

  draw() {
    c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

    // Attack Box
    if (this.isAttacking) {
      c.fillStyle = "green"
      c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }
  }

  update() {
    this.draw()
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x
    this.attackBox.position.y = this.position.y
    
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
    } else {
      this.velocity.y += gravity
    }
  }

  attack() {
    this.isAttacking = true
    setTimeout(() => {
      this.isAttacking = false
    }, 120)
  }
}

const player = new Sprite(
  {
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    color: 'blue',
    offset: {
      x: 0,
      y: 0
    }
  }
)
const player2 = new Sprite(
  {
    position: { x: 400, y: 0 },
    velocity: { x: 0, y: 0 },
    color: 'red',
    offset: {
      x: 50,
      y: 0
    }
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

  // Detect collision
  if (
    player.attackBox.position.x + player.attackBox.width>= player2.position.x
    && player.attackBox.position.x <= player2.position.x + player2.width
    && player.attackBox.position.y + player.attackBox.height >= player2.position.y
    && player.attackBox.position.y <= player2.position.y + player2.height
    && player.isAttacking
  ) {
    player.isAttacking = false
    console.log('P1 ATK landed')
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
    case 'f':
      player.attack()
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
    case 'Alt':
      player2.attack()
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