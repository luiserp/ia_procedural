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

// EJEMPLO

// let rules = [
//     {
//         requirement : new Set(['prepara_suelo', 'llueve']),
//         result: new Set(['buena_tierra'])
//     },
//     {
//         requirement : new Set(['buena_tierra', 'siembra']),
//         result: new Set(['nace_planta'])
//     },
//     {
//         requirement : new Set(['nace_planta', 'llueve']),
//         result: new Set(['crece_planta'])
//     },
//     {
//         requirement : new Set(['buen_clima']),
//         result: new Set(['llueve'])
//     },
//     {
//         requirement : new Set(['crece_planta', 'buen_clima']),
//         result: new Set(['da_fruto'])
//     },
// ]
// let initial_state = new Set(['llueve', 'prepara_suelo', 'siembra'])
// let objetive = new Set(['da_fruto'])

// let p = new Parser(rules, initial_state, objetive)
// p.run()