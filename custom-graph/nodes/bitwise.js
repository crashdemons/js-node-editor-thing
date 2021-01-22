


class NotDecComponent extends UnaryOperator{
    constructor(){
        super(integerSocket,"NOT (decimal)");
    }
    operation(num1){
        console.log("NOT ",num1);
        return ~num1;
    }
}
class XorDecComponent extends BinaryOperator{
    constructor(){
        super(integerSocket,"XOR (decimal)");
    }
    operation(num1,num2){
        return num1^num2;
    }
}

components.push(new NotDecComponent);
components.push(new XorDecComponent);