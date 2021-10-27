
// MONTA OS QUADRADOS(ROBÔS E OBSTÁCULOS)
// direcao: 1 - cima, 2 - baixo, 3 - direita, 4 - esquerda
// 5 - diagonal sup. direita, 6 - diagonal sup. esquerda
// 7 - diagonal inf. direita, 8 - diagonal inf. esquerda
const Robo = function (src, posX, posY, width, height, velocidade, direcao) {
    this.imgs = [
        document.querySelector(".down" + src),
        document.querySelector(".up" + src),
        document.querySelector(".right" + src),
        document.querySelector(".left" + src),
        document.querySelector(".up-left" + src),
        document.querySelector(".up-right" + src),
        document.querySelector(".down-left" + src),
        document.querySelector(".down-right" + src)];
    this.img = this.imgs[direcao-1];
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.velocidade = velocidade;
    this.direcao = direcao;
    this.health = 100;
}