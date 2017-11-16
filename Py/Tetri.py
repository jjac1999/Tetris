import pygame
import sys
import random
import math
import time



pygame.init()
grey=(50,50,50)#Se tiene que declarar colores
white=(0,0,0)
blue=(0,0,255)
red=(255,0,0)
green=(0,255,0)
screen= pygame.display.set_mode((400,600))
clock = pygame.time.Clock()
tam=40
blocks=[]
row=15
col=10
grid=[]
for i in range(0,row):
    f=[]
    for j in range(0,col):
        f.append(0)
    grid.append(f)

for u in range(0,col):
    grid[14][u]=1

class Bloque:
    def __init__(self,tempX,tempY):
        self.x=tempX
        self.y=tempY
        self.state=True
    def colision(self):
        if(grid[self.y][self.x]==1):
            self.state=False
            blocks.append(darForma(0))
            grid[self.y-1][self.x]=1
    def move(self,x):
        self.y+=1
        self.x+=x
    def show(self):
        screen.fill(red,rect=[self.x*tam,self.y*tam,tam,tam])
#blocks.append(Bloque())


def darForma(q) :
    form=[]
    for i in range(0,4):
        form.append(Bloque(4,i))
    return form

blocks.append(darForma(0))



def mLoop():

    state=True
    tam=40
    increx=0

    while state:#main loop
        screen.fill(grey)
        for event in pygame.event.get():#manejo eventos
            if event.type == pygame.QUIT:
                state=False
                return
            if event.type== pygame.KEYDOWN:
                if event.key==pygame.K_d:
                    increx=1
                if event.key==pygame.K_a:
                    increx=-1

        for i in range(0,len(blocks)):
            for j in range(len(blocks[i])-1,0,-1):
                blocks[i][j].show()
                if blocks[i][j].state == True:
                    blocks[i][j].move(increx)
                    blocks[i][j].colision()


        increx=0


        pygame.display.update()
        clock.tick(5)

mLoop()
pygame.quit()
sys.exit()
