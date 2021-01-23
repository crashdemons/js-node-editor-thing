function isRootNode(node){
	var connections = getConnectionStates(node);
	if(connections.total===0) return true;//no inputs = root node
	//more than 1 input connection is possible (not necessarily required)

	//if an input is required, it can't be a root node
	//if it HAS a connected input, it also can't be a root node
	if(connections.required || connections.connected.length>0) return false;
	
	//remaining nodes have no inputs connected and don't require them
	//therefore they are root nodes
	return true;
}

function isTerminalNode(node){
        if(node.outputs.size>0) return false;
	return true;
}

function getRootNodes(){
    return editor.nodes.filter(n=>n.data.enabled).filter(isRootNode);
}

function getTerminalNodes(){
    return editor.nodes.filter(n=>n.data.enabled).filter(isTerminalNode);
}


function getParentNodes(node){
    var keys = node.inputs.keys()
    var prevEntries = [];
    for(var entry of node.inputs){
        var key = entry[0];
        var input = entry[1];
        var connections = input.connections;
        if(connections.length<1){
            prevEntries.push(null);
        }else{
            var connection = connections[0];
            var output = connection.output;
            var prevNode = output.node;
            prevEntries.push(prevNode);
        }
    }
    return {parents:prevEntries,node:node};
}


/*
if A is the return/output/terminal node used as a root this traverse like follows
on the hypothetical tree:
      a
  c   d   e
 f g h i j k

traversal output: (not grouped)
 acde fg dhi ejk


*/

function createNodeInfo(node){
    return {
        node:node,
        parentCount:0,
        
        parents:[],
        
        toString:function(){
            if(node===null) return "null";
            var name = node.name.replace(/\(+/g,'_').replace(/\)+/g,'_').replace(/(:|\s)+/g,'_').replace(/_+/g,"_").replace(/_$/,"");
            var parentsToString = this.parents.map(ni=>ni.toString());
            
            
            
            var value = getNodeValue(node);
            //if value==="undefined";
            if(value!==undefined) parentsToString.unshift(value);
            
            
            var argString = parentsToString.join(",");
            return name+"("+argString+")";
        }
    };
}


function getReversePreorder(root)
{
    if (root === null)
       return;
 
    var stack = [];
    stack.push(root);
    
    var preorderStack = [];
 
    while (stack.length>0)
    {
        var node = stack.pop();
        var nodeInfo = createNodeInfo(node);
        var parents = node===null? [] : getParentNodes(node).parents;
        nodeInfo.parentCount = parents.length;
        
        preorderStack.push(nodeInfo);
        console.log (node);//our preorder output function!!!!
        
        if(node===null) continue;
        
        for(var i=parents.length-1;i>=0;i--){//push right to left since the stack is pop'd reverse of this
            var rightToLeftNode = parents[i];
            stack.push(rightToLeftNode);
        };
    }
    return preorderStack;
}

/*
      a
  c   d   e
 f g h i j k
------------------
a cfg dhi ejk
 */







/*
a cfg dhi ejk
3 2   2   2

[a,3]

 */

function getNodeValue(node){
    if(node===null) return undefined;
    var data = node.data;
    var dataCopy = Object.assign({},data);
    delete dataCopy.enabled;
    var keys = Object.keys(dataCopy);
    if(keys.length===0) return undefined;
    var key = keys[0];
    console.log("getnodevalue",key,dataCopy);
    return dataCopy[key];
}

function getReverseTreeFromPreorder(preorder, mapper=(n)=>{return n}){
    var stack = [];
    while(preorder.length>0){
        var rightToLeftNode_Info = preorder.pop();
        var rightToLeftNode = rightToLeftNode_Info.node;
        var name = rightToLeftNode===null?"null":rightToLeftNode.name;
        var parentCount = rightToLeftNode_Info.parentCount;
        rightToLeftNode_Info.name = name;
        
        rightToLeftNode_Info = mapper(rightToLeftNode_Info);
        
        //console.log("tree: ready: ",name,rightToLeftNode_Info)
        if(parentCount>0 && stack.length>=parentCount){
            //console.log(" tree: collecting args for: ",name,rightToLeftNode_Info)
            var arguments = [];
            for(var i=0;i<parentCount;i++){
                var arg = stack.pop();
                console.log("  tree: pop and collect arg: ",arg.name,arg)
                arguments.push(arg);
            }
            rightToLeftNode_Info.parents=arguments;
            //console.log(" tree: stack pushed Collected: ",name,rightToLeftNode_Info)
            stack.push(rightToLeftNode_Info);
        }else{
            //console.log(" tree: stack pushed: ",name,rightToLeftNode_Info)
            stack.push(rightToLeftNode_Info);
        }
        //console.log(" tree: internal stack: ",stack)
    }
    if(stack.length>1) throw "something went wrong - tree should have converged to one root node";
    return stack[0];
}


function getReverseTree(root){
    var preorder = getReversePreorder(root);
    return getReverseTreeFromPreorder(preorder);
}

function getReverseTree_Pseudocode(root){
    var preorder = getReversePreorder(root);
    var tree=getReverseTreeFromPreorder(preorder);
    
    //"Output_Text(5,Filter_XOR_decimal(Source_Integer(4,null),Source_Integer(1,null)))"
    
    function Source_Integer(i,trigger){
        if(trigger===null || trigger===1) return ""+i;
        return "null";
    }
    function Output_Text(internal,input){
        return "alert("+input+")";
    }
    function Output_Console(internal,input){
        return "console.log("+input+")";
    }
    function Filter_XOR_decimal(a,b){
        return "("+a+"^"+b+")";
    }
    
    var pseudocode = tree.toString();
    try{
        pseudocode = eval(pseudocode);
    }catch(e){
        
    }
    
    
    
    
    return pseudocode;
    
}
