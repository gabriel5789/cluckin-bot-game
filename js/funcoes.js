(function () {
	const cnv = document.querySelector('#canvas');
	const ctx = cnv.getContext('2d');

	let colisions = 5;

	//movimentos
	let moveLeft1 = false;
	let moveUp1 = false;
	let moveRight1 = false;
	let moveDown1 = false;

	let moveLeft2 = false;
	let moveUp2 = false;
	let moveRight2 = false;
	let moveDown2 = false;

	// imagens
	let img1 = new Image();
	img1.src = './img/robot1Right.png';
	img1.alt = 'robô azul visto de cima';

	let img2 = new Image();
	img2.src = './img/robot2Left.png';
	img2.alt = 'robô vermelho visto de cima';

	// arrays
	const robos = [];

	// robos
	const robo1 = new Robo(img1, "robot1", 100, 200, 150, 150, 5, 3);
	robos.push(robo1);

	const robo2 = new Robo(img2, "robot2", 1050, 200, 150, 150, 5, 4);
	robos.push(robo2);

	// pressionar as teclas
	window.addEventListener('keydown', function (keyboardEvent) {
		const key = keyboardEvent.key;

		switch (key) {
			case 'a':
				moveLeft2 = true;
				break;
			case 'w':
				moveUp2 = true;
				break;
			case 'd':
				moveRight2 = true;
				break;
			case 's':
				moveDown2 = true;
				break;
		}

		switch (key) {
			case 'ArrowLeft':
				moveLeft1 = true;
				break;
			case 'ArrowUp':
				moveUp1 = true;
				break;
			case 'ArrowRight':
				moveRight1 = true;
				break;
			case 'ArrowDown':
				moveDown1 = true;
				break;
		}
	});

	//soltar as teclas  
	window.addEventListener('keyup', (e) => {
		const key = e.key;

		switch (key) {
			case 'a':
				moveLeft2 = false;
				break;
			case 'w':
				moveUp2 = false;
				break;
			case 'd':
				moveRight2 = false;
				break;
			case 's':
				moveDown2 = false;
				break;
		}

		switch (key) {
			case 'ArrowLeft':
				moveLeft1 = false;
				break;
			case 'ArrowUp':
				moveUp1 = false;
				break;
			case 'ArrowRight':
				moveRight1 = false;
				break;
			case 'ArrowDown':
				moveDown1 = false;
				break;
		}
	});

	function moverRobos() {
		if (moveLeft1 && !moveRight1) {
			robo1.posX -= robo1.velocidade;
			robo1.direcao = 4;
		}
		if (moveRight1 && !moveLeft1) {
			robo1.posX += robo1.velocidade;
			robo1.direcao = 3;
		}
		if (moveUp1 && !moveDown1) {
			robo1.posY -= robo1.velocidade;
			if (moveRight1 ^ moveLeft1)
				if (moveRight1)
					robo1.direcao = 5;
				else
					robo1.direcao = 6; 
			else
				robo1.direcao = 1;
		}
		
		if (moveDown1 && !moveUp1) {
			robo1.posY += robo1.velocidade;
			if (moveRight1 ^ moveLeft1)
				if (moveRight1)
					robo1.direcao = 7;
				else
					robo1.direcao = 8; 
			else
				robo1.direcao = 2;
		}

		if (moveLeft2 && !moveRight2) {
			robo2.posX -= robo2.velocidade;
			robo2.direcao = 4;
		}
		if (moveRight2 && !moveLeft2) {
			robo2.posX += robo2.velocidade;
			robo2.direcao = 3;
		}
		if (moveUp2 && !moveDown2) {
			robo2.posY -= robo2.velocidade;
			if (moveRight2 ^ moveLeft2)
				if (moveRight2)
					robo2.direcao = 5;
				else
					robo2.direcao = 6; 
			else
				robo2.direcao = 1;
		}
		if (moveDown2 && !moveUp2) {
			robo2.posY += robo2.velocidade;
			if (moveRight2 ^ moveLeft2)
				if (moveRight2)
					robo2.direcao = 7;
				else
					robo2.direcao = 8; 
			else
				robo2.direcao = 2;
		}

		//fiixar na tela
		robo1.posX = Math.max(0, Math.min(cnv.width - robo1.width, robo1.posX));
		robo1.posY = Math.max(0, Math.min(cnv.height - robo1.height, robo1.posY));

		robo2.posY = Math.max(0, Math.min(cnv.height - robo2.height, robo2.posY));
		robo2.posX = Math.max(0, Math.min(cnv.width - robo2.width, robo2.posX));
	}


	function exibirRobos() {
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		for (const i in robos) {
			const spr = robos[i];
			// hitbox - debug
			// ctx.fillStyle = "rgba(200,0,0, 0.5)";
			// ctx.fillRect(spr.posX+20, spr.posY+20, spr.width-50, spr.height-30); 
			ctx.drawImage(spr.img, spr.posX, spr.posY, spr.width, spr.height);
			
			spr.img.src = spr.imgs[spr.direcao-1];
		}
	}


	function colisao() {
		// Ajustei as hitboxes para que as colisões fizessem mais sentido
		// Considerar a imagem inteira como o hitbox fará com que colisões ocorram
		// com os robôs estando muito distantes.
		// Ponto bom para manter as hitboxes -> posX+20, posY+20, width-50, height-30
		if ((robo1.posX + 20 > robo2.posX + 20 && robo1.posX + 20 < robo2.posX + 20 + robo2.width - 50
		 &&  robo1.posY + 20 > robo2.posY + 20 && robo1.posY + 20 < robo2.posY + 20 + robo2.height - 30)
		 || (robo1.posX + 20 + robo1.width - 50 > robo2.posX + 20 && robo1.posX + 20 < robo2.posX + 20 + robo2.width - 50
		 &&  robo1.posY + 20 > robo2.posY + 20 && robo1.posY + 20 < robo2.posY + 20 + robo2.height - 30)
		 || (robo1.posX + 20 > robo2.posX + 20 && robo1.posX + 20 < robo2.posX + 20 + robo2.width - 50
		 &&  robo1.posY + 20 + robo1.height - 30 > robo2.posY + 20 && robo1.posY + 20 < robo2.posY + 20 + robo2.height - 30)
		 || (robo1.posX + 20 + robo1.width - 50 > robo2.posX + 20 && robo1.posX + 20 < robo2.posX + 20 + robo2.width - 50
		 &&  robo1.posY + 20 + robo1.height - 30 > robo2.posY + 20 && robo1.posY + 20 < robo2.posY + 20 + robo2.height - 30)) {
			// remover valor aleatorio entre 0 e 20
			robo1.health -= Math.floor(Math.random() * 21);
			robo2.health -= Math.floor(Math.random() * 21);
			// resetar posição
			robo1.posX = 100;
			robo1.posY = 200;
			robo2.posX = 1050;
			robo2.posY = 200;
			colisions--;
			document.getElementById("robo1").style.width = `${robo1.health}%`;
			document.getElementById("robo2").style.width = `${robo2.health}%`;
			robo1.direcao = 3;
			robo2.direcao = 4;
			if (colisions == 0) {
				document.getElementById("vencedor").textContent = `Fim de jogo. Vencedor: ${((robo1.health < robo2.health)? 'Curiosity': 'Wall-e')}`
			}
		 }
	}

	// soundtrack
	let soundtrackButton = document.getElementById("soundtrack-button");
	let soundtrack = document.getElementById("soundtrack");
	let isStckPlaying = false;
	soundtrack.volume = 0.4;
	soundtrackButton.addEventListener("click", () => {
		if(!isStckPlaying) {
			soundtrack.play();
			isStckPlaying = true;
			soundtrackButton.textContent = "Soundtrack: On";
		} else {
			soundtrack.pause();
			isStckPlaying = false;
			soundtrackButton.textContent = "Soundtrack: Off";
		}
	})

	//solicitar uma animação ao browser e chamar a função
	//que é a propria função atualizarTela
	function atualizarTela() {
		if (colisions > 0)
			window.requestAnimationFrame(atualizarTela, cnv);
		moverRobos();
		exibirRobos();
		colisao();
	}
	atualizarTela();
}());