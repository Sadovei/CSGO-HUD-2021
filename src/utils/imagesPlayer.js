import { SVGMap, weaponPrimary } from '../utils/tools';
import _uniqueId from 'lodash/uniqueId';

export default function imagesPlayer(infoPlayer, phase) {
    let pistol = undefined,
        weaponMain = undefined,
        grenades = {},
        grenadeImg = [],
        bombC4 = undefined,
        primaryWeaponAmmoOffset = 100,
        activeWeapon = {
            ammo_clip: undefined,
            ammo_clip_max: undefined,
            type: undefined
        }

    let WeaponIMG, PistolIMG, DefuseIMG, BombIMG;
    Object.keys(infoPlayer.weapons).forEach(weapon => {
        if (infoPlayer.weapons[weapon].state === 'active') {
            activeWeapon.ammo_clip = infoPlayer.weapons[weapon].ammo_clip
            activeWeapon.ammo_clip_max = infoPlayer.weapons[weapon].ammo_clip_max
            activeWeapon.type = infoPlayer.weapons[weapon].type
        }

        if (weaponPrimary.includes(infoPlayer.weapons[weapon].type)) {
            weaponMain = infoPlayer.weapons[weapon].name.split(/_(.+)/)[1]
            primaryWeaponAmmoOffset = 100 * infoPlayer.weapons[weapon].ammo_clip / infoPlayer.weapons[weapon].ammo_clip_max;
        }

        if (infoPlayer.weapons[weapon].type === 'Pistol') {
            pistol = infoPlayer.weapons[weapon].name.split('_')[1]
            primaryWeaponAmmoOffset = 100 * infoPlayer.weapons[weapon].ammo_clip / infoPlayer.weapons[weapon].ammo_clip_max;
        }

        if (infoPlayer.weapons[weapon].type === 'C4') {
            bombC4 = infoPlayer.weapons[weapon].name.split('_')[1]
        }

        if (infoPlayer.weapons[weapon].type === 'Grenade') {
            grenades[infoPlayer.weapons[weapon].name.split('_')[1]] = {
                count: infoPlayer.weapons[weapon].ammo_reserve,
                state: 'holstered'
            }

            if (infoPlayer.weapons[weapon].state === 'active') {
                grenades[infoPlayer.weapons[weapon].name.split('_')[1]].state = 'active'
            }
        }
    })

    if (activeWeapon.type !== undefined && weaponMain !== undefined) {
        let NadeSVG = SVGMap[weaponMain];
        WeaponIMG = <div className={`primary ${weaponPrimary.includes(activeWeapon.type) ? 'active' : 'holstered'}`}>
            {(NadeSVG !== null) ? < NadeSVG /> : null}
        </div>
    }

    if (activeWeapon.type !== undefined && pistol !== undefined) {
        let NadeSVG = SVGMap[pistol];

        PistolIMG = <div className={`secondary ${activeWeapon.type !== 'Pistol' ? 'holstered' : 'active'}`}>
            {(NadeSVG !== null) ? < NadeSVG /> : null}
        </div>
    }

    if (infoPlayer.state.defusekit) {
        let NadeSVG = SVGMap.defuser;

        DefuseIMG = <div className={`defuse ${phase === 'bomb' ? 'pulsar' : ''}`}>
            {(NadeSVG !== null) ? < NadeSVG /> : null}
            <div className="str-circle2"></div>
            <div className="str-circle3"></div>
        </div>
    }

    if (activeWeapon.type !== undefined && bombC4 !== undefined) {
        let NadeSVG = SVGMap.c4;

        BombIMG = <div className={`bomb ${activeWeapon.type === 'C4' ? 'active' : 'holstered'}`}>
            {(NadeSVG !== null) ? < NadeSVG /> : null}
        </div>
    }

    Object.keys(grenades).forEach((grenade) => {
        let NadeSVG = SVGMap[grenade];
        if (grenades[grenade].count === 2) {
            grenadeImg.push(<div className={`grenade ${grenade} ${grenades[grenade].state !== 'active' ? 'holstered' : 'holstered'}`} key={_uniqueId('index-')}>
                {(NadeSVG !== null) ? < NadeSVG /> : null}
            </div>);
            grenadeImg.push(<div className={`grenade ${grenade} ${grenades[grenade].state}`} key={_uniqueId('index-')}>
                {(NadeSVG !== null) ? < NadeSVG /> : null}
            </div>);
        } else
            grenadeImg.push(<div className={`grenade ${grenade} ${grenades[grenade].state}`} key={_uniqueId('index-')}>
                {(NadeSVG !== null) ? < NadeSVG /> : null}
            </div>);
    })

    let ammoFillAnim = <svg className="ammo-helper">
        <defs>
            <linearGradient id={`ammo-fill-${infoPlayer.observer_slot ?? infoPlayer.observer_slot}`} x1="0" y1="0%" x2="100%" y2="0%" spreadMethod="pad">
                <stop stopColor="white" stopOpacity="1" offset={primaryWeaponAmmoOffset + "%"} />
                <stop stopColor="gray" stopOpacity="1" offset={primaryWeaponAmmoOffset + "%"} />
            </linearGradient>
        </defs>
    </svg>;

    return { WeaponIMG, PistolIMG, BombIMG, DefuseIMG, grenadeImg, activeWeapon, ammoFillAnim }
}
