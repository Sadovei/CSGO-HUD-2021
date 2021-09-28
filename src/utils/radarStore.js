const csgo_maps = {
    map_details: {
        de_cache_radar: {
            pos_x: "-2000",
            pos_y: "3250",
            scale: "5.5",
        },
        de_cbble_radar: {
            pos_x: "-3840", // upper left world x coordinate
            pos_y: "3072", // upper left world y coordinate
            scale: "6",
        },
        de_inferno_radar: {
            pos_x: "-2087", // upper left world x coordinate
            pos_y: "3870", // upper left world y coordinate
            scale: "4.9",
        },
        de_mirage_radar: {
            pos_x: "-3230",
            pos_y: "1713",
            scale: "5.00",
        },
        de_nuke_radar: {
            pos_x: "-3453",
            pos_y: "2887",
            scale: "7.00",
        },
        de_overpass_radar: {
            pos_x: "-4831",
            pos_y: "1781",
            scale: "5.2",
        },
        de_train_radar: {
            pos_x: "-2477",
            pos_y: "2392",
            scale: "4.7",
        },
        de_dust2_radar: {
            pos_x: "-2476", // upper left world coordinate
            pos_y: "3239",
            scale: "4.4",
        },
        de_vertigo_radar: {
            pos_x: "-3168", // upper left world coordinate
            pos_y: "1762",
            scale: "4.0",
        },
    },
};

