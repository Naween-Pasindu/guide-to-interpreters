export enum TokenType {
    Number,
    Identifier,
    Equals,
    OpenParen,
    CloseParen,
    BinaryOperator,
    Let,
    EOF
}

const KEYWORDS : Record<string, TokenType> = {
    "let" : TokenType.Let
}

export interface Token{
    value :string;
    type :TokenType;
}

function token(value = "", type : TokenType){
    return {value, type};
}

function isAlphabetic(src : string){
    return src.toLowerCase() != src.toUpperCase();
}

function isInt(src : string){
    const c = src.charAt(0);
    const bound = ['0'.charAt(0), '9'.charAt(0)];
    return (c >= bound[0] && c <= bound[1] );
}

function isSkippable(src : string){
    return src == ' ' || src == '\t'  || src == '\n' ;
}


export function tokenize(source : string) : Token[] {
    const tokens = new Array<Token>(); // Consider about memory
    const src = source.split("");
    while (src.length > 0){
        if(src[0] =='('){
            tokens.push(token(src.shift(), TokenType.OpenParen));
        }else if(src[0] ==')'){
            tokens.push(token(src.shift(), TokenType.CloseParen));
        }else if(src[0] =='+' || src[0] =='-' || src[0] =='*' || src[0] =='/' || src[0] =='%'){
            tokens.push(token(src.shift(), TokenType.BinaryOperator));
        }else if(src[0] =='='){
            tokens.push(token(src.shift(), TokenType.Equals));
        }else{
            if(isInt(src[0])){
                let num = "";
                while(src.length > 0 && isInt(src[0])){
                    num += src.shift();
                }
                tokens.push(token(num, TokenType.Number));
            }else if(isAlphabetic(src[0])){
                let variable = "";
                while(src.length > 0 && isAlphabetic(src[0])){
                    variable += src.shift();
                }
                const reserved = KEYWORDS[variable];
                if(reserved == undefined){
                    tokens.push(token(variable, TokenType.Identifier));
                }else{
                    tokens.push(token(variable, reserved));
                }
                
            }else if(isSkippable(src[0])){
                src.shift();
            }else{
                console.log("Unrecognized : ", src[0]);
            }
        }
    }
    tokens.push({type : TokenType.EOF, value : "End of File"})
    return tokens;
}

//const source = await Deno.readTextFile("C:/Users/dell/Documents/Learn/guide-to-interpreters/run.np");

//for(const token of tokenize(source)){
//    console.log(token);
//}