import pygame
import sys
import random
import math
import time
import copy

grey = (50, 50, 50)  # Se tiene que declarar colores
white = (0, 0, 0)
blue = (0, 0, 255)
red = (255, 0, 0)
green = (0, 255, 0)
tam = 40
row = 15
col = 10
#grid = []
blocks = []
pygame.init()
screen = pygame.display.set_mode((700, 600))
clock = pygame.time.Clock()
myfont = pygame.font.SysFont("Arial", 50)
colo0 = (random.randrange(100, 255), random.randrange(
     100, 255), random.randrange(100, 255))

# for i in range(0, row):  # grid 2D
#     f = []
#     for j in range(0, col):
#         f.append(0)
#     grid.append(f)



class Bloque:
    def __init__(self, tempX, tempY):
        self.x = tempX
        self.y = tempY

    def colision(self):
        if(self.y > 13 or grid[self.y + 1][self.x] != 0):
            return True

    def move(self, increx, increy):
        self.y += increy
        self.x += increx

    def rotacion(self, ejex, ejey):
        self.r = (self.y - ejey) + ejex
        self.u = (-1) * (self.x - ejey) + ejex
        self.x = self.r
        self.y = self.u

    def show(self):
        screen.fill(colo0, rect=[self.x * tam, self.y * tam, tam, tam])


def darForma(q):
    form = []
    if q == 0:  # linea
        for i in range(0, 4):
            form.append(Bloque(4, i))
    elif q == 1:  # cubo
        for i in range(0, 2):
            form.append(Bloque(i + 3, 0))
        for j in range(0, 2):
            form.append(Bloque(j + 3, 1))
    elif q == 2:  # L
        for i in range(0, 3):
            form.append(Bloque(i + 3, 0))
        form.append(Bloque(3, 1))
    elif q == 3:  # L invertida
        for i in range(0, 3):
            form.append(Bloque(i + 3, 0))
        form.append(Bloque(i + 2, 1))
    elif q == 4:  # T
        for i in range(0, 3):
            form.append(Bloque(i + 3, 0))
        form.append(Bloque(i + 2, 1))
    elif q == 5:  # lineas seguidas
        for i in range(1, 0, -1):
            form.append(Bloque(i + 3, 0))
        for j in range(0, 2):
            form.append(Bloque(j + 4, 1))
    elif q == 6:  # lineas seguidas
        for i in range(1, 0, -1):
            form.append(Bloque(i + 4, 0))
        for j in range(0, 2):
            form.append(Bloque(j + 3, 1))
    return form


def layout(score):
    screen.fill(grey)
    screen.fill((100, 150, 200), rect=[400, 0, 300, 600])
    screen.fill((255, 255, 255), rect=[450, 100, 200, 100])
    screen.fill((255, 255, 255), rect=[450, 360, 200, 200])
    Puntaje = myfont.render("Score", 1, green)
    screen.blit(Puntaje, (470, 30))
    punt = str(score)
    Score = myfont.render(punt, 1, green)
    screen.blit(Score, (500, 130))
    for i in range(0, len(prev)):
        prev[i].x += 9
        prev[i].y += 10
        prev[i].show()
        prev[i].x -= 9
        prev[i].y -= 10
    for i in range(0, len(grid)):#muestra grid==1
        for j in range(0, len(grid[i])):
            if(grid[i][j] == 1):
                screen.fill(colo0, rect=[j * tam, i * tam, tam, tam])


def filallena(score):
    co = 0
    fi = 14
    fj = 0
    te = 0
    while(fi >= 0):
        while(fj < len(grid[fi])):
            if(grid[fi][fj] != 0):
                co += 1
            fj += 1
        if (co >= 10):
            te = fi
            while(te > 0):
                grid[te] = grid[te - 1][:]
                te -= 1
            score += 10
            co = 0
        else:
            fi -= 1
            co = 0
        fj = 0
    return score
def setup():
    colo0 = (random.randrange(100, 255), random.randrange(
        100, 255), random.randrange(100, 255))
    global grid
    grid=[]
    for i in range(0, row):  # grid 2D
        f = []
        for j in range(0, col):
            f.append(0)
        grid.append(f)
    global score
    score=0

def main():
    setup()
    contadores = [0, 0, 0, 0]
    #[0]=abajo en y;[1] tecla abajo ; [2]=teclas dere izq ; [3]=rotacion
    left = True
    right = True
    permrot = 0
    permcrear = True
    abaleft = True
    state = True
    tam = 40
    colo0 = (random.randrange(100, 255), random.randrange(
        100, 255), random.randrange(100, 255))
    increx = 0
    increy = 0

    global score
    score = 0
    global bloque
    bloque = darForma(random.randrange(4))
    global prev
    prev = darForma(random.randrange(4))

    while state:  # main loop
        layout(score)
        coli = False
        contadores[0] += 1
        contadores[1] += 1
        contadores[2] += 1
        contadores[3] += 1

        for i in range(0, len(bloque)):  # revisar la colision
            if(bloque[i].colision() == True):
                coli = True
            if(bloque[i].x <= 0 or grid[bloque[i].y][bloque[i].x - 1] ==1):
                left = False
                permrot += 1
            if(bloque[i].x >= 9 or grid[bloque[i].y][bloque[i].x + 1] ==1):
                right = False
                permrot += 1
            if(bloque[i].y - 1 < 0):
                permrot += 1

        if(contadores[0] > 40):  # movimiento en y timeout
            increy = 1
            contadores[0] = 0

        for event in pygame.event.get():  # manejo eventos/ keyboard
            if event.type == pygame.QUIT:
                state = False
                return
            if event.type == pygame.KEYDOWN:
                # flecha derecha "d"
                if event.key == pygame.K_d and right == True and contadores[2] > 5:
                    increx += 1
                    increy = 0
                    contadores[2] = 0
                    abaleft = False
                right = True
                # flecha izquierda "a"
                if event.key == pygame.K_a and left == True and contadores[2] > 5:
                    increx -= 1
                    increy = 0
                    contadores[2] = 0
                    abaleft = False
                left = True
                # flecha abajo "s"
                if (event.key == pygame.K_s and contadores[1] > 10):
                    increy += 1
                    contadores[1] = 0
                # rotacion "w"
                abaleft = True
                if (event.key == pygame.K_w and contadores[3] > 15 and permrot < 2):
                    for i in range(len(bloque) - 1, -1, -1):
                        bloque[i].rotacion(bloque[1].x, bloque[1].y)
                    contadores[3] = 0
                permrot = 0

        # Solo si no hay colision se muestra y mueve
        if (coli == False):
            for u in range(len(bloque) - 1, -1, -1):
                bloque[u].show()
                bloque[u].move(increx, increy)
            increy = 0
            increx = 0
        else:  # si hay colision cambia a 1
            for u in range(len(bloque) - 1, -1, -1):
                grid[bloque[u].y][bloque[u].x] = 1
            if(permcrear == True):
                # se declaran los colores otra vez
                bloque = prev
                prev = darForma(random.randrange(0, 4))
                for qi in range(0, len(bloque)):
                    if(grid[bloque[qi].y][bloque[qi].x] != 0):#revisa si se sobreponen
                        pygame.time.wait(5)
                        permcrear = False
                        main()
                        permcrear = True
        filallena(score)
        pygame.display.update()
        clock.tick(60)


main()
pygame.quit()
sys.exit()
