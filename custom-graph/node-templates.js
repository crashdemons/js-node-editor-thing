class AbstractComponent extends Rete.Component{
  constructor(name, category=null) {
    category = category===null? "General" : category;
    super(category+':\xA0'+name);
    this.uncategorizedName = name;
    this.categoryName = category;
    this.inputNames=[];
  }
  registerInputs(){
      this.inputNames = [...arguments];
      console.log(" registered inputs: ",this.inputNames)
  }
  
  reduceInput(input){//reduces all input arrays into at least a 1D array of inputs
    if(Array.isArray(input)){
        if(input.length===1) return input[0];
    }
    if(Array.isArray(input)){
        if(input.length===1) return input[0];
    }
    if(!Array.isArray(input)) return input;
    return input;
  }
  wrapInput(input){//reduces all input arrays into at least a 1D array of inputs
    if(!Array.isArray(input)) return [input];
    return input;
  }
  prepareInputs(inputs){
    for(var inputName of this.inputNames){
        //if(typeof inputs[inputName]!=="undefined" && inputs[inputName].length>0){
            console.log(" reducing input "+inputName,inputs[inputName]);
            inputs[inputName] = this.reduceInput(inputs[inputName]);
            console.log(" reduced input "+inputName,inputs[inputName]);
            inputs[inputName] = this.wrapInput(inputs[inputName]);
            console.log(" wrapped input "+inputName,inputs[inputName]);
            inputs[inputName] = inputs[inputName].filter(function( element ) { return element !== undefined; });
            console.log(" trimmed input "+inputName,inputs[inputName]);
        //}
    }
    return inputs;
  }
}

class InputConditionalComponent extends AbstractComponent{
  constructor(name,category=null) {
    super(name,category);
  }
  
  areAnyInputsPresent(inputs){
    for(var inputName of this.inputNames){
        if(typeof inputs[inputName]!=="undefined" && inputs[inputName].length>0){
            return true;
        }
    }
    console.log("no valid inputs:",inputs,this.inputNames)
    return false;
  }
  
  worker(node, inputs, outputs) {
    console.log("conditional input worker - ",node,inputs)
    if(inputs.length===0) return;
    if(!this.areAnyInputsPresent(inputs)) return;
    inputs = this.prepareInputs(inputs);//TODO: remove this and force all operations to support array-processing and collection of results. - this is so we can provide lists of inputs to an algo.
    var ret = this.onInput(node,inputs,outputs);
    if(typeof ret!=="undefined") return ret;
 }
  
  onInput(node, inputs, outputs){
    
  }
}
class SourceComponent extends AbstractComponent{
  constructor(name, category=null) {
    category = category===null? "Source" : category;
    super(name,category);
  }
  
  worker(node, inputs, outputs) {
    var ret = this.onGenerate(node,outputs);
    if(typeof ret!=="undefined") return ret;
  }
  onGenerate(node, outputs){
      
  }
}
class FilterComponent extends InputConditionalComponent{
  constructor(name, category=null) {
    category = category===null? "Filter" : category;
    super(name,category);
  }
}
class CollectedFilterComponent extends FilterComponent{
  constructor(name, category=null) {
    super(name,category);
  }
}


class OutputComponent extends InputConditionalComponent{
  constructor(name, category=null) {
    category = category===null? "Output" : category;
    super(name,category);
  }
}
