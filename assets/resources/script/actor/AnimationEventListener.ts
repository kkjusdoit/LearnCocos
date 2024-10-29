import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimationEventListener')
export class AnimationEventListener extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    onFrameAttackLoosed(){
        this.node.parent.emit("onFrameAttackLoose");

    }

    onFrameAttack() {
        console.log("onFrameAttack");
    }

}


