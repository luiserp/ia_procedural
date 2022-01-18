// Para mejor tipado
interface Rule {
    requirement: Set<String>
    result: Set<String>
}

export default class Parser {

    private rules;
    private initial_state;
    private objetive;
    private changes;

    constructor(rules: Array<Rule>, initial_state: Set<String>, objetive: Set<String>){
        this.rules = rules;
        this.initial_state = initial_state;
        this.objetive = objetive;
        this.changes = true;
    }

    run(){
        while(this.changes && !this.isObjetiveArchive()){
            this.changes = false
            for(let rule of this.rules){                
                if(this.isValidRule(rule.requirement)){
                    this.addNewStates(rule.result)
                }           
            }           
                
        }
        return this.isObjetiveArchive()
    }

    isObjetiveArchive(){
        for(let obj of this.objetive){
            if(this.initial_state.has(obj)){
                return true
            }
        }
        return false
    }

    isValidRule(subset: Set<String>): Boolean {        
        for (var elem of subset) {
            if (!this.initial_state.has(elem)) {
                return false;
            }
        }
        return true;
    }

    addNewStates( newStates: Set<String>){
        for(let e of newStates){
            if(!this.initial_state.has(e)){
                this.changes = true
                this.initial_state.add(e)
            }
        }
    }

}

