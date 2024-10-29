import { v3, Vec3 } from "cc";

export class MathUtil{
    /*
    带符号的夹角
    */
    static sinAngle(from:Vec3, to:Vec3, aixs:Vec3):number{
        const angle = Vec3.angle(from, to);
        let cross = v3();
        Vec3.cross(cross, from, to);
        const sign = Math.sign(cross.x * aixs.x + cross.y * aixs.y + cross.z * aixs.z);
        return angle * sign;
        
    }
}