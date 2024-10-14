import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIStartup')
export class UIStartup extends Component {
    start() {
        let btn = this.node.getChildByName("Button");
        btn.on(Button.EventType.CLICK, this.onBtnClick, this);

    }

    update(deltaTime: number) {

    }

    onBtnClick() {
        director.loadScene("game");
    }


}


