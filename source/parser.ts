import { Stmt, Program, Expression, BinaryExpression, NumericLiteral, Identifier, NullLiteral } from "./ast.ts"
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
        return this.parseAdditiveExpression();
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
    private expect(type: TokenType, err: any) {
        const prev = this.tokens.shift() as Token;
        if (!prev || prev.type != type) {
          console.error("Parser Error:\n", err, prev, " - Expecting: ", type);
          Deno.exit(1);
        }
        return prev;
      }
    private parseAdditiveExpression() : Expression {
        let left= this.parseMultiplicitaveExpression();
        while (this.atZero().value == "+" || this.atZero().value == "-"){
            const operator = this.eat().value;
            const right = this.parseMultiplicitaveExpression();
            left = {
                kind : "BinaryExpr",
                left,right, operator
            } as BinaryExpression;
        }
        return left;
    }
    private parseMultiplicitaveExpression(): Expression {
        let left = this.parsePrimaryExpression();
        while (this.atZero().value == "/" || this.atZero().value == "*" || this.atZero().value == "%") {
          const operator = this.eat().value;
          const right = this.parsePrimaryExpression();
          left = {
            kind: "BinaryExpr",
            left,
            right,
            operator,
          } as BinaryExpression;
        }
    
        return left;
    }
    private parsePrimaryExpression () : Expression {
        const token = this.atZero().type;
        switch(token){
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.eat().value } as Identifier;
            case TokenType.Number:
                return { kind: "NumericLiteral", value: parseFloat(this.eat().value)} as NumericLiteral
            case TokenType.NULL:
                this.eat();
                 return { kind: "NullLiteral", value: "null" } as NullLiteral;
            case TokenType.OpenParen:
                this.eat();
                const value = this.parseExpression();
                this.expect(TokenType.CloseParen, "Expected closing parenthesis.");
                return value;
            default:
                console.log("Unexpected error : ", this.atZero());
                Deno.exit(1)
                //return { kind: "Program" } as Stmt;
        }
    }
}