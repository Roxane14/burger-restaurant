import './style.css'

const canvas = document.getElementById('game') as HTMLCanvasElement
const ctx = canvas.getContext('2d')!

canvas.width = 800
canvas.height = 600

const chefImg = new Image()
chefImg.src = '/src/assets/chef.png'

const clientImg = new Image()
clientImg.src = '/src/assets/client.png'

let showDialogue = false

chefImg.onload = () => {  
  clientImg.onload = () => {
    draw()
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Fond
  ctx.fillStyle = '#f9dca5'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Cuisinière
  ctx.drawImage(chefImg, 350, 400, 100, 100)

  // Client
  ctx.drawImage(clientImg, 350, 100, 100, 100)

  // Dialogue
  if (showDialogue) {
    ctx.fillStyle = 'white'
    ctx.fillRect(320, 220, 160, 60)
    ctx.strokeRect(320, 220, 160, 60)
    ctx.fillStyle = 'black'
    ctx.font = '14px sans-serif'
    ctx.fillText('Bonjour ! Un burger svp.', 330, 250)
  }
}

canvas.addEventListener('click', (e) => {
  const x = e.offsetX
  const y = e.offsetY

  // Zone cliquée autour du client
  if (x >= 350 && x <= 450 && y >= 100 && y <= 200) {
    showDialogue = true
    draw()
    setTimeout(() => {
      showDialogue = false
      draw()
    }, 2000)
  }
})
