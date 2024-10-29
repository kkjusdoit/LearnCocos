import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
    start() {
        this.node.on("onFrameAttackLoose", this.onFrameAttackLoose, this);

    }

    update(deltaTime: number) {
        
    }

    onFrameAttackLoose(){
        console.log("onFrameAttackLoose enemy");
    }

}


