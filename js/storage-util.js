function canUseStorage(){
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

var STORAGE_APPID="test238450";

function storage_setData(data){
    localStorage.setItem(STORAGE_APPID+"nodes",JSON.stringify(data.nodes));
    localStorage.setItem(STORAGE_APPID+"groups",JSON.stringify(data.groups));
}
function storage_getData(){
    var data = {
        'id': 'tasksample@0.1.0',
        'nodes': {/*
            '2': {
                'id': 2,
                'data': {},
                'group': null,
                'inputs': {},
                'outputs': {
                    'act': {
                        'connections': [
                            {
                                'node': 3,
                                'input': 'act'
                            }
                        ]
                    },
                    'key': {
                        'connections': [
                            {
                                'node': 3,
                                'input': 'key'
                            }
                        ]
                    }
                },
                'position': [
                    114, 133
                ],
                'name': 'Keydown event'
            },
            '3': {
                'id': 3,
                'data': {},
                'group': null,
                'inputs': {
                    'act':{
                        'connections': [
                            {
                                'node': 2,
                                'output': 'act'
                            }
                        ]
                    }, 
                    'key': {
                        'connections': [
                            {
                                'node': 2,
                                'output': 'key'
                            }
                        ]
                    }
                },
                'outputs': {
                    'then':{
                        'connections': [
                            {
                                'node': 10,
                                'input': 'act'
                            }
                        ]
                    }, 
                    'else': {
                        'connections': [
                            {
                                'node': 11,
                                'input': 'act'
                            }
                        ]
                    }
                },
                'position': [
                    443, 112
                ],
                'name': 'Enter pressed'
            },
            '10': {
                'id': 10,
                'data': {
                    'msg': 'Enter!'
                },
                'group': null,
                'inputs': {
                    'act': {
                        'connections': [
                            {
                                'node': 3,
                                'output': 'then'
                            }
                        ]
                    }
                },
                'outputs': [],
                'position': [
                    773, 106
                ],
                'name': 'Alert'
            },
            '11': {
                'id': 11,
                'data': {
                    'msg': 'Another key pressed'
                },
                'group': null,
                'inputs': {
                    'act': {
                        'connections': [
                            {
                                'node': 3,
                                'output': 'else'
                            }
                        ]
                    }
                },
                'outputs': [],
                'position': [
                    766, 292
                ],
                'name': 'Alert'
            }
        */},
        'groups': {}
    }
    var dataNodes = localStorage.getItem(STORAGE_APPID+"nodes");
    var dataGroups = localStorage.getItem(STORAGE_APPID+"groups");
    if(dataNodes!==null && dataNodes!=="undefined") data.nodes = JSON.parse(dataNodes);
    if(dataGroups!==null && dataGroups!=="undefined") data.groups = JSON.parse(dataGroups);

    return data;
}