import { Stmt, Program, Expression, BinaryExpression, NumericLiteral, Identifier } from "./ast.ts"
import { tokenize, TokenType, Token } from "./lexer.ts"

export default class Parser {
    private tokens : Token[] = [];

    private notEOF() : boolean {
        return this.tokens[0].type != TokenType.EOF;
    }
    private parseStatement() : Stmt {
        return this.parseExpression();
    }
    private parseExpression() : Expression {
        return this.parseExpression();
    }
    public produceAST( source : string) : Program {
        this.tokens = tokenize(source);
        const program : Program = {
            kind : "Program",
            body : []
        };
        while(this.notEOF()){
            program.body.push(this.parseStatement())
        }
        return program;
    }
    private atZero() : Token {
        return this.tokens[0]
    }
    private eat() {
        return this.tokens.shift() as Token;
    }
    private parsePrimaryExpression () : Expression {
        const token = this.atZero().type;
        switch(token){
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.eat().value } as Identifier;
            case TokenType.Number:
                return { kind: "NumericLiteral", value: parseFloat(this.eat().value)} as NumericLiteral
            
            default:
                console.log("Unexpected error : ", this.atZero());
                //return { kind: "Program" } as Stmt;
        }
    }
}