export function findGetParameter(parameterName) {
    let result = null,
        tmp = [];
    let items = window.location.search.substr(1).split("&");
    for (let index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

export function resizeCanvas(canvas) {
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window;
        const context = canvas.getContext("2d");
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context.scale(ratio, ratio);
        return true;
    }

    return false;
}

export function getCoordinates(
    x_game,
    y_game,
    mapName
) {
    if (mapName === undefined) return 0;
    const pos_x = csgo_maps.map_details[mapName].pos_x;
    const pos_y = csgo_maps.map_details[mapName].pos_y;

    const scale_factor = csgo_maps.map_details[mapName].scale;
    const x_prime = (x_game - pos_x) / scale_factor,
        y_prime = (pos_y - y_game) / scale_factor;

    return { x: x_prime, y: y_prime };
}

export function angle(cx, cy, ex, ey) {
    let dy = ey - cy;
    let dx = ex - cx;
    let theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}

export function drawPlayerButton(
    ctx,
    playerImage,
    width,
    height,
    canvasCoord,
    obsSlot,
    deg = 0
) {
    ctx.restore();
    //Convert degrees to radian
    let rad = (deg * Math.PI) / 180;
    //Set the origin to the center of the image
    ctx.translate(canvasCoord.x, canvasCoord.y);
    //Rotate the canvas around the origin
    ctx.rotate(rad);

    //draw the image
    ctx.drawImage(
        playerImage,
        (width / 2) * -1,
        (height / 2) * -1,
        width,
        height
    );

    //reset the canvas
    ctx.rotate(rad * -1);
    ctx.translate(canvasCoord.x * -1, canvasCoord.y * -1);

    ctx.font = "30px Titling Gothic FB Cond";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(obsSlot, canvasCoord.x, canvasCoord.y + 10);
}

export function drawBullet(
    ctx,
    playerImage,
    width,
    height,
    canvasCoord,
    obsSlot,
    deg = 0
) {
    ctx.restore();
    //Convert degrees to radian
    let rad = (deg * Math.PI) / 180;
    //Set the origin to the center of the image
    ctx.translate(canvasCoord.x, canvasCoord.y);
    //Rotate the canvas around the origin
    ctx.rotate(rad);

    //draw the image
    ctx.drawImage(
        playerImage,
        (width / 2) * -1,
        (height / 2) * -1,
        width,
        height
    );

    //reset the canvas
    ctx.rotate(rad * -1);
    ctx.translate(canvasCoord.x * -1, canvasCoord.y * -1);

    ctx.clearRect(0, 0, ctx.width, ctx.height);
}

export function drawBomb(
    ctx,
    bmbState,
    bmbImg,
    bmbPlanted,
    bmmbData,
    width,
    height,
    canvasCoord,
    obsSlot,
    deg = 0
) {
    if (bmbState === "carried" || bmbState === "dropped") {
        ctx.restore();
        //Convert degrees to radian
        let rad = (deg * Math.PI) / 180;
        //Set the origin to the center of the image
        ctx.translate(canvasCoord.x, canvasCoord.y);
        //Rotate the canvas around the origin
        ctx.rotate(rad);

        //draw the image
        ctx.drawImage(bmbImg, (width / 2) * -1, (height / 2) * -1, width, height);

        //reset the canvas
        ctx.rotate(rad * -1);
        ctx.translate(canvasCoord.x * -1, canvasCoord.y * -1);
    } else if (bmbState === "planting") {
        ctx.beginPath();
        // ctx.clearRect(0, 0, ctx.width, ctx.height)
        ctx.strokeStyle = "#FF0000";
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = `rgba(255, 0, 0, ${bmmbData.countdown / 3.7})`;
        ctx.arc(
            canvasCoord.x,
            canvasCoord.y,
            (3.4 - bmmbData.countdown) * 35,
            0,
            2 * Math.PI
        );
        ctx.stroke();
        ctx.fill();
        ctx.save();

        ctx.restore();
        //Convert degrees to radian
        let rad = (deg * Math.PI) / 180;
        //Set the origin to the center of the image
        ctx.translate(canvasCoord.x, canvasCoord.y);
        //Rotate the canvas around the origin
        ctx.rotate(rad);
        //draw the image
        ctx.drawImage(bmbImg, (width / 2) * -1, (height / 2) * -1, width, height);

        //reset the canvas
        ctx.rotate(rad * -1);
        ctx.translate(canvasCoord.x * -1, canvasCoord.y * -1);
    } else if (bmbState === "planted") {
        let bmbImage = parseInt(bmmbData.countdown) % 2 === 0 ? bmbImg : bmbPlanted;
        ctx.beginPath();
        // ctx.clearRect(0, 0, canvasBomb.width, canvasBomb.height);
        ctx.drawImage(bmbImage, canvasCoord.x - 25, canvasCoord.y - 25, 50, 50);
        ctx.restore();
    }
}

export function drawFrag(
    ctx,
    bmbObj,
    mapName,
    fragTImg,
    fragCTImg,
    explImgT,
    explImgCT,
    playerSide
) {
    const bmbPosCoord = bmbObj.position.split(",");
    const bmbPosFrag = getCoordinates(bmbPosCoord[0], bmbPosCoord[1], mapName);
    let imageFrag = playerSide === "CT" ? fragCTImg : fragTImg;
    let imageExplodeFrag = playerSide === "CT" ? explImgCT : explImgT;
    if (bmbObj.lifetime > 0.4 && bmbObj.lifetime < 1.6) {
        ctx.restore();
        // ctx.clearRect(bmbPosFrag.x - 10, bmbPosFrag.y - 20, 60, 60);
        ctx.drawImage(imageFrag, bmbPosFrag.x, bmbPosFrag.y, 20, 33);
        ctx.save();
    } else if (bmbObj.lifetime > 2 && bmbObj.lifetime < 2.8) {
        ctx.restore();
        // ctx.clearRect(bmbPosFrag.x - 65, bmbPosFrag.y - 65, 100, 100);
        ctx.drawImage(
            imageExplodeFrag,
            bmbPosFrag.x - 30,
            bmbPosFrag.y - 20,
            75,
            80
        );
        ctx.save();
    }
}

export function drawFlash(
    ctx,
    bmbObj,
    mapName,
    flashImgT,
    flashImgCT,
    explFlashT,
    explFlashCT,
    playerSide
) {
    const bmbPosCoord = bmbObj.position.split(",");
    const bmbPosFlash = getCoordinates(bmbPosCoord[0], bmbPosCoord[1], mapName);
    const imageFlash = playerSide === "CT" ? flashImgCT : flashImgT;
    const imageExplodingFlash = playerSide === "CT" ? explFlashCT : explFlashT;

    if (bmbObj.lifetime > 0.4 && bmbObj.lifetime < 1.1) {
        ctx.restore();
        ctx.drawImage(imageFlash, bmbPosFlash.x - 15, bmbPosFlash.y - 17.5, 30, 35);
        ctx.save();
    } else if (bmbObj.lifetime > 1.1 && bmbObj.lifetime < 1.5) {
        ctx.drawImage(
            imageExplodingFlash,
            bmbPosFlash.x - 40,
            bmbPosFlash.y - 40,
            80,
            80
        );
        ctx.save();
    }
}

export function drawSmoke(
    ctx,
    bmbObj,
    mapName,
    smokeImgT,
    smokeImgCT,
    explSmokeT,
    explSmokeCT,
    playerSide
) {
    const bombPosCoord = bmbObj.position.split(",");
    const bmbSmokeCoord = getCoordinates(
        bombPosCoord[0],
        bombPosCoord[1],
        mapName
    );
    const smokeImg = playerSide === "CT" ? smokeImgCT : smokeImgT;
    const eplxSmk = playerSide === "CT" ? explSmokeCT : explSmokeT;
    if (bmbObj.lifetime > 0.3 && bmbObj.effecttime < 0.5) {
        ctx.save();
        ctx.beginPath();
        ctx.drawImage(smokeImg, bmbSmokeCoord.x - 10, bmbSmokeCoord.y - 20, 20, 40);
        ctx.closePath();
        ctx.restore();
    } else if (bmbObj.effecttime > 0.5 && bmbObj.effecttime < 17.5) {
        const effectTime = bmbObj.effecttime < 15 ? 15 : bmbObj.effecttime;
        ctx.save();
        ctx.drawImage(
            eplxSmk,
            bmbSmokeCoord.x - 38,
            bmbSmokeCoord.y - 30,
            effectTime * 4.3,
            effectTime * 4.3
        );
        ctx.restore();
    }
}

export function showFireBomb(
    ctx,
    bmbObj,
    mapName,
    smokeImgT,
    smokeImgCT,
    playerSide
) {
    const getCoord = bmbObj.position.split(",");
    const incPosition = getCoordinates(getCoord[0], getCoord[1], mapName);
    const bmbImg = playerSide === "CT" ? smokeImgCT : smokeImgT;

    if (bmbObj.lifetime > 0.3) {
        ctx.restore();
        ctx.drawImage(bmbImg, incPosition.x, incPosition.y, 20, 33);
        ctx.save();
    }
}

function Particle(x, y, xs, ys) {
    this.x = x;
    this.y = y;
    this.xs = xs;
    this.ys = ys;
    this.life = 0;
}

export function showFlames(ctx, bmbObj, mapName) {
    let particles = [];
    let width = 0;
    let height = 0;
    let max = bmbObj.lifetime * 12;
    let speed = 2;
    let size = 12;

    ctx.globalCompositeOperation = "lighter";

    for (let flameEle in bmbObj.flames) {
        let flamePosition = bmbObj.flames[flameEle].split(",");
        let positionFlame = getCoordinates(
            flamePosition[0],
            flamePosition[1],
            mapName
        );

        if (bmbObj.lifetime <= 6.7) {
            // setTimeout(
            update(positionFlame, bmbObj.lifetime, ctx)
            // , 30);
        }
    }

    function update(posFlame, lifeTime, fireContextD) {
        //Adds ten new particles every framew
        for (let z = 0; z < 2; z++) {
            //Adds a particle at the mouse position, with random horizontal and vertical speeds
            let p = new Particle(
                posFlame.x,
                posFlame.y,
                (Math.random() * 2 * speed - speed) / 2,
                0 - Math.random() * 2 * speed,
                lifeTime
            );
            particles.push(p);
        }

        //Clear the stage so we can draw the new frame
        fireContextD.clearRect(0, 0, width, height);

        //Cycle through all the particles to draw them
        for (let i = 0; i < particles.length; i++) {
            fireContextD.fillStyle =
                "rgba(" +
                (260 - particles[i].life * 4) +
                "," +
                (particles[i].life * 2 + 25) +
                "," +
                particles[i].life * 2 +
                "," +
                ((max - particles[i].life) / max) * 0.02 +
                ")";

            fireContextD.beginPath();

            //Draw the particle as a circle, which gets slightly smaller the longer it's been alive for
            fireContextD.arc(
                particles[i].x,
                particles[i].y,
                ((max - particles[i].life) / max) * (size / 2) + size / 2,
                0,
                2 * Math.PI
            );

            fireContextD.fill();

            //Move the particle based on its horizontal and vertical speeds
            particles[i].x += particles[i].xs;
            particles[i].y += particles[i].ys;

            particles[i].life++;
            if (particles[i].life >= max) {
                particles.splice(i, 1);
                i--;
            }
        }
    }
}