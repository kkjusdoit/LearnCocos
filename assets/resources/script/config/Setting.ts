import { EventTarget, math } from "cc";
import { PlayerPreference } from "./PlayerPreference";

export class Setting extends EventTarget {

    private static _instance : Setting = null;

    static get instance(){
        if(this._instance == null){
            this._instance = new Setting();
        }
        return this._instance;
    }


    private _bgmVolume : number = 1.0;
    set bgmVolume(val : number){
        this._bgmVolume = math.clamp01(val);
        PlayerPreference.setFloat("bgmVolume", this._bgmVolume);

        this.emit('onBgmVolumeChanged', this._bgmVolume);


    }

    get bgmVolume(){
        return this._bgmVolume;
    }

    private _sfxVolume : number = 1.0;

    set sfxVolume(val : number){
        this._sfxVolume = math.clamp01(val);
        PlayerPreference.setFloat("sfxVolume", this._sfxVolume);
        this.emit('onSfxVolumeChanged', this._bgmVolume);

    }

    get sfxVolume(){
        return this._sfxVolume;
    }

    load()  {
        this._bgmVolume = PlayerPreference.getFloat("bgmVolume", 1.0);
        this._sfxVolume = PlayerPreference.getFloat("sfxVolume", 1.0);
    }






}