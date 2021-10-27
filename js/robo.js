
// MONTA OS QUADRADOS(ROBÔS E OBSTÁCULOS)
// direcao: 1 - cima, 2 - baixo, 3 - direita, 4 - esquerda
// 5 - diagonal sup. direita, 6 - diagonal sup. esquerda
// 7 - diagonal inf. direita, 8 - diagonal inf. esquerda
const Robo = function (img, src, posX, posY, width, height, velocidade, direcao) {
    this.img = img;
    this.imgs = [
        "./img/" + src + "Up.png",
        "./img/" + src + "Down.png",
        "./img/" + src + "Right.png",
        "./img/" + src + "Left.png",
        "./img/" + src + "UpRight.png",
        "./img/" + src + "UpLeft.png",
        "./img/" + src + "DownRight.png",
        "./img/" + src + "DownLeft.png",];
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.velocidade = velocidade;
    this.direcao = direcao;
    this.health = 100;
}