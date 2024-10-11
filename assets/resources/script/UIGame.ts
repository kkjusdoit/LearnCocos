import { _decorator, assetManager, Component, director, Node, resources } from 'cc';
import { DialogDef, UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('UIGame')
export class UIGame extends Component {
    start() {

    }

    update(deltaTime: number) {

    }

    onExitGame() {
        // resources.releaseUnusedAssets();// 释放资源
        assetManager["releaseUnusedAssets"]();
        director.loadScene("startup");// 加载场景



    };

    onPauseGame() {
        if (director.isPaused()) {
            director.resume();
            return;
        }
        director.pause();
    };

    onOpenSetting(){
        UIManager.instance.openDialog(DialogDef.UISetting);

    };




}


