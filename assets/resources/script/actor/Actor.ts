import { _decorator,Collider,Component,Node, RigidBody, SkeletalAnimation } from "cc";
import { StateDefine } from "./StateDefine";
const { ccclass, property } = _decorator;

@ccclass("Actor")
export class Actor extends Component {
    curState:StateDefine = StateDefine.Idle;

    @property(SkeletalAnimation)
    skeletalAnimation: SkeletalAnimation = null;


    rigidbody: RigidBody = null;
    collider : Collider = null;


    protected start(): void {
        this.rigidbody = this.node.getComponent(RigidBody);
        this.collider = this.node.getComponent(Collider);

    }

    protected update(deltaTime: number): void {
        switch (this.curState) {
            case StateDefine.Run:
                //rigidbody -> set velocity
                //transform -> set position

                break;

        }


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
        this.curState = state;
        this.skeletalAnimation.crossFade(this.curState, 0.3);
    }

    respawn() {
        this.curState = StateDefine.Idle;
        this.changeState(this.curState);

    }



}