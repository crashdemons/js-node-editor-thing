class AbstractComponent extends Rete.Component{
  constructor(name, category=null) {
    category = category===null? "General" : category;
    super(category+':\xA0'+name);
    this.uncategorizedName = name;
    this.categoryName = category;
    this.inputNames=[];
    this.inputConnectionsRequired = false;
  }
  registerInputs(){
      this.inputNames = [...arguments];
      console.log(" registered inputs: ",this.inputNames)
  }
  
  builder(node) {
      node.inputConnectionsRequired = this.inputConnectionsRequired;
      setNodeEnabled(node,false);
      this.onBuild(node);
      //var nodeDetail = this.editor.nodes.find(n => n.id === node.id);
      //console.log("abstractnode nodedetal",node,nodeDetail);
  }
  
  onBuild(node){
      
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
            //console.log(" reducing input "+inputName,inputs[inputName]);
            inputs[inputName] = this.reduceInput(inputs[inputName]);
            //console.log(" reduced input "+inputName,inputs[inputName]);
            inputs[inputName] = this.wrapInput(inputs[inputName]);
            //console.log(" wrapped input "+inputName,inputs[inputName]);
            inputs[inputName] = inputs[inputName].filter(function( element ) { return element !== undefined; });
            //console.log(" trimmed input "+inputName,inputs[inputName]);
        //}
    }
    return inputs;
  }
  
  hasAllInputConnections(node){
      window.g_testn=node;
      window.g_test=node.inputs;
      
      if(node.inputs instanceof Map){
          for(var inputkey of node.inputs.keys()){
            var input = node.inputs.get(inputkey);
            if(input.connections.length<1) return false;
          }
      }else{
        for(var inputkey of Object.keys(node.inputs)){
           var input = node.inputs[inputkey];
           if(input.connections.length<1) return false;
        }
      }
      
      

      return true;
  }
  
}

class InputConditionalComponent extends AbstractComponent{
  constructor(name,category=null) {
    super(name,category);
    this.inputConnectionsRequired=true;
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
    if(!node.data.enabled){
        console.log("disabled node - ",node,node.inputs);
        return;
    }
    /*if(this.inputConnectionsRequired && !this.hasAllInputConnections(node)){
        console.log("disconnected node - ",node,node.inputs);
        return;
    }*/ //superceded by the node.data.enabled check (connect/disconnect-ran)
        
    console.log("conditional input worker CHECK - ",node,inputs)
    if(inputs.length===0) return;
    //if(!this.areAnyInputsPresent(inputs)) return;
    inputs = this.prepareInputs(inputs);//TODO: remove this and force all operations to support array-processing and collection of results. - this is so we can provide lists of inputs to an algo.
    if(!this.areAnyInputsPresent(inputs)) return;
    console.log("conditional input worker PROC- ",node,inputs)
    var ret = this.onInput(node,inputs,outputs);
    if(typeof ret!=="undefined") return ret;
 }
  
  onInput(node, inputs, outputs){
    
  }
}

function actionToBoolean(action){
    if(action===0) return false;
    if(action===1) return true;
    return action?true:false;
}


class SourceComponent extends AbstractComponent{
  constructor(name, category=null) {
    category = category===null? "Source" : category;
    super(name,category);
  }
  
  builder(node) {
      super.builder(node);
      setNodeEnabled(node,true);
  }
  
  worker(node, inputs, outputs) {
    console.log("source",inputs,node)
    var ret = this.onGenerate(node,outputs);
    if(typeof ret!=="undefined") return ret;
  }
  onGenerate(node, outputs){
      
  }
}


class TogglableSourceComponent extends SourceComponent{
  constructor(name, category=null) {
    super(name,category);
  }
  
  builder(node) {
      super.builder(node);
      setNodeEnabled(node,true);
    node.addInput(new Rete.Input('toggle', 'Toggle', actionSocket));
  }
  
  worker(node, inputs, outputs) {
    console.log("sourceT",inputs,node)
    if(inputs.toggle.length>0){
        setNodeEnabled(node,actionToBoolean(inputs.toggle[0]));
    }else{
        setNodeEnabled(node,true);
    }
    if(!node.data.enabled) return;
    return super.worker(node, inputs, outputs);
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
