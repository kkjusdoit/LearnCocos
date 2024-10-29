import { _decorator,CCFloat,Collider,Component,Node, RigidBody, SkeletalAnimation, v3, Vec2, Vec3 } from "cc";
import { StateDefine } from "./StateDefine";
import { MathUtil } from "../util/MathUtil";
const { ccclass, property } = _decorator;
let temVelocity = v3(); //global variable

@ccclass("Actor")
export class Actor extends Component {
    curState:StateDefine = StateDefine.Idle;

    @property(SkeletalAnimation)
    skeletalAnimation: SkeletalAnimation = null;


    rigidbody: RigidBody = null;
    collider : Collider = null;


    @property(CCFloat)
    linearSpeed:number = 1.0;
    input:Vec3 = v3();

    @property(CCFloat)
    angularSpeed :number = 10;

    protected start(): void {
        this.rigidbody = this.node.getComponent(RigidBody);
        this.collider = this.node.getComponent(Collider);

    }

    protected update(deltaTime: number): void {

        this.node.forward = this.input;
        switch (this.curState) {
            case StateDefine.Run:
                //rigidbody -> set velocity
                //transform -> set position
                this.doRotate();
                this.doMove();
                break;

        }


    }

    doRotate(){
        temVelocity.x = 0;
        temVelocity.z = 0;
        //input forward with curr forward
        const angle = MathUtil.sinAngle(this.node.forward, this.input, Vec3.UP);

        temVelocity.y = angle * this.angularSpeed;
        this.rigidbody.setAngularVelocity(temVelocity)
    }

    doMove(){
        //速度 = 方向（node.forward） * 基础速度 * 因子（遥杆输入）
        const speed = this.input.length() * this.linearSpeed;
        temVelocity.y = 0;
        temVelocity.x = this.node.forward.x * speed;
        temVelocity.z = this.node.forward.z * speed;

        this.rigidbody.setLinearVelocity(temVelocity);


    }

    stopMove(){
        this.rigidbody.setLinearVelocity(Vec3.ZERO);
    }


    changeState(state: StateDefine) {
        if (this.curState == StateDefine.Die) {

            return;
        }
        if (this.curState == StateDefine.Hit){
            if (state != StateDefine.Die && state == StateDefine.Hit){
                return;
            }
        }

        if (state != StateDefine.Run){
            this.stopMove();
        }

        this.curState = state;
        console.log("changeState this.curState    " + this.curState);

        this.skeletalAnimation.crossFade(this.curState, 0.3);
    }

    respawn() {
        this.curState = StateDefine.Idle;
        this.changeState(this.curState);

    }



}