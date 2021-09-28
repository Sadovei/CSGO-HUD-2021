import React, { useEffect, useRef } from 'react';
import { getCoordinates, drawPlayerButton, angle, drawBullet, drawBomb, drawFrag, drawFlash, drawSmoke, showFireBomb, showFlames } from '../../../utils/radarStore'



const Canvas = (props) => {
    const canvas = useRef();

    props.playerdata.gameData.observer_slot === 1 && console.log(props.playerdata.gameData.observer_slot, ' : ', props.playerdata.shoot)
    
    useEffect(() => {
        const ctx = canvas.current.getContext('2d')
        const obsSlot = props.playerdata.gameData.observer_slot;
        const position = props.playerdata.gameData.position.split(",");
        const bombPosition = props.bombData.position.split(",")
        const forward = props.playerdata.gameData.forward.split(",");
        const playerSide = props.playerdata.gameData.team;
        const canvasCoord = getCoordinates(position[0], position[1], props.mapname);
        const canvasBmbPosition = getCoordinates(bombPosition[0], bombPosition[1], props.mapname)
        const shootPlayer = props.playerdata.shoot;
        const playerObserved = props.playerdata.observed;
        const stateHealth = props.playerdata.gameData.state.health


        let playerImage = (playerSide === 'CT') ? props.ctImgs.current : props.terrorImg.current;
        let deadPlayerImage = (playerSide === 'CT') ? props.deadCs.current : props.deadTerror.current;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // ctx.drawImage(playerImage,canvasCoord.x, canvasCoord.y, 70, 70)

        if (stateHealth > 0) {
            drawPlayerButton(ctx, playerImage, 70, 70, canvasCoord, obsSlot);

            // get the angle
            let getAngle = angle(canvasCoord.x, canvasCoord.y, canvasCoord.x + 45 * Number(forward[0]), canvasCoord.y - 45 * Number(forward[1])) + 90;

            // show direction of aim
            if (!playerObserved) {
                drawPlayerButton(ctx, props.directionIndicator.current, 135, 135, canvasCoord, obsSlot, getAngle);
            } else {
                drawPlayerButton(ctx, props.observedBool.current, 135, 135, canvasCoord, obsSlot, getAngle);
            }

            // draw fire
            if (shootPlayer) {
                let bulletAngle = angle(canvasCoord.x, canvasCoord.y, canvasCoord.x + 32 * Number(forward[0]), canvasCoord.y - 30 * Number(forward[1])) + 93;

                canvasCoord.x = canvasCoord.x + 44 * Number(forward[0]);
                canvasCoord.y = canvasCoord.y - 50 * Number(forward[1]);
                drawBullet(ctx, props.bulletIndicator.current, 20, 35, canvasCoord, obsSlot, bulletAngle);
            }

            if (props.playerIndex === 9) {
                // kindly show bomb
                canvasBmbPosition.x = canvasBmbPosition.x - 20;
                canvasBmbPosition.y = canvasBmbPosition.y + 15;
                const bombState = props.bombData.state;
                drawBomb(ctx, bombState, props.bombImg.current, props.bmbPlanted.current, props.bombData, 50, 50, canvasBmbPosition, obsSlot);
            }
        } else {
            // for player dead
            drawPlayerButton(ctx, deadPlayerImage, 50, 50, canvasCoord, obsSlot);
        }


        // each type of grenade
        if (Object.keys(props.playerdata.deployedGrenades).length > 0) {
            let grenadesObj = props.playerdata.deployedGrenades
            Object.keys(grenadesObj).forEach((grenadeObj, grenadeIndex) => {
                if (grenadesObj[grenadeObj].type === 'frag') {
                    drawFrag(ctx, grenadesObj[grenadeObj], props.mapname, props.fragT.current, props.fragCT.current, props.explodeFragT.current, props.explodeFragCT.current, playerSide)
                } else if (grenadesObj[grenadeObj].type === 'flashbang') {
                    drawFlash(ctx, grenadesObj[grenadeObj], props.mapname, props.flashBangT.current, props.flashBangCT.current, props.explodeFragT.current, props.explodeFragCT.current, playerSide)
                } else if (grenadesObj[grenadeObj].type === 'smoke') {
                    drawSmoke(ctx, grenadesObj[grenadeObj], props.mapname, props.smokeT.current, props.smokeCT.current, props.smokeBlastT.current, props.smokeBlastCT.current, playerSide)
                } else if (grenadesObj[grenadeObj].type === 'firebomb') {
                    showFireBomb(ctx, grenadesObj[grenadeObj], props.mapname, props.incGrenareT.current, props.incGrenadeCT.current, playerSide)
                } else if (grenadesObj[grenadeObj].type === 'inferno') {
                    showFlames(ctx, grenadesObj[grenadeObj], props.mapname)
                }
            })

        }
    });

    return <canvas ref={canvas}
        id={"myCanvas_" + props.playerIndex}
        width={1024}
        height={1024}
    />
}

export default Canvas