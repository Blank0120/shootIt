class Player {
	x: number;
	y: number;
	radius: number;
	color: string;

	constructor(x: number, y: number, radius: number, color: string) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	};

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}

class Projectile {
	x: number;
	y: number;
	radius: number;
	color: string;
	velocity: { x: number, y: number };

	constructor(x: number, y: number, radius: number, color: string, velocity: {x: number, y: number}) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
	};

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
	}

	update(ctx: CanvasRenderingContext2D) {
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.draw(ctx);
	}
}

class Enemy {
	x: number;
	y: number;
	radius: number;
	color: string;
	velocity: { x: number, y: number };

	constructor(x: number, y: number, radius: number, color: string, velocity: {x: number, y: number}) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
	};

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
	}

	update(ctx: CanvasRenderingContext2D) {
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.draw(ctx);
	}
}

export { Player, Projectile, Enemy }