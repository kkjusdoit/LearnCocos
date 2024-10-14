import { _decorator, Component, Node } from 'cc';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('UISetting')
export class UISetting extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    onClickClose(){
        UIManager.instance.closeDialog();

    }


}


