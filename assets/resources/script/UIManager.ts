import { resources,Prefab, Node, find, instantiate } from "cc";

export enum DialogDef {
    UISetting = 'UISetting',
    UISkillUpgrade = 'UISkillUpgrade',


}

export class UIManager {
    private static _instance : UIManager = null;

    static get instance():UIManager{

        if (this._instance == null){
            this._instance = new UIManager();

        }

        return this._instance;

    }


    uiRoot:Node;
    panels : Map<string, Node> = new Map<string, Node>();

    openPanel(name: string, bringToTop : boolean = true){
        if (this.uiRoot == null){
            this.uiRoot = find("UIRoot");
        }

        if (this.panels.has(name)){
            let panel = this.panels.get(name);
            panel.active = true;
            if (bringToTop){
                const idx = this.uiRoot.children.length - 1;

                panel.setSiblingIndex(idx);
            }
            return;
        }


        resources.load("ui/prefab" + name, Prefab, (err, prefab : Prefab) => {
            let panel = instantiate(prefab);
            this.uiRoot.addChild(panel);
            if (bringToTop){
                const idx = this.uiRoot.children.length - 1;

                panel.setSiblingIndex(idx);
            }

            this.panels.set(name, panel);

        });


    }

    closePanel(name:string, destroy : boolean = false){

        if (!this.panels.has(name)){
            return;

        }

        let panel = this.panels.get(name);

        if (destroy){
            this.panels.delete(name);
            panel.removeFromParent();
            return;

        }
        panel.active = false;


    }

    openDialog(name:string){
        for (let dialogDef in DialogDef){

            if (dialogDef == name){
                this.openPanel(dialogDef);
                return;

            }
            else{
                this.closePanel(dialogDef);

            }

        }

    }

    closeDialog(destroy:boolean = false){

        for (let dialogDef in DialogDef){

            this.closePanel(dialogDef, destroy);


        }

    }




}