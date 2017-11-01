maxX = 2000
minX = 50
maxY = 2500
minY = 1100
scaleAndOffset <- function(x,y) {
  soX = (x-minX)/(minX-maxX)
  soY = (y-minY)/(minY-maxY)
  return(c(soX,soY))
}

