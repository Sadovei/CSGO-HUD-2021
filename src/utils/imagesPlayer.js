import { SVGMap } from '../utils/tools';
import _uniqueId from 'lodash/uniqueId';

const weaponPrimary = ['Shotgun', 'Machine Gun', 'Submachine Gun', 'Rifle', 'SniperRifle']

export default function imagesPlayer(weapons, state, observer_slot, phase) {
    let pistol = undefined,
        weaponMain = undefined,
        grenades = {},
        grenadeImg = [],
        bombC4 = undefined,
        taser = undefined,
        primaryWeaponAmmoOffset = 100,
        activeWeapon = {
            ammo_clip: undefined,
            ammo_clip_max: undefined,
            type: undefined,
            name: undefined
        }

    let WeaponIMG, PistolIMG, DefuseIMG, BombIMG, TaserIMG;

    Object.keys(weapons).forEach(weapon => {
        if (weapons[weapon].state === 'active') {
            activeWeapon.ammo_clip = weapons[weapon].ammo_clip
            activeWeapon.ammo_clip_max = weapons[weapon].ammo_clip_max
            activeWeapon.ammo_reserve = weapons[weapon].ammo_reserve
            activeWeapon.type = weapons[weapon].type
            activeWeapon.name = weapons[weapon].name
        }

        if (weapons[weapon].name === 'weapon_taser') {
            taser = weapons[weapon].name.split(/_(.+)/)[1]
        }

        if (weaponPrimary.includes(weapons[weapon].type)) {
            weaponMain = weapons[weapon].name.split(/_(.+)/)[1]
            primaryWeaponAmmoOffset = 100 * weapons[weapon].ammo_clip / weapons[weapon].ammo_clip_max;
        }

        if (weapons[weapon].type === 'Pistol') {
            pistol = weapons[weapon].name.split('_')[1]
            primaryWeaponAmmoOffset = 100 * weapons[weapon].ammo_clip / weapons[weapon].ammo_clip_max;
        }

        if (weapons[weapon].type === 'C4') {
            bombC4 = weapons[weapon].name.split('_')[1]
        }

        if (weapons[weapon].type === 'Grenade') {
            grenades[weapons[weapon].name.split('_')[1]] = {
                count: weapons[weapon].ammo_reserve,
                state: 'holstered'
            }

            if (weapons[weapon].state === 'active') {
                grenades[weapons[weapon].name.split('_')[1]].state = 'active'
            }
        }
    })

    if (activeWeapon.name !== undefined && weaponMain !== undefined) {
        let NadeSVG = SVGMap[weaponMain];
        WeaponIMG = <div className={`primary ${weaponPrimary.includes(activeWeapon.type) ? 'active' : 'holstered'}`}>
            {(NadeSVG !== null) ? < NadeSVG /> : null}
        </div>
    }

    if (activeWeapon.name !== undefined && taser !== undefined) {
        let NadeSVG = SVGMap[taser];
        TaserIMG =
            <div className={`taser ${activeWeapon.name === "weapon_taser" ? 'active' : 'holstered'}`}>
                {(NadeSVG !== null) ? < NadeSVG /> : null}
            </div>
    }


    if (activeWeapon.name !== undefined && pistol !== undefined) {
        let NadeSVG = SVGMap[pistol];

        PistolIMG = <div className={`secondary ${activeWeapon.type !== 'Pistol' ? 'holstered' : 'active'}`}>
            {(NadeSVG !== null) ? < NadeSVG /> : null}
        </div>
    }

    if (state.defusekit) {
        let NadeSVG = SVGMap.defuser;

        DefuseIMG = <div className={`utilities defuse ${phase === 'bomb' ? 'pulsar' : ''}`}>
            {(NadeSVG !== null) ? < NadeSVG /> : null}
            <div className="str-circle2"></div>
            <div className="str-circle3"></div>
        </div>
    }

    if (activeWeapon.name !== undefined && bombC4 !== undefined) {
        let NadeSVG = SVGMap.c4;

        BombIMG = <div className={`utilities bomb ${activeWeapon.type === 'C4' ? 'active' : 'holstered'}`}>
            {(NadeSVG !== null) ? < NadeSVG /> : null}
        </div>
    }

    Object.keys(grenades).forEach((grenade) => {
        let NadeSVG = SVGMap[grenade];
        if (grenades[grenade].count === 2) {
            grenadeImg.push(<div className={`utilities ${grenade} ${grenades[grenade].state !== 'active' ? 'holstered' : 'holstered'}`} key={_uniqueId('index-')}>
                {(NadeSVG !== null) ? < NadeSVG /> : null}
            </div>);
            grenadeImg.push(<div className={`utilities ${grenade} ${grenades[grenade].state}`} key={_uniqueId('index-')}>
                {(NadeSVG !== null) ? < NadeSVG /> : null}
            </div>);
        } else
            grenadeImg.push(<div className={`utilities ${grenade} ${grenades[grenade].state}`} key={_uniqueId('index-')}>
                {(NadeSVG !== null) ? < NadeSVG /> : null}
            </div>);
    })

    let ammoFillAnim = <svg className="ammo-helper">
        <defs>
            <linearGradient id={`ammo-fill-${observer_slot ?? observer_slot}`} x1="0" y1="0%" x2="100%" y2="0%" spreadMethod="pad">
                <stop stopColor="white" stopOpacity="1" offset={primaryWeaponAmmoOffset + "%"} />
                <stop stopColor="gray" stopOpacity="1" offset={primaryWeaponAmmoOffset + "%"} />
            </linearGradient>
        </defs>
    </svg>;

    return { WeaponIMG, PistolIMG, BombIMG, DefuseIMG, grenadeImg, activeWeapon, ammoFillAnim, TaserIMG }
}
