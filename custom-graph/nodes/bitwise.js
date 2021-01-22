


class NotDecComponent extends UnaryOperator{
    constructor(){
        super(decimalSocket,"NOT (decimal)");
    }
    operation(num1){
        console.log("NOT ",num1);
        return ~num1;
    }
}
class XorDecComponent extends BinaryOperator{
    constructor(){
        super(decimalSocket,"XOR (decimal)");
    }
    operation(num1,num2){
        return num1^num2;
    }
}

components.push(new NotDecComponent);
components.push(new XorDecComponent);