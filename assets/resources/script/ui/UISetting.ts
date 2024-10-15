import { _decorator, Component, Node, ProgressBar, Slider, sys } from 'cc';
import { UIManager } from './UIManager';
import { Setting } from '../config/Setting';
const { ccclass, property } = _decorator;

@ccclass('UISetting')
export class UISetting extends Component {
    


    sliderBgmVolume:Slider = null;
    progressbarBgmVolume : ProgressBar = null;

    
    sliderFxVolume:Slider = null;
    progressbarFxVolume : ProgressBar = null;
    start() {
        console.log("UISetting start " + this.node.getChildByPath("BGM/ProgressBar"));
        console.log("UISetting  BGM start" + this.node.getChildByName("BGM"));
        console.log("UISetting start SFX" + this.node.getChildByPath("SFX/ProgressBar"));
        console.log("UISetting  SFX start" + this.node.getChildByName("SFX"));
        this.progressbarBgmVolume = this.node.getChildByPath("BGM/ProgressBar").getComponent(ProgressBar);
        this.sliderBgmVolume = this.node.getChildByName("BGM").getComponent(Slider);
        this.progressbarFxVolume = this.node.getChildByPath("SFX/ProgressBar").getComponent(ProgressBar);
        this.sliderFxVolume = this.node.getChildByName("SFX").getComponent(Slider);

        this.sliderBgmVolume.node.on("slide", this.onBgmVolumeChange, this);
        this.sliderFxVolume.node.on("slide", this.onFxVolumeChange, this);

        console.log("UISetting Setting.instance.bgmVolume " + Setting.instance.bgmVolume);

        console.log("UISetting  Setting.instance.sfxVolume" + Setting.instance.sfxVolume);

        this.sliderBgmVolume.progress = Setting.instance.bgmVolume;
        this.sliderFxVolume.progress = Setting.instance.sfxVolume;


        //缺少init 重新打开界面时

    }

    onFxVolumeChange(val : Slider){
        this.progressbarFxVolume.progress = val.progress;
        console.log("UISetting  onFxVolumeChange " + val.progress);
        Setting.instance.sfxVolume = val.progress;
    }


    onBgmVolumeChange(val : Slider){
        console.log("UISetting  onBgmVolumeChange " + val.progress);

        this.progressbarBgmVolume.progress = val.progress;
        Setting.instance.bgmVolume = val.progress;
    }


    update(deltaTime: number) {
        
    }



    onClickClose(){
        UIManager.instance.closeDialog();

    }


}


