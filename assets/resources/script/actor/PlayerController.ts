import { _decorator, Component, Node } from 'cc';
import { Actor } from './Actor';
import { VirtualInput } from '../VirtualInput';
import { StateDefine } from './StateDefine';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('PlayerController')
@requireComponent(Actor)
export class PlayerController extends Component {

    actor:Actor = null;
    start() {
        this.actor = this.node.getComponent(Actor);
        this.node.on("onFrameAttackLoose", this.onFrameAttackLoose, this);
        this.node.on("onFrameAttack", this.onFrameAttack, this);
    }
    onFrameAttackLoose() {
        //emit arrow
        console.log("onFrameAttackLoose");
    }

    onFrameAttack() {
        console.log("onFrameAttack");
    }


    update(deltaTime: number) {
        this.actor.input.x = VirtualInput.horizontal;
        this.actor.input.z = -VirtualInput.vertical;
        if (this.actor.input.length() > 0)
        {
            this.actor.changeState(StateDefine.Run);

        }
        else{
            this.actor.changeState(StateDefine.Idle);
        }


    }
}


