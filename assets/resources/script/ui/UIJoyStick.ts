import { _decorator, CCFloat, Component, EventTouch, Input, input, math, Node, v3, Vec3 } from 'cc';
import { VirtualInput } from '../VirtualInput';
const { ccclass, property } = _decorator;

@ccclass('UIJoyStick')
export class UIJoyStick extends Component {
    @property(Node)

    stickBg: Node = null;
    @property(Node)
    thumbNail: Node = null;


    @property({ type: CCFloat })
    radius: number = 0;


    initPosition: Vec3 = v3(0, 0, 0);

    start() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        this.initPosition = this.stickBg.worldPosition.clone();

    }

    update(deltaTime: number) {





    }

    onTouchStart(event: EventTouch) {
        let x = event.touch.getUILocationX();
        let y = event.touch.getUILocationY();
        console.log("onTouchStart");
        this.stickBg.setWorldPosition(x, y, 0);


    }

    onTouchMove(event: EventTouch) {
        let x = event.touch.getUILocationX();
        let y = event.touch.getUILocationY();
        let worldPos = v3(x, y, 0);
        let localPos = v3()
        this.stickBg.inverseTransformPoint(localPos, worldPos);
        let len = localPos.length();
        localPos.normalize();
        localPos.multiplyScalar(math.clamp(len, 0, this.radius));
        this.thumbNail.setPosition(localPos);

        VirtualInput.vertical = this.thumbNail.position.y / this.radius;
        VirtualInput.horizontal = this.thumbNail.position.x / this.radius;


    }

    onTouchEnd(event: EventTouch) {
        console.log("onTouchEnd");
        this.stickBg.setWorldPosition(this.initPosition);

        this.thumbNail.setPosition(Vec3.ZERO);
        VirtualInput.vertical = 0;
        VirtualInput.horizontal = 0;
    }



}


