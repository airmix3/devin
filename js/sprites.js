// Pixel art sprite renderer using canvas primitives
const Sprites = {
    // Draw Mario (standing)
    drawMario: function(ctx, x, y, width, height, frame, direction, big) {
        ctx.save();
        if (direction === -1) {
            ctx.translate(x + width, y);
            ctx.scale(-1, 1);
            x = 0;
            y = 0;
        } else {
            ctx.translate(x, y);
            x = 0;
            y = 0;
        }

        if (big) {
            // Big Mario
            // Hat
            ctx.fillStyle = '#e52521';
            ctx.fillRect(x + 4, y, width - 8, 8);
            ctx.fillRect(x + 2, y + 2, width - 4, 6);

            // Face
            ctx.fillStyle = '#fbb';
            ctx.fillRect(x + 4, y + 8, width - 8, 10);

            // Eyes
            ctx.fillStyle = '#000';
            ctx.fillRect(x + 8, y + 10, 4, 4);
            ctx.fillRect(x + width - 12, y + 10, 4, 4);

            // Mustache
            ctx.fillStyle = '#6b3a00';
            ctx.fillRect(x + 6, y + 16, width - 12, 3);

            // Body (overalls)
            ctx.fillStyle = '#e52521';
            ctx.fillRect(x + 2, y + 20, width - 4, 10);

            // Overalls
            ctx.fillStyle = '#0038f8';
            ctx.fillRect(x + 4, y + 22, width - 8, 14);

            // Belt
            ctx.fillStyle = '#fbd000';
            ctx.fillRect(x + 10, y + 24, width - 20, 3);

            // Legs
            if (frame === 1 || frame === 3) {
                // Walking frame
                ctx.fillStyle = '#0038f8';
                ctx.fillRect(x + 2, y + 34, 10, 6);
                ctx.fillRect(x + width - 12, y + 30, 10, 6);
            } else {
                ctx.fillStyle = '#0038f8';
                ctx.fillRect(x + 4, y + 34, 10, 6);
                ctx.fillRect(x + width - 14, y + 34, 10, 6);
            }

            // Shoes
            ctx.fillStyle = '#6b3a00';
            if (frame === 1 || frame === 3) {
                ctx.fillRect(x, y + height - 4, 12, 4);
                ctx.fillRect(x + width - 12, y + height - 8, 12, 4);
            } else {
                ctx.fillRect(x + 2, y + height - 4, 12, 4);
                ctx.fillRect(x + width - 14, y + height - 4, 12, 4);
            }
        } else {
            // Small Mario
            // Hat
            ctx.fillStyle = '#e52521';
            ctx.fillRect(x + 4, y, width - 8, 6);
            ctx.fillRect(x + 2, y + 2, width - 4, 4);

            // Face
            ctx.fillStyle = '#fbb';
            ctx.fillRect(x + 4, y + 6, width - 8, 8);

            // Eyes
            ctx.fillStyle = '#000';
            ctx.fillRect(x + 8, y + 8, 3, 3);
            ctx.fillRect(x + width - 11, y + 8, 3, 3);

            // Mustache
            ctx.fillStyle = '#6b3a00';
            ctx.fillRect(x + 6, y + 12, width - 12, 2);

            // Body
            ctx.fillStyle = '#e52521';
            ctx.fillRect(x + 4, y + 14, width - 8, 6);

            // Overalls
            ctx.fillStyle = '#0038f8';
            ctx.fillRect(x + 6, y + 17, width - 12, 10);

            // Belt
            ctx.fillStyle = '#fbd000';
            ctx.fillRect(x + 10, y + 18, width - 20, 2);

            // Legs
            if (frame === 1 || frame === 3) {
                ctx.fillStyle = '#0038f8';
                ctx.fillRect(x + 4, y + 26, 8, 6);
                ctx.fillRect(x + width - 12, y + 24, 8, 6);
            } else {
                ctx.fillStyle = '#0038f8';
                ctx.fillRect(x + 6, y + 26, 8, 6);
                ctx.fillRect(x + width - 14, y + 26, 8, 6);
            }

            // Shoes
            ctx.fillStyle = '#6b3a00';
            if (frame === 1 || frame === 3) {
                ctx.fillRect(x + 2, y + height - 4, 10, 4);
                ctx.fillRect(x + width - 12, y + height - 6, 10, 4);
            } else {
                ctx.fillRect(x + 4, y + height - 4, 10, 4);
                ctx.fillRect(x + width - 14, y + height - 4, 10, 4);
            }
        }
        ctx.restore();
    },

    // Draw Mario jumping
    drawMarioJump: function(ctx, x, y, width, height, direction, big) {
        ctx.save();
        if (direction === -1) {
            ctx.translate(x + width, y);
            ctx.scale(-1, 1);
            x = 0;
            y = 0;
        } else {
            ctx.translate(x, y);
            x = 0;
            y = 0;
        }

        if (big) {
            // Hat
            ctx.fillStyle = '#e52521';
            ctx.fillRect(x + 4, y, width - 8, 8);
            ctx.fillRect(x + 2, y + 2, width - 4, 6);
            // Face
            ctx.fillStyle = '#fbb';
            ctx.fillRect(x + 4, y + 8, width - 8, 10);
            // Eyes
            ctx.fillStyle = '#000';
            ctx.fillRect(x + 8, y + 10, 4, 4);
            ctx.fillRect(x + width - 12, y + 10, 4, 4);
            // Mustache
            ctx.fillStyle = '#6b3a00';
            ctx.fillRect(x + 6, y + 16, width - 12, 3);
            // Body
            ctx.fillStyle = '#e52521';
            ctx.fillRect(x + 2, y + 20, width - 4, 10);
            // Overalls
            ctx.fillStyle = '#0038f8';
            ctx.fillRect(x + 4, y + 22, width - 8, 14);
            // Arms up
            ctx.fillStyle = '#e52521';
            ctx.fillRect(x - 2, y + 18, 6, 4);
            ctx.fillRect(x + width - 4, y + 18, 6, 4);
            // Legs spread
            ctx.fillStyle = '#0038f8';
            ctx.fillRect(x + 2, y + 34, 10, 4);
            ctx.fillRect(x + width - 12, y + 34, 10, 4);
            // Shoes
            ctx.fillStyle = '#6b3a00';
            ctx.fillRect(x, y + height - 4, 10, 4);
            ctx.fillRect(x + width - 10, y + height - 4, 10, 4);
        } else {
            // Hat
            ctx.fillStyle = '#e52521';
            ctx.fillRect(x + 4, y, width - 8, 6);
            ctx.fillRect(x + 2, y + 2, width - 4, 4);
            // Face
            ctx.fillStyle = '#fbb';
            ctx.fillRect(x + 4, y + 6, width - 8, 8);
            // Eyes
            ctx.fillStyle = '#000';
            ctx.fillRect(x + 8, y + 8, 3, 3);
            ctx.fillRect(x + width - 11, y + 8, 3, 3);
            // Mustache
            ctx.fillStyle = '#6b3a00';
            ctx.fillRect(x + 6, y + 12, width - 12, 2);
            // Body
            ctx.fillStyle = '#e52521';
            ctx.fillRect(x + 4, y + 14, width - 8, 6);
            // Arms up
            ctx.fillStyle = '#e52521';
            ctx.fillRect(x, y + 12, 6, 3);
            ctx.fillRect(x + width - 6, y + 12, 6, 3);
            // Overalls
            ctx.fillStyle = '#0038f8';
            ctx.fillRect(x + 6, y + 17, width - 12, 10);
            // Legs spread
            ctx.fillStyle = '#0038f8';
            ctx.fillRect(x + 2, y + 26, 10, 4);
            ctx.fillRect(x + width - 12, y + 26, 10, 4);
            // Shoes
            ctx.fillStyle = '#6b3a00';
            ctx.fillRect(x, y + height - 6, 10, 4);
            ctx.fillRect(x + width - 10, y + height - 6, 10, 4);
        }
        ctx.restore();
    },

    // Draw Goomba
    drawGoomba: function(ctx, x, y, size, frame, squished) {
        if (squished) {
            // Flat goomba
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(x + 2, y + size - 8, size - 4, 8);
            ctx.fillStyle = '#000';
            ctx.fillRect(x + 6, y + size - 6, 4, 2);
            ctx.fillRect(x + size - 10, y + size - 6, 4, 2);
            return;
        }

        // Body
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x + 4, y, size - 8, size - 8);
        ctx.fillRect(x + 2, y + 4, size - 4, size - 12);
        ctx.fillRect(x, y + 8, size, size - 16);

        // Eyes (white)
        ctx.fillStyle = '#fff';
        ctx.fillRect(x + 6, y + 8, 8, 8);
        ctx.fillRect(x + size - 14, y + 8, 8, 8);

        // Pupils
        ctx.fillStyle = '#000';
        if (frame % 2 === 0) {
            ctx.fillRect(x + 10, y + 10, 4, 5);
            ctx.fillRect(x + size - 14, y + 10, 4, 5);
        } else {
            ctx.fillRect(x + 8, y + 10, 4, 5);
            ctx.fillRect(x + size - 12, y + 10, 4, 5);
        }

        // Frown
        ctx.fillStyle = '#000';
        ctx.fillRect(x + 10, y + 18, size - 20, 2);

        // Feet
        ctx.fillStyle = '#000';
        if (frame % 2 === 0) {
            ctx.fillRect(x + 2, y + size - 8, 12, 8);
            ctx.fillRect(x + size - 14, y + size - 8, 12, 8);
        } else {
            ctx.fillRect(x + 4, y + size - 8, 12, 8);
            ctx.fillRect(x + size - 16, y + size - 8, 12, 8);
        }
    },

    // Draw Koopa Troopa
    drawKoopa: function(ctx, x, y, width, height, frame, direction, isShell) {
        if (isShell) {
            // Shell only
            ctx.fillStyle = '#049c00';
            ctx.fillRect(x + 4, y + height - 24, width - 8, 20);
            ctx.fillRect(x + 2, y + height - 20, width - 4, 16);
            ctx.fillStyle = '#fbd000';
            ctx.fillRect(x + 8, y + height - 18, width - 16, 12);
            ctx.fillStyle = '#fff';
            ctx.fillRect(x + 12, y + height - 14, width - 24, 4);
            return;
        }

        ctx.save();
        if (direction === -1) {
            ctx.translate(x + width, y);
            ctx.scale(-1, 1);
            x = 0; y = 0;
        } else {
            ctx.translate(x, y);
            x = 0; y = 0;
        }

        // Head
        ctx.fillStyle = '#049c00';
        ctx.fillRect(x + 6, y, width - 12, 12);
        ctx.fillRect(x + 4, y + 4, width - 8, 10);

        // Eye
        ctx.fillStyle = '#fff';
        ctx.fillRect(x + width - 12, y + 4, 8, 6);
        ctx.fillStyle = '#000';
        ctx.fillRect(x + width - 8, y + 5, 4, 4);

        // Shell
        ctx.fillStyle = '#049c00';
        ctx.fillRect(x + 2, y + 12, width - 4, 20);
        ctx.fillRect(x + 4, y + 10, width - 8, 24);
        ctx.fillStyle = '#fbd000';
        ctx.fillRect(x + 6, y + 14, width - 12, 16);
        ctx.fillStyle = '#fff';
        ctx.fillRect(x + 10, y + 18, width - 20, 8);

        // Feet
        ctx.fillStyle = '#fbb';
        if (frame % 2 === 0) {
            ctx.fillRect(x + 2, y + height - 8, 10, 8);
            ctx.fillRect(x + width - 12, y + height - 6, 10, 6);
        } else {
            ctx.fillRect(x + 2, y + height - 6, 10, 6);
            ctx.fillRect(x + width - 12, y + height - 8, 10, 8);
        }

        ctx.restore();
    },

    // Draw coin (spinning)
    drawCoin: function(ctx, x, y, size, frame) {
        const coinFrame = Math.floor(frame / 4) % 4;
        ctx.fillStyle = '#fbd000';

        const centerX = x + size / 2;
        const centerY = y + size / 2;
        const widthScale = [1, 0.6, 0.2, 0.6][coinFrame];

        ctx.fillRect(
            centerX - (size * 0.3 * widthScale),
            centerY - size * 0.35,
            size * 0.6 * widthScale,
            size * 0.7
        );

        // Coin shine
        if (coinFrame === 0) {
            ctx.fillStyle = '#fff';
            ctx.fillRect(
                centerX - size * 0.1,
                centerY - size * 0.2,
                size * 0.08,
                size * 0.3
            );
        }
    },

    // Draw ground tile
    drawGround: function(ctx, x, y, size) {
        ctx.fillStyle = '#c84c0c';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = '#e09050';
        ctx.fillRect(x + 1, y + 1, size - 2, size * 0.4);
        ctx.fillStyle = '#a0370c';
        ctx.fillRect(x, y + size * 0.7, size, 2);
        // Brick lines
        ctx.strokeStyle = '#6b2000';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);
        ctx.beginPath();
        ctx.moveTo(x, y + size / 2);
        ctx.lineTo(x + size, y + size / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + size / 2, y);
        ctx.lineTo(x + size / 2, y + size / 2);
        ctx.stroke();
    },

    // Draw brick tile
    drawBrick: function(ctx, x, y, size) {
        ctx.fillStyle = '#c84c0c';
        ctx.fillRect(x, y, size, size);
        ctx.strokeStyle = '#6b2000';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);
        // Brick pattern
        ctx.fillStyle = '#e09050';
        ctx.fillRect(x + 2, y + 2, size / 2 - 3, size / 2 - 3);
        ctx.fillRect(x + size / 2 + 1, y + 2, size / 2 - 3, size / 2 - 3);
        ctx.fillRect(x + 2, y + size / 2 + 1, size / 2 - 3, size / 2 - 3);
        ctx.fillRect(x + size / 2 + 1, y + size / 2 + 1, size / 2 - 3, size / 2 - 3);
    },

    // Draw question block
    drawQuestionBlock: function(ctx, x, y, size, frame) {
        const pulse = Math.sin(frame * 0.1) * 2;

        ctx.fillStyle = '#fbd000';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = '#e8a000';
        ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
        ctx.fillStyle = '#fbd000';
        ctx.fillRect(x + 4, y + 4, size - 8, size - 8);

        // Question mark
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${16 + pulse}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('?', x + size / 2, y + size / 2);

        // Border
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);
    },

    // Draw used block
    drawUsedBlock: function(ctx, x, y, size) {
        ctx.fillStyle = '#8b7355';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = '#6b5535';
        ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
        ctx.fillStyle = '#7b6545';
        ctx.fillRect(x + 4, y + 4, size - 8, size - 8);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);
    },

    // Draw hard block (stone)
    drawHardBlock: function(ctx, x, y, size) {
        ctx.fillStyle = '#8b8b8b';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = '#ababab';
        ctx.fillRect(x + 2, y + 2, size - 4, size / 2 - 3);
        ctx.fillStyle = '#6b6b6b';
        ctx.fillRect(x + 2, y + size / 2 + 1, size - 4, size / 2 - 3);
        ctx.strokeStyle = '#4b4b4b';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);
    },

    // Draw pipe top left
    drawPipeTopLeft: function(ctx, x, y, size) {
        ctx.fillStyle = '#00a800';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = '#00d800';
        ctx.fillRect(x, y, size, size * 0.3);
        ctx.fillRect(x, y, size * 0.3, size);
        ctx.fillStyle = '#006800';
        ctx.fillRect(x + size * 0.8, y, size * 0.2, size);
        ctx.strokeStyle = '#004800';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);
    },

    // Draw pipe top right
    drawPipeTopRight: function(ctx, x, y, size) {
        ctx.fillStyle = '#00a800';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = '#00d800';
        ctx.fillRect(x, y, size, size * 0.3);
        ctx.fillStyle = '#006800';
        ctx.fillRect(x, y, size * 0.2, size);
        ctx.fillRect(x + size * 0.7, y, size * 0.3, size);
        ctx.strokeStyle = '#004800';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);
    },

    // Draw pipe body left
    drawPipeBodyLeft: function(ctx, x, y, size) {
        ctx.fillStyle = '#00a800';
        ctx.fillRect(x + 4, y, size - 4, size);
        ctx.fillStyle = '#00d800';
        ctx.fillRect(x + 4, y, size * 0.25, size);
        ctx.fillStyle = '#006800';
        ctx.fillRect(x + size * 0.8, y, size * 0.2, size);
        ctx.strokeStyle = '#004800';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x + 4, y);
        ctx.lineTo(x + 4, y + size);
        ctx.stroke();
    },

    // Draw pipe body right
    drawPipeBodyRight: function(ctx, x, y, size) {
        ctx.fillStyle = '#00a800';
        ctx.fillRect(x, y, size - 4, size);
        ctx.fillStyle = '#006800';
        ctx.fillRect(x, y, size * 0.2, size);
        ctx.fillRect(x + size * 0.7, y, size * 0.3 - 4, size);
        ctx.strokeStyle = '#004800';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x + size - 4, y);
        ctx.lineTo(x + size - 4, y + size);
        ctx.stroke();
    },

    // Draw flagpole
    drawFlagpole: function(ctx, x, y, size) {
        ctx.fillStyle = '#888';
        ctx.fillRect(x + size / 2 - 2, y, 4, size);
        ctx.fillStyle = '#666';
        ctx.fillRect(x + size / 2 - 1, y, 2, size);
    },

    // Draw flag top (ball)
    drawFlagTop: function(ctx, x, y, size) {
        ctx.fillStyle = '#888';
        ctx.fillRect(x + size / 2 - 2, y, 4, size);
        // Ball on top
        ctx.fillStyle = '#049c00';
        ctx.beginPath();
        ctx.arc(x + size / 2, y + 6, 6, 0, Math.PI * 2);
        ctx.fill();
    },

    // Draw flag
    drawFlag: function(ctx, x, y) {
        ctx.fillStyle = '#049c00';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 28, y + 10);
        ctx.lineTo(x, y + 20);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#00d800';
        ctx.beginPath();
        ctx.moveTo(x, y + 2);
        ctx.lineTo(x - 22, y + 10);
        ctx.lineTo(x, y + 18);
        ctx.closePath();
        ctx.fill();
    },

    // Draw cloud
    drawCloud: function(ctx, x, y, size) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x + size * 0.3, y + size * 0.6, size * 0.3, 0, Math.PI * 2);
        ctx.arc(x + size * 0.5, y + size * 0.35, size * 0.35, 0, Math.PI * 2);
        ctx.arc(x + size * 0.7, y + size * 0.6, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
    },

    // Draw bush
    drawBush: function(ctx, x, y, size) {
        ctx.fillStyle = '#049c00';
        ctx.beginPath();
        ctx.arc(x + size * 0.25, y + size * 0.7, size * 0.3, 0, Math.PI * 2);
        ctx.arc(x + size * 0.5, y + size * 0.5, size * 0.35, 0, Math.PI * 2);
        ctx.arc(x + size * 0.75, y + size * 0.7, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#00d800';
        ctx.beginPath();
        ctx.arc(x + size * 0.5, y + size * 0.55, size * 0.2, 0, Math.PI * 2);
        ctx.fill();
    },

    // Draw hill
    drawHill: function(ctx, x, y, size) {
        ctx.fillStyle = '#049c00';
        ctx.beginPath();
        ctx.moveTo(x, y + size);
        ctx.quadraticCurveTo(x + size / 2, y - size * 0.2, x + size, y + size);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#00d800';
        ctx.beginPath();
        ctx.moveTo(x + size * 0.2, y + size);
        ctx.quadraticCurveTo(x + size / 2, y + size * 0.1, x + size * 0.8, y + size);
        ctx.closePath();
        ctx.fill();
    },

    // Draw mushroom powerup
    drawMushroom: function(ctx, x, y, size) {
        // Cap
        ctx.fillStyle = '#e52521';
        ctx.fillRect(x + 2, y, size - 4, size * 0.5);
        ctx.fillRect(x, y + 4, size, size * 0.3);
        // White spots
        ctx.fillStyle = '#fff';
        ctx.fillRect(x + 4, y + 2, 8, 8);
        ctx.fillRect(x + size - 12, y + 2, 8, 8);
        ctx.fillRect(x + size / 2 - 4, y + 4, 8, 6);
        // Stem
        ctx.fillStyle = '#fbb';
        ctx.fillRect(x + 6, y + size * 0.5, size - 12, size * 0.35);
        // Eyes
        ctx.fillStyle = '#000';
        ctx.fillRect(x + 10, y + size * 0.55, 3, 3);
        ctx.fillRect(x + size - 13, y + size * 0.55, 3, 3);
        // Base
        ctx.fillStyle = '#fbb';
        ctx.fillRect(x + 4, y + size * 0.8, size - 8, size * 0.2);
    },

    // Draw particles
    drawParticle: function(ctx, x, y, size, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);
    },
};
