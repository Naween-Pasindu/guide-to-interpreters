export enum TokenType {
    Number,
    Identifier,
    Equals,
    OpenParen,
    CloseParen,
    BinaryOperator,
    Let
}

export interface Token{
    value :string;
    type :TokenType;
}

function token(value = "", type : TokenType){
    return {value, type};
}

export function tokenize(source : string) : Token[] {
    const tokens = new Array<Token>(); // Consider about memory
    const src = source.split("");
    while (src.length > 0){
        if(src[0] =='('){
            tokens.push(token(src.shift(), TokenType.OpenParen));
        }else if(src[0] ==')'){
            tokens.push(token(src.shift(), TokenType.CloseParen));
        }else if(src[0] =='+' || src[0] =='-' || src[0] =='*' || src[0] =='/'){
            tokens.push(token(src.shift(), TokenType.BinaryOperator));
        }else if(src[0] =='='){
            tokens.push(token(src.shift(), TokenType.Equals));
        }
    }
    return tokens;
}