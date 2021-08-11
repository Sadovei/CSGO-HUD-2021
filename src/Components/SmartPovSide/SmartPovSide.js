import React, { useEffect, useState } from 'react'
import { SVGMap, weaponPrimary } from '../../utils/tools';

import PovSide from './PovSide/PovSide';
import _uniqueId from 'lodash/uniqueId';
import { mockupPovData } from '../../utils/mockups';
import { subscribeToPov } from '../../utils/socketIO';

export default function SmartPovSide() {
    const [povData, setPovData] = useState(mockupPovData);
    useEffect(() => {
        subscribeToPov(data => {
            setPovData(data)
        })
    }, [])

    if (povData === undefined || povData.steamid === undefined) {
        return null;
    }

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

    Object.keys(povData.weapons).forEach(weapon => {
        if (povData.weapons[weapon].state === 'active') {
            activeWeapon.ammo_clip = povData.weapons[weapon].ammo_clip
            activeWeapon.ammo_clip_max = povData.weapons[weapon].ammo_clip_max
            activeWeapon.type = povData.weapons[weapon].type
        }

        if (weaponPrimary.includes(povData.weapons[weapon].type)) {
            weaponMain = povData.weapons[weapon].name.split(/_(.+)/)[1]
            primaryWeaponAmmoOffset = 100 * povData.weapons[weapon].ammo_clip / povData.weapons[weapon].ammo_clip_max;
        }

        if (povData.weapons[weapon].type === 'Pistol') {
            pistol = povData.weapons[weapon].name.split('_')[1]
            primaryWeaponAmmoOffset = 100 * povData.weapons[weapon].ammo_clip / povData.weapons[weapon].ammo_clip_max;
        }

        if (povData.weapons[weapon].type === 'C4') {
            bombC4 = povData.weapons[weapon].name.split('_')[1]
        }

        if (povData.weapons[weapon].type === 'Grenade') {
            grenades[povData.weapons[weapon].name.split('_')[1]] = {
                count: povData.weapons[weapon].ammo_reserve,
                state: 'holstered'
            }

            if (povData.weapons[weapon].state === 'active') {
                grenades[povData.weapons[weapon].name.split('_')[1]].state = 'active'
            }
        }
    })

    let WeaponIMG, PistolIMG, DefuseIMG, BombIMG;
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

    if (povData.state.defusekit) {
        let NadeSVG = SVGMap.defuser;

        DefuseIMG = <div className={`defuse`}>
            {(NadeSVG !== null) ? < NadeSVG /> : null}
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
            <linearGradient id={"ammo-fill"} x1="0" y1="0%" x2="100%" y2="0%" spreadMethod="pad">
                <stop stopColor="white" stopOpacity="1" offset={primaryWeaponAmmoOffset + "%"} />
                <stop stopColor="gray" stopOpacity="1" offset={primaryWeaponAmmoOffset + "%"} />
            </linearGradient>
        </defs>
    </svg>;

    return <PovSide povData={povData}
        DefuseIMG={DefuseIMG}
        grenadeImg={grenadeImg}
        BombIMG={BombIMG}
        PistolIMG={PistolIMG}
        WeaponIMG={WeaponIMG}
        activeWeapon={activeWeapon}
        ammoFillAnim={ammoFillAnim} />;
}
