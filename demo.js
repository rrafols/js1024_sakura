// Inspiration from https://twitter.com/maxSigma_/status/1264900383081664514
q = d.createElement`canvas`
v = q.getContext`2d`

t = 0
B = []

w = a.width
h = a.height

// create an auxiliar canvas to draw the reflection

q.height = h

// butterfly encoded points (half)
p = "rlmhifgeefdgdigmgnhoipppmpjqhrhtixkzmzpyqvrr"

E = c.createLinearGradient(0, 0, 0, h)
E.addColorStop(0, '#114')
E.addColorStop(.5, '#8dd')
E.addColorStop(1, '#000')

F = c.createLinearGradient(0, 0, w, 0)
F.addColorStop(0, '#411')
F.addColorStop(1, '#002')

//randomize indexes so butterflies start flying randomly
o = [...Array(607).keys()].sort(_ => .5 - Math.random())

// draw a recursive tree
L = (x, y, l, n=0, i=0) => {
  v.lineWidth = 20 / ++i

  n += Math.cos(t * .01) * .01
  let x1 = x + l * Math.sin(n)
  let y1 = y - l * Math.cos(n)

  B[o[k++]] = [x1 - w/2, y1 - h/2]

  v.beginPath()
  v.moveTo(x, y)
  v.lineTo(x1, y1)
  v.stroke()

  l *= .7

  if(i<7) L(x1, y1, l, n - 1, i)
  if(i<5) L(x1, y1, l, n + 1, i)
  if(i<7) L(x1, y1, l, n + .4, i)
}

setInterval(_=>{
    // clear screen
    a.width = q.width = w

    // background
    c.fillStyle = E
    c.fillRect(0, 0, w, h)
    c.globalCompositeOperation = 'lighter'
    c.fillStyle = F
    c.fillRect(0, 0, w, h)

    // draw tree
    k = 0
    v.strokeStyle = v.fillStyle = '#f8c'
    v.globalAlpha = .5
    L(w/2, h/2, h/8)
    
    // draw butterflies
    for(; k--; v.fill()) {
      v.beginPath()
      for(i = 0; i < 80; v.lineTo(
                          500 * (B[k][0]*12 + x * C - z * S + 3*r * C) / zr + w/2, 
                          500 * (B[k][1]*12 + (j ? 80*Math.sin((x + k) / 200 + t * .1) : 0)) / zr + h/2)
                        ) {
                            
        x = -(p.charCodeAt(i++%44) - 99) * 20
        z = -(p.charCodeAt(i++%44) - 99) * 20

        x = i<44 ? x : -630 - x

        j = Math.max(t - 20 * k, 0)
        
        f = j ? (i * .1 + j) / 80 : 0
        r = Math.min(150 * f, 2000)
        C = Math.cos(f)
        S = Math.sin(f)

        zr = 6500 + x * S + z * C + r * S
      }
    }
    
    // blurred reflection
    for(i = 2; i--; c.restore()) {
      c.save()
      c.rect(0, i * h/2, w, h/2)
      c.clip()

      if (i) {
        c.filter = 'blur(2px)'
        c.scale(1,-1)
        c.translate(0,-h)
      }
      c.drawImage(q,0,0)
    }
    t += 5
})