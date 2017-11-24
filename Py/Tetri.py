import pygame
import sys
import random
import math
import time


grey = (50, 50, 50)  # Se tiene que declarar colores
white = (0, 0, 0)
blue = (0, 0, 255)
red = (255, 0, 0)
green = (0, 255, 0)

tam = 40
row = 16
col = 10
grid = []
for i in range(0, row):  # grid 2D
    f = []
    for j in range(0, col):
        f.append(0)
    grid.append(f)

for u in range(0, col):
    grid[15][u] = 2


class Bloque:
    def __init__(self, tempX, tempY):
        self.x = tempX
        self.y = tempY
        self.state = True

    def colision(self):
        if(grid[self.y][self.x] == 1 or grid[self.y][self.x] == 2):
            return True

    def move(self, increx, increy):
        self.y += increy
        self.x += increx

    def rotacion(ejex, ejey):
        self.r = (self.y - ejey) + ejex
        self.u = (-1) * (self.x - ejex) + ejey
        self.x = self.r
        self.y = self.u

    def show(self):
        screen.fill(red, rect=[self.x * tam, self.y * tam, tam, tam])


def darForma(q):
    form = []
    if q == 0:  # linea
        for i in range(0, 4):
            form.append(Bloque(i + 3, 0))
    elif q == 1:  # cubo
        for i in range(0, 2):
            form.append(Bloque(i + 3, 0))
        for i in range(0, 2):
            form.append(Bloque(i + 3, 1))
    elif q == 2:  # L
        for i in range(0, 3):
            form.append(Bloque(i + 3, 0))
        form.append(Bloque(3, 1))
    elif q == 3:  # T
        for i in range(0, 3):
            form.append(Bloque(i + 3, 0))
        form.append(Bloque(i + 2, 1))
    elif q == 4:  # lineas seguidas
        for i in range(0, 2):
            form.append(Bloque(i + 3, 0))
        for j in range(0, 2):
            form.append(Bloque(j + 4, 1))
    return form


bloque = darForma(random.randrange(4))
prev = darForma(random.randrange(4))


def main():
    # setup
    pygame.init()
    screen = pygame.display.set_mode((400, 600))
    clock = pygame.time.Clock()
    state = True
    tam = 40
    increx = 0

    while state:  # main loop
        screen.fill(grey)
        for event in pygame.event.get():  # manejo eventos
            if event.type == pygame.QUIT:
                state = False
                return
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_d:
                    increx = 1
                if event.key == pygame.K_a:
                    increx = -1

        for i in range(0, len(blocks)):
            for j in range(len(blocks[i]) - 1, 0, -1):
                blocks[i][j].show()
                if blocks[i][j].state == True:
                    blocks[i][j].move(increx)
                    blocks[i][j].colision()

        increx = 0

        pygame.display.update()
        clock.tick(5)


main()
pygame.quit()
sys.exit()